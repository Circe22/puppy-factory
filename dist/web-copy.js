// The browser site uses this helper. The small-tool ZIP does not include it.
export async function copyText(text,nav,doc){
  try{
    if(nav.clipboard&&nav.clipboard.writeText){
      await nav.clipboard.writeText(text);
      return 'clipboard';
    }
  }catch(error){}
  const active=doc.activeElement;
  const input=doc.createElement('textarea');
  input.value=text;
  input.setAttribute('readonly','');
  input.setAttribute('dir','ltr');
  input.style.cssText='position:fixed;top:0;left:0;opacity:0;font-size:16px';
  doc.body.append(input);
  input.focus();
  input.select();
  input.setSelectionRange(0,text.length);
  let copied=false;
  try{
    copied=doc.execCommand('copy');
  }catch(error){}
  finally{
    input.remove();
    if(active&&active.focus)active.focus();
  }
  return copied?'fallback':'manual';
}
