import test from 'node:test';
import assert from 'node:assert/strict';
import {clientVersion,createMiniTool,createPreferences,topInset} from '../dist/minitool.js';

test('小红书接口需要有效版本和明确支持的方法',async()=>{
  assert.equal(clientVersion({miniToolEnv:{buildVersion:'9462004'}}),9462);
  assert.equal(clientVersion({miniToolEnv:{buildVersion:'9.46.2'}}),null);
  let calls=0;
  const xhs={miniTool:{
    async getLaunchOptions(){return {miniToolEnv:{buildVersion:9419000}}},
    async getStorage(){calls++;return {errMsg:'getStorage:ok',data:null}}
  }};
  const prefs=createPreferences(createMiniTool(xhs));
  assert.deepEqual(await prefs.read('favorites',Array.isArray),{ok:false,value:null});
  assert.equal(await prefs.write('favorites',[]),false);
  assert.equal(calls,0);
});

test('收藏读取失败时不覆盖，确认读取后的写入按顺序等待回执',async()=>{
  let data='broken';
  const writes=[];
  let release;
  const firstWrite=new Promise(resolve=>{release=resolve});
  const prefs=createPreferences(createMiniTool({
    launchOptions:{miniToolEnv:{buildVersion:9550001}},
    miniTool:{
      async getStorage(){return {errMsg:'getStorage:ok',data}},
      async setStorage({data:json}){
        writes.push(JSON.parse(json));
        if(writes.length===1)await firstWrite;
        return {errMsg:writes.length===1?'setStorage:ok':'setStorage:fail'};
      }
    }
  }));
  assert.equal((await prefs.read('favorites',Array.isArray)).ok,false);
  assert.equal(await prefs.write('favorites',[]),false);
  assert.deepEqual(writes,[]);
  data=null;
  assert.deepEqual(await prefs.read('favorites',Array.isArray),{ok:true,value:null});
  const first=prefs.write('favorites',['first']);
  const second=prefs.write('favorites',['second']);
  await new Promise(resolve=>setTimeout(resolve,0));
  assert.deepEqual(writes,[['first']]);
  release();
  assert.equal(await first,true);
  assert.equal(await second,false);
  assert.deepEqual(writes,[['first'],['second']]);
});

test('窗口避让按实际可见的胶囊或按钮度量',()=>{
  const back={width:32,height:24,bottom:44};
  const capsule={width:82,height:26,bottom:57};
  assert.equal(topInset({safeArea:{top:20},menuButtons:{back,capsule}}),65);
  assert.equal(topInset({safeArea:{top:20},menuButtons:{back,capsule:{width:0,height:0,bottom:88}}}),52);
  assert.equal(topInset(null),0);
});
