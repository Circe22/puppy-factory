const STORAGE_VERSION=9460;

export function clientVersion(options){
  const env=options&&options.miniToolEnv;
  const value=env&&env.buildVersion;
  if((typeof value!=='number'&&typeof value!=='string')||!/^[1-9]\d{6,}$/.test(String(value)))return null;
  const build=Number(value);
  return Number.isSafeInteger(build)?Math.floor(build/1000):null;
}

function invoke(api,method,options,timeout){
  return new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error(method+' timed out')),timeout);
    Promise.resolve().then(()=>api[method](options)).then(
      result=>{clearTimeout(timer);resolve(result)},
      error=>{clearTimeout(timer);reject(error)}
    );
  });
}

export function createMiniTool(xhs){
  const api=xhs&&xhs.miniTool;
  const initialOptions=xhs&&xhs.launchOptions;
  const launch=clientVersion(initialOptions)===null&&api&&typeof api.getLaunchOptions==='function'
    ?invoke(api,'getLaunchOptions',{},2000).catch(()=>initialOptions)
    :Promise.resolve(initialOptions);

  async function supports(method,minimum){
    const version=clientVersion(await launch);
    return version!==null&&version>=minimum&&!!api&&typeof api[method]==='function';
  }

  return {
    launch,
    supports,
    async call(method,minimum,options={},timeout=3500){
      if(!await supports(method,minimum))throw new Error(method+' is unavailable');
      const result=await invoke(api,method,options,timeout);
      if(!result||result.errMsg!==method+':ok')throw result||new Error(method+' did not confirm success');
      return result;
    }
  };
}

export function createPreferences(tool){
  const loaded=new Set();
  const writes=new Map();
  return {
    async read(key,validate){
      loaded.delete(key);
      try{
        const result=await tool.call('getStorage',STORAGE_VERSION,{key});
        if(result.data===null){
          loaded.add(key);
          return {ok:true,value:null};
        }
        if(typeof result.data!=='string')return {ok:false,value:null};
        const value=JSON.parse(result.data);
        if(!validate(value))return {ok:false,value:null};
        loaded.add(key);
        return {ok:true,value};
      }catch(error){
        return {ok:false,value:null};
      }
    },
    write(key,value){
      const data=JSON.stringify(value);
      const previous=writes.get(key)||Promise.resolve();
      const write=previous.then(async()=>{
        if(!loaded.has(key))return false;
        try{
          await tool.call('setStorage',STORAGE_VERSION,{key,data});
          return true;
        }catch(error){
          return false;
        }
      });
      writes.set(key,write);
      return write;
    }
  };
}

export function topInset(info){
  if(!info)return 0;
  const safe=info.safeArea&&info.safeArea.top;
  const menus=info.menuButtons||{};
  const visible=rect=>rect&&rect.width>0&&rect.height>0&&Number.isFinite(rect.bottom);
  const buttons=visible(menus.capsule)?[menus.capsule]:[menus.back,menus.me,menus.share].filter(visible);
  const floor=Number.isFinite(safe)?Math.max(0,safe):0;
  const bottom=buttons.reduce((max,rect)=>Math.max(max,rect.bottom),floor);
  return bottom>0?bottom+8:0;
}
