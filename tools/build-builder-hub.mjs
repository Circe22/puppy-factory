import {copyFileSync,mkdirSync,readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const source=fileURLToPath(new URL('../dist/',import.meta.url));
const target=process.argv[2];
if(!target)throw new Error('Usage: node tools/build-builder-hub.mjs OUTPUT_DIRECTORY');
const output=resolve(target);
mkdirSync(output,{recursive:true});
if(readdirSync(output).length)throw new Error('The output directory must be empty.');

const read=name=>readFileSync(join(source,name),'utf8');
const put=(name,content)=>writeFileSync(join(output,name),content);
const modules=new Map([
  ['model.js','model'],
  ['i18n.js','i18n'],
  ['picker.js','picker'],
  ['share.js','sharing'],
  ['minitool.js','container'],
  ['app.js',null]
]);
const loaded=new Set();

function classicScript(name,namespace){
  let script=read(name);
  if(name==='model.js'){
    script=script.replace(/^export \{copyText\} from '\.\/web-copy\.js';\r?\n/m,'');
  }
  script=script.replace(/^import\s+\{([^}]+)\}\s+from\s+['"]\.\/([^'?"\r\n]+)(?:\?[^'"]*)?['"];\r?$/gm,
    (_,bindings,dependency)=>{
      if(!loaded.has(dependency))throw new Error(name+' imports an unavailable dependency '+dependency);
      return 'const {'+bindings+'} = '+modules.get(dependency)+';';
    }
  );
  const names=[];
  script=script.replace(/^export (async function|function|const) ([A-Za-z]\w*)/gm,(_,declaration,identifier)=>{
    names.push(identifier);
    return declaration+' '+identifier;
  });
  if(/^\s*(?:import|export)\b/m.test(script))throw new Error('Unsupported module declaration in '+name);
  loaded.add(name);
  if(!namespace)return '(function(){\n'+script+'\n}());';
  return 'const '+namespace+' = (function(){\n'+script+'\nreturn {'+names.join(', ')+'};\n}());';
}

const entry=read('index.html')
  .replace(/<script type="module" src="app\.js(?:\?v=\d+)?"><\/script>/,'<script defer src="./app.js"></script>')
  .replace(/href="style\.css(?:\?v=\d+)?"/,'href="./style.css"')
  .replace(/<button\b([^>]*)>/g,(_,attributes)=>
    /\bdisabled\b/.test(attributes)?'<button'+attributes+'>':'<button'+attributes+' disabled data-startup-control>'
  );
if(!entry.includes('<script defer src="./app.js"></script>'))throw new Error('The entry script was not converted.');
put('index.html',entry);
const sourceCode = [...modules.entries()].map(([name,namespace])=>classicScript(name,namespace)).join('\n\n');
put('app.js',"(function(){\n'use strict';\n"+sourceCode+"\n}());\n");
put('style.css',read('style.css').replace(/(\.woff2?)\?v=\d+\b/g,'$1'));

for(const filename of readdirSync(source).filter(name=>/\.woff2?$/.test(name))){
  copyFileSync(join(source,filename),join(output,filename));
}
const licenses=Object.fromEntries(readdirSync(join(source,'font-licenses')).sort().map(name=>
  [name,read(join('font-licenses',name))]
));
put('font-licenses.json',JSON.stringify(licenses,null,2)+'\n');
console.log(output);
