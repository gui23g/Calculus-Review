const assert=require('node:assert/strict');
const math=require('../math.js'),course=require('../graph-content.js');
let count=0;
function expect(raw,q,status){assert.equal(math.grade(raw,q).status,status,`${raw}: ${JSON.stringify(math.grade(raw,q))}`);count++;}
for(const t of course.topics)for(const q of t.exercises)expect(q.displayAnswer||q.answer,q,'correct');
for(const exam of course.exams){assert.equal(exam.questions.length,25);for(const q of exam.questions)expect(q.answer,q,'correct');}
const derivative=course.topics.find(t=>t.id==='rules').exercises[0];
expect('((x^2+1)-2x*x)/(x^2+1)^2',derivative,'correct');
expect('(x^2-1)/(x^2+1)^2',derivative,'incorrect');
expect('alert(1)',derivative,'invalid');
expect('1/(x^2+1',derivative,'invalid');
expect('',derivative,'invalid');
expect('sin(x)^2+cos(x)^2',{answer:'1'},'invalid');
expect('2x^3',{answer:'2*x^3',constant:true},'almost');
expect('2x^3+C',{answer:'2*x^3',constant:true},'correct');
expect('2x^3+5+C',{answer:'2*x^3',constant:true},'correct');
expect('constructor(1)',{answer:'1'},'invalid');
expect('2x^3+2*C',{answer:'2*x^3',constant:true},'incorrect');
expect('x^3+C',{answer:'2*x^3',constant:true},'incorrect');
expect('0.3333',{answer:'1/3'},'almost');
expect('(-3,1) U (2,inf)',course.topics[0].exercises[0],'almost');
expect('(2,inf) U (-3,1]',course.topics[0].exercises[0],'correct');
expect('[2,inf)',{answer:'(2,inf)',type:'interval'},'almost');
expect('[2,inf]',{answer:'(2,inf)',type:'interval'},'invalid');
expect('(-inf,0) U [0,inf)',{answer:'(-inf,inf)',type:'interval'},'correct');
assert.equal(math.evaluate(math.parse('-2^2')),-4);
assert.equal(math.evaluate(math.parse('2^3^2')),512);
assert.equal(math.evaluate(math.parse('2(3+4)')),14);
assert.equal(math.evaluate(math.parse('sqrt(9)+π')),3+Math.PI);
// Independently verify every exam's rational curve derivatives and recovered initial-value function.
for(const exam of course.exams){let a=exam.id+1;const qs=exam.questions;for(let x of [-3.2,-.7,.3,1.4,3.9]){const evaluate=s=>math.evaluate(math.parse(s),{x});const f=y=>y/(y*y+a*a),h=1e-4;assert.ok(Math.abs(evaluate(qs[9].answer)-(f(x+h)-f(x-h))/(2*h))<1e-6);assert.ok(Math.abs(evaluate(qs[14].answer)-(f(x+h)-2*f(x)+f(x-h))/(h*h))<1e-6);let p=exam.id+1,b=exam.id+2;const F=y=>math.evaluate(math.parse(qs[21].answer),{x:y});assert.ok(Math.abs((F(x+h)-2*F(x)+F(x-h))/(h*h)-(12*p*x*x-6*p*x-2))<1e-3);assert.equal(F(0),-a);assert.ok(Math.abs((F(h)-F(-h))/(2*h)-b)<1e-6);}}
console.log(`Passed ${count} grading cases, parser checks, and independent calculus checks for all five papers.`);
