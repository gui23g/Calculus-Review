/* Local, synchronous mathematical typesetting. No CDN, LaTeX loader, or network required. */
(function(root){
'use strict';
const math=root.CalculusMath||(typeof require==='function'?require('./math.js'):null);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mo=s=>`<mo>${escape(s)}</mo>`,row=s=>`<mrow>${s}</mrow>`,bracket=s=>row(mo('(')+s+mo(')'));
function node(n){
 if(n.op==='num')return n.name?`<mi mathvariant="normal">${n.name==='pi'?'π':'e'}</mi>`:`<mn>${n.v}</mn>`;
 if(n.op==='var'){
  if(n.name==='deltaX')return row('<mi>Δ</mi><mi>x</mi>');
  const sub=n.name.match(/^([a-zA-Z]+)sub(one|two|i)$/);
  if(sub)return `<msub><mi>${escape(sub[1])}</mi>${sub[2]==='i'?'<mi>i</mi>':`<mn>${sub[2]==='one'?1:2}</mn>`}</msub>`;
  return `<mi>${escape(n.name.replace('primeprime','″').replace('prime','′'))}</mi>`;
 }
 if(n.op==='fn'){const a=node(n.a);if(n.name==='sqrt')return `<msqrt>${a}</msqrt>`;if(n.name==='abs')return row(mo('|')+a+mo('|'));return row(`<mi mathvariant="normal">${escape(n.name.replace('primeprime','″').replace('prime','′'))}</mi>`+bracket(a));}
 if(n.op==='neg')return row(mo('−')+(['+','-'].includes(n.a.op)?bracket(node(n.a)):node(n.a)));
 if(n.op==='/')return `<mfrac>${node(n.a)}${node(n.b)}</mfrac>`;
 if(n.op==='^')return `<msup>${['num','var','fn'].includes(n.a.op)?node(n.a):bracket(node(n.a))}${node(n.b)}</msup>`;
 const child=(n,side)=>['+','-'].includes(n.op)&&(side==='multiply'||side==='subtract')?bracket(node(n)):node(n);
 return row(child(n.a,n.op==='*'?'multiply':'left')+mo(n.op==='*'?'·':n.op==='-'?'−':'+')+child(n.b,n.op==='*'?'multiply':n.op==='-'?'subtract':'right'));
}
function body(source){
 source=source.trim().replace(/([a-zA-Z])″/g,'$1primeprime').replace(/([a-zA-Z])′/g,'$1prime').replace(/Δx/g,'deltaX').replace(/([a-zA-Z]+)_([12i])/g,(_,name,index)=>name+'sub'+({'1':'one','2':'two',i:'i'}[index]));
 if(source==='DNE'||source==='odd'||source==='even'||source==='neither')return `<mtext>${escape(source)}</mtext>`;
 // Split relations only outside function/grouping parentheses.
 let depth=0;for(let i=0;i<source.length;i++){if('(['.includes(source[i]))depth++;if(')]'.includes(source[i]))depth--;if(depth===0&&'=<>≤≥≠→⇒'.includes(source[i]))return row(body(source.slice(0,i))+mo(source[i])+body(source.slice(i+1)));}
 let special=source.match(/^lim\[([^,]+),([^\]]+)\]\((.*)\)$/);
 if(special){let target=special[2],side='';if(target.endsWith('+')||target.endsWith('-')){side=target.at(-1);target=target.slice(0,-1);}let approach=body(target);if(side)approach=`<msup>${approach}${mo(side==='-'?'−':'+')}</msup>`;return row(`<munder><mi mathvariant="normal">lim</mi>${row(body(special[1])+mo('→')+approach)}</munder>`+body(special[3]));}
 special=source.match(/^integral\[([^,]+),([^,]+),([^\]]+)\]\((.*)\)$/);
 if(special)return row(`<msubsup>${mo('∫')}${body(special[2])}${body(special[3])}</msubsup>`+body(special[4])+`<mspace width=".2em"/><mi mathvariant="normal">d</mi>`+body(special[1]));
 special=source.match(/^int\[([^\]]+)\]\((.*)\)$/);
 if(special)return row(mo('∫')+body(special[2])+`<mspace width=".2em"/><mi mathvariant="normal">d</mi>`+body(special[1]));
 special=source.match(/^sum\[([^,]+),([^,]+),([^\]]+)\]\((.*)\)$/);
 if(special)return row(`<munderover>${mo('∑')}${row(body(special[1])+mo('=')+body(special[2]))}${body(special[3])}</munderover>`+body(special[4]));
 special=source.match(/^eval\[([^,]+),([^,]+),([^\]]+)\]\((.*)\)$/);
 if(special)return `<msubsup>${row(mo('[')+body(special[4])+mo(']'))}${body(special[2])}${body(special[3])}</msubsup>`;
 if(source==='inf'||source==='∞')return mo('∞');if(source==='-inf'||source==='−∞')return row(mo('−')+mo('∞'));
 let pieces=source.split(/\s+(?:U|∪)\s+/);if(pieces.length>1)return row(pieces.map(body).join(mo('∪')));
 const interval=source.match(/^([([])(.*),(.*)([)\]])$/);if(interval)return row(mo(interval[1])+body(interval[2])+mo(',')+body(interval[3])+mo(interval[4]));
 if(source.endsWith('′'))return row(bracket(body(source.slice(0,-1)))+mo('′'));
 return node(math.parse(source,true));
}
function expression(source,display=false){try{return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="${display?'block':'inline'}" aria-label="${escape(source)}">${body(source)}</math>`;}catch{return `<span class="math-fallback">${escape(source)}</span>`;}}
function prose(source){return String(source).split(/(\$[^$]+\$)/g).map(part=>part.startsWith('$')&&part.endsWith('$')?expression(part.slice(1,-1)):escape(part)).join('');}
function answer(q){return q.type==='text'?escape(q.answer):expression(q.displayAnswer||q.answer);}
root.MathView={expression,prose,answer,body};if(typeof module!=='undefined')module.exports=root.MathView;
})(typeof window!=='undefined'?window:globalThis);
