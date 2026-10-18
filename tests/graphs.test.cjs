const assert=require('node:assert/strict');
const course=require('../graph-content.js'),math=require('../math.js'),view=require('../graphs.js');
const topic=course.topics.find(t=>t.id==='graph-reading');
const q=id=>topic.exercises.find(q=>q.id===id);
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-7,`${a} differs from ${b}`);
// Read the drawn line segments and point inclusion, independently of the answer keys.
function value(g,x){const point=g.points.find(p=>p.x===x&&!p.open);if(point)return point.y;
 for(const line of g.lines)for(let i=1;i<line.points.length;i++){const [a,b]=[line.points[i-1],line.points[i]];if(x<a[0]||x>b[0])continue;const y=a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]);if(!g.points.some(p=>p.open&&p.x===x&&Math.abs(p.y-y)<1e-8))return y;}
 return undefined;
}
const limits=course.graphs['values-limits'];
close(value(limits,-1),Number(q('g-value').answer));
close(value(limits,-1-1e-9),Number(q('g-hole-limit').answer));
close(value(limits,-1+1e-9),Number(q('g-hole-limit').answer));
close(value(limits,1-1e-9),Number(q('g-left').answer));
close(value(limits,1+1e-9),Number(q('g-right').answer));
assert.notEqual(Number(q('g-left').answer),Number(q('g-right').answer));
assert.equal(q('g-jump').answer,'DNE');
for(let x=-3;x<=3;x+=.01)assert.ok(Number.isFinite(value(limits,x)));
assert.equal(value(limits,-3.01),undefined);assert.equal(value(limits,3.01),undefined);
assert.deepEqual(math.intervals(q('g-domain').answer),[[-3,3,true,true]]);
assert.deepEqual(math.intervals(q('g-range').answer),[[-1,3,true,false]]);
assert.equal(value(limits,-3),-1);for(let x=-3;x<=3;x+=.01)assert.ok(value(limits,x)>=-1&&value(limits,x)<3);
// A and P are on the curve; only P and the origin are on the tangent.
const tangent=course.graphs['tangent-slope'],line=tangent.lines.find(l=>l.kind==='tangent').points;
const slope=(line[1][1]-line[0][1])/(line[1][0]-line[0][0]);close(slope,Number(q('g-tangent').answer));
close(value(tangent,2),Number(q('g-height').answer));
close((value(tangent,2)-value(tangent,-2))/4,Number(q('g-secant').answer));
const derivative=course.graphs['derivative-sign'];
// The f' graph itself rises/falls; signs are read from its height.
for(const [x,y]of derivative.lines[0].points)close(y,x*x-1);
close(value(derivative,0),-1);
for(const [x,status]of [[-1.5,true],[0,false],[1.5,true]])assert.equal(value(derivative,x)>0,status);
for(let i=1;i<derivative.lines[0].points.length;i++){const [a,b]=derivative.lines[0].points.slice(i-1,i+1);assert.equal(b[1]>a[1],b[0]>0);}
assert.equal(q('g-maximum').answer,'-1');assert.equal(q('g-minimum').answer,'1');assert.equal(q('g-inflection').answer,'0');assert.equal(q('g-undetermined').answer,'no');
// Signed integrals are trapezoid areas computed directly from the plotted velocity coordinates.
const velocity=course.graphs['signed-area'].lines[0].points;
let signed=0,distance=0,firstHalf=0;
for(let i=1;i<velocity.length;i++){const [a,b]=velocity.slice(i-1,i+1),area=(b[0]-a[0])*(a[1]+b[1])/2;signed+=area;distance+=Math.abs(area);if(b[0]<=2)firstHalf+=area;}
close(signed,Number(q('g-displacement').answer));close(distance,Number(q('g-distance').answer));close(firstHalf,Number(q('g-area').answer));
for(const exam of course.exams){assert.equal(exam.questions.length,25);assert.equal(exam.questions.filter(q=>q.topic==='graph-reading').length,3);const transform=exam.questions.find(q=>q.id===`v${exam.id}-4`);const g=course.graphs[transform.graph];for(const [x,y]of g.lines[0].points)close(math.evaluate(math.parse(transform.answer),{x}),y);}
for(const g of Object.values(course.graphs)){const html=view.render(Object.entries(course.graphs).find(([,v])=>v===g)[0]);assert.ok(html.includes('role="img"'));assert.ok(html.includes('<desc'));assert.ok(html.includes('Text description of this graph'));assert.ok(!html.includes('NaN'));}
for(const exam of course.exams){const markup=exam.questions.filter(q=>q.graph).map(q=>view.render(q.graph,q.id)).join('');const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Repeated graphs must have unique figure and accessibility IDs.');}
assert.equal(new Set(topic.exercises.map(q=>q.id)).size,23);
console.log('Passed graph geometry, one-sided limits, domain/range, tangent slopes, derivative signs, signed-area, exam figures, and accessibility checks.');
