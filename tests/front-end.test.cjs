const assert=require('node:assert/strict');
const mathView=require('../math-view.js');
const course=require('../graph-content.js');
let count=0;
function checkAuthoredMath(text,label){
 assert.ok(typeof text==='string',`Missing content: ${label}`);
 const plain=text.split(/\$[^$]+\$/).join('').replace(/\b(?:cm|ft|m)(?:²|³)?(?:\/s)?(?![a-zA-Z])/g,'');
 // Missing delimiters used to pass the render test because untouched prose had no fallback.
 assert.ok(!/[∫∑Δ=≤≥≠→^ⁿ²³⁴′″]|\b(?:sqrt|sin|cos|tan|abs|f|g|F)\(|\d\s*\/\s*\d/.test(plain),`Mathematics outside display delimiters: ${label}: ${plain}`);
 assert.ok(!mathView.prose(text).includes('math-fallback'),`Unrendered content: ${label}`);
}
for(const q of [...course.topics.flatMap(t=>t.exercises),...course.exams.flatMap(e=>e.questions)]){
 assert.ok(q.displayPrompt,`Missing typeset prompt: ${q.id}`);
 const markup=mathView.prose(q.displayPrompt);
 assert.ok(!markup.includes('math-fallback'),`Unrendered prompt: ${q.id} ${markup}`);
 assert.ok(!markup.includes('$'),`Unprocessed math delimiter: ${q.id}`);
 assert.ok(!mathView.answer(q).includes('math-fallback'),`Unrendered answer: ${q.id}`);
 q.steps.forEach((s,i)=>checkAuthoredMath(s,`${q.id} solution ${i+1}`));
 count++;
}
for(const t of course.topics){assert.ok(!mathView.prose(t.displayFormula).includes('math-fallback'),`Unrendered formula: ${t.id}`);for(const [title,s]of t.sections)checkAuthoredMath(s,`${t.id}: ${title}`);checkAuthoredMath(t.application,`${t.id} application`);checkAuthoredMath(t.warning,`${t.id} warning`);}
assert.ok(mathView.expression('sqrt((x-5)/((x+4)*(x-6)))').includes('<msqrt><mfrac>'));
assert.ok(mathView.expression('lim[x,4]((5-sqrt(5*(x-4)+25))/(x-4))').includes('<munder>'));
assert.ok(mathView.expression('integral[x,0,2](x^2)').includes('<msubsup>'));
assert.ok(mathView.expression('F′(x)=f(x)').includes('F′'));
assert.ok(mathView.expression('1/(25*pi)').includes('π'));
const integralLesson=course.topics.find(t=>t.id==='integrals');
const evaluation=mathView.prose(integralLesson.sections[2][1]);
assert.equal((evaluation.match(/<msubsup>/g)||[]).length,3,'Integral bounds and evaluation bounds must be typeset.');
assert.ok(evaluation.includes('<mfrac>'),'The evaluation example must have stacked fractions.');
assert.ok(mathView.prose(integralLesson.sections[0][1]).includes('<munderover>'),'The Riemann sum must have indexed summation.');
assert.ok(mathView.expression('C_1=2').includes('<msub>'));
assert.ok(mathView.expression('int[x](cos(x))=sin(x)+C').includes('<mo>∫</mo>'));
assert.ok(!mathView.expression('v(t)=t-1').includes('<mo>·</mo>'),'Velocity notation v(t) is a function call, not a product.');
assert.ok(mathView.prose('<img src=x onerror=alert(1)>').includes('&lt;img'));
assert.ok(mathView.expression('<script>alert(1)</script>').includes('&lt;script'));
console.log(`Passed display checks for all ${count} questions, ${course.topics.length} lesson formulas, sections, solutions, and safe rendering.`);
