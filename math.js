/* A deliberately small expression language. Never executes user input as JavaScript. */
(function(root){
 'use strict';
 const functions={sqrt:Math.sqrt,sin:Math.sin,cos:Math.cos,tan:Math.tan,abs:Math.abs,ln:Math.log,exp:Math.exp,sec:x=>1/Math.cos(x),csc:x=>1/Math.sin(x),cot:x=>1/Math.tan(x)};
 function normalize(s){return s.trim().replace(/−|–/g,'-').replace(/×|·/g,'*').replace(/÷/g,'/').replace(/π/g,'pi').replace(/∞/g,'inf').replace(/²/g,'^2').replace(/³/g,'^3').replace(/√/g,'sqrt').replace(/\*\*/g,'^');}
 function parse(s,display=false){
  s=normalize(s);if(!display)s=s.toLowerCase();if(s.length>250)throw Error('Keep your answer below 250 characters.');
  const tokens=s.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|[a-zA-Z]+|[+\-*/^(),]/g)||[];
  if(tokens.join('')!==s.replace(/\s/g,''))throw Error('Use the keypad or supported mathematical notation.');
  let i=0;
  function atom(){let t=tokens[i++];if(t==='('){let n=sum();if(tokens[i++]!==')')throw Error('Close every parenthesis.');return n;}
   if(Object.hasOwn(functions,t)){if(tokens[i++]!=='(')throw Error('Write functions with parentheses, such as sin(x).');let n=sum();if(tokens[i++]!==')')throw Error('Close the function parenthesis.');return {op:'fn',name:t,a:n};}
   if(t==='pi'||t==='e')return {op:'num',v:t==='pi'?Math.PI:Math.E,name:t};
   if(display&&/^[a-zA-Z]+$/.test(t)&&tokens[i]==='('&&!['x','y','a','h','t','c','n'].includes(t)){i++;let n=sum();if(tokens[i++]!==')')throw Error('Close the function parenthesis.');return {op:'fn',name:t,a:n};}
   if(['x','y','h','a','t','c'].includes(t)||display&&/^[a-zA-Z]+$/.test(t))return {op:'var',name:t};
   if(t!==undefined&&!isNaN(Number(t)))return {op:'num',v:Number(t)};
   throw Error('Expected a number, variable, or function.');}
  function power(){let n=atom();if(tokens[i]==='^'){i++;n={op:'^',a:n,b:unary()};}return n;}
  function unary(){if(tokens[i]==='+'||tokens[i]==='-'){let sign=tokens[i++];let n=unary();return sign==='-'?{op:'neg',a:n}:n;}return power();}
  function product(){let n=unary();while(i<tokens.length){let t=tokens[i];if(t==='*'||t==='/'){i++;n={op:t,a:n,b:unary()};}else if(t==='('||Object.hasOwn(functions,t)||['x','y','h','a','t','c','pi','e'].includes(t)||display&&/^[a-zA-Z]+$/.test(t)||/^\d|^\./.test(t)){n={op:'*',a:n,b:unary()};}else break;}return n;}
  function sum(){let n=product();while(tokens[i]==='+'||tokens[i]==='-'){let op=tokens[i++];n={op,a:n,b:product()};}return n;}
  const node=sum();if(i!==tokens.length)throw Error('Check the notation around '+tokens[i]+'.');return node;
 }
 function evaluate(n,v={}){switch(n.op){case 'num':return n.v;case 'var':if(!(n.name in v))throw Error('Unexpected variable '+n.name);return v[n.name];case 'fn':return functions[n.name](evaluate(n.a,v));case 'neg':return -evaluate(n.a,v);default:let a=evaluate(n.a,v),b=evaluate(n.b,v);return n.op==='+'?a+b:n.op==='-'?a-b:n.op==='*'?a*b:n.op==='/'?a/b:a**b;}}
 function variables(n){return n.op==='var'?[n.name]:[...(n.a?variables(n.a):[]),...(n.b?variables(n.b):[])];}
 function equivalent(a,b,loose=false){const vars=[...new Set([...variables(a),...variables(b)])];let count=0;for(let i=0;i<24;i++){const v={};vars.forEach((name,j)=>v[name]=[-4.31,-2.17,-.73,.29,.81,1.37,2.63,4.19][(i+j*3)%8]+Math.floor(i/8)*.117);let x=evaluate(a,v),y=evaluate(b,v);if(!Number.isFinite(x)||!Number.isFinite(y)){if(Number.isFinite(x)!==Number.isFinite(y))return false;continue;}count++;if(Math.abs(x-y)>(loose?5e-4:1e-8)*Math.max(1,Math.abs(y)))return false;}return count>=8;}
 function endpoint(s){s=normalize(s).toLowerCase();if(['inf','+inf','infinity','+infinity'].includes(s))return Infinity;if(['-inf','-infinity'].includes(s))return -Infinity;let n=parse(s);if(variables(n).length)throw Error('Interval endpoints must be numbers.');let v=evaluate(n);if(!Number.isFinite(v))throw Error('Invalid endpoint.');return v;}
 function intervals(s){s=normalize(s).replace(/\s/g,'').replace(/∪/g,'U').replace(/union/gi,'U');if(/^(R|real|allreal|\(-inf,inf\))$/i.test(s))return [[-Infinity,Infinity,false,false]];const pieces=s.split(/[Uu]/);const arr=pieces.map(p=>{if(!/^[([][^,]+,[^,]+[)\]]$/.test(p))throw Error('Use interval notation: (-inf,2) U (2,inf).');let [a,b]=p.slice(1,-1).split(',').map(endpoint),l=p[0]==='[',r=p.at(-1)===']';if(a>b||a===b&&!(l&&r)||a===-Infinity&&l||b===Infinity&&r)throw Error('Check interval order and open infinity endpoints.');return [a,b,l,r];}).sort((a,b)=>a[0]-b[0]);let merged=[];for(const p of arr){const last=merged.at(-1);if(last&&(p[0]<last[1]||p[0]===last[1]&&(last[3]||p[2]))){if(p[0]===last[0])last[2] ||=p[2];if(p[1]>last[1]){last[1]=p[1];last[3]=p[3];}else if(p[1]===last[1])last[3] ||=p[3];}else merged.push(p.slice());}return merged;}
 function intervalEqual(a,b){return a.length===b.length&&a.every((p,i)=>p.every((v,j)=>j<2?(v===b[i][j]||Math.abs(v-b[i][j])<1e-8):v===b[i][j]));}
 function grade(raw,q){if(!raw.trim())return {status:'invalid',message:'Enter an answer before checking.'};try{
  if(q.type==='interval'){let a=intervals(raw),b=intervals(q.answer);if(intervalEqual(a,b))return {status:'correct',message:'Your intervals and endpoints are correct.'};if(a.length===b.length&&a.every((p,i)=>p[0]===b[i][0]&&p[1]===b[i][1]))return {status:'almost',message:'The boundary values are right. Recheck which endpoints are included.'};return {status:'incorrect',message:'Recheck the sign chart and domain restrictions.'};}
  if(q.type==='text'){const clean=s=>normalize(s).toLowerCase().replace(/\s+/g,' ').trim();return (q.accept||[q.answer]).map(clean).includes(clean(raw))?{status:'correct',message:'Correct interpretation.'}:{status:'incorrect',message:'Compare your interpretation with the explanation below.'};}
  let n=parse(raw),expected=parse(q.answer);const allowed=new Set(variables(expected));if(q.constant)allowed.add('c');for(const v of variables(n))if(!allowed.has(v))throw Error('Use only '+([...allowed].join(', ')||'numbers')+' in this answer.');
  if(q.constant){let hasC=variables(n).includes('c');if(!hasC&&equivalent(n,expected))return {status:'almost',message:'The antiderivative is right, but the general family needs + C.'};if(hasC){let valid=true;let offset=null;for(let c of [0,1.73,-2.49])for(let x of [-2.1,-.4,.7,2.6]){let d=evaluate(n,{x,c})-evaluate(expected,{x});if(offset===null)offset=d-c;if(!Number.isFinite(d)||Math.abs(d-c-offset)>1e-8*Math.max(1,Math.abs(d)))valid=false;}if(valid)return {status:'correct',message:'Correct, including the arbitrary additive constant.'};return {status:'incorrect',message:'C must be an arbitrary additive constant; check the antiderivative.'};}}
  if(equivalent(n,expected))return {status:'correct',message:'Correct. Equivalent factored or unsimplified expressions are accepted.'};
  if(!variables(expected).length&&equivalent(n,expected,true))return {status:'almost',message:'Close numerically. Use the exact fraction or radical for full accuracy.'};
  return {status:'incorrect',message:'The result does not match. Follow the worked solution and try again.'};
 }catch(e){return {status:'invalid',message:e.message};}}
 root.CalculusMath={parse,evaluate,grade,intervals,equivalent};if(typeof module!=='undefined')module.exports=root.CalculusMath;
})(typeof window!=='undefined'?window:globalThis);
