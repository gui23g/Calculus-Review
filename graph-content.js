/* Original graph practice inspired by the supplied worksheets and midterm. */
(function(root){
'use strict';
const course=root.Course||(typeof require==='function'?require('./content-view.js'):null);
const sample=(fn,a,b,n=120)=>Array.from({length:n+1},(_,i)=>{const x=a+(b-a)*i/n;return [x,fn(x)];});
const graphs={
 'values-limits':{title:'Values, holes and a jump',xMin:-4,xMax:4,yMin:-2,yMax:4,
  description:'Only the segments and points shown belong to f. The rising segment follows y=x+2 from the closed point (−3,−1) to the open point (1,3), with an open hole at (−1,1). There is a separate closed point at (−1,2) and a closed point at (1,1). A falling segment follows y=3−x from the open point (1,2) to the closed point (3,0). No part of the graph continues past the end points.',
  legend:'Filled dot: included value. Open dot: excluded point. Segments stop at the marked endpoints.',
  lines:[{points:[[-3,-1],[-1,1]]},{points:[[-1,1],[1,3]]},{points:[[1,2],[3,0]]}],
  points:[{x:-3,y:-1},{x:-1,y:1,open:true},{x:-1,y:2},{x:1,y:3,open:true},{x:1,y:2,open:true},{x:1,y:1},{x:3,y:0}]},
 'tangent-slope':{title:'Function value versus tangent slope',xMin:-3,xMax:3,yMin:-2,yMax:4,
  description:'The solid curved graph is y=x²/4+1, shown only for −3≤x≤3. It passes through A=(−2,2), has lowest point (0,1), and passes through P=(2,2). The dashed straight line is the tangent at P and passes through the labeled points (0,0) and (2,2). All marked points are included.',
  legend:'Solid curve: f. Dashed line: tangent at P. Use the labeled coordinates for exact slopes.',
  lines:[{points:sample(x=>x*x/4+1,-3,3)},{points:[[-1.5,-1.5],[3,3]],kind:'tangent'}],
  points:[{x:-2,y:2,label:'A (−2, 2)',dx:-63},{x:2,y:2,label:'P (2, 2)',dx:-8,dy:-17},{x:0,y:0,label:'(0, 0)',dx:11,dy:21}]},
 'derivative-sign':{title:'This is the graph of f′, not f',xMin:-2,xMax:2,yMin:-2,yMax:4,
  description:'The graph represents the derivative f′ on [−2,2]. It is a smooth upward parabola, crossing the horizontal axis at x=−1 and x=1 and having its minimum at (0,−1). Its endpoints are (−2,3) and (2,3). No value of f itself is specified.',
  legend:'Vertical height is f′(x). A rising derivative means f is concave up; a positive derivative means f is increasing.',
  lines:[{points:sample(x=>x*x-1,-2,2)}],points:[{x:-1,y:0},{x:1,y:0},{x:0,y:-1}],yLabel:'f′(x)'},
 'absolute-shift':{title:'Recover a formula from its graph',xMin:-2,xMax:4,yMin:-4,yMax:4,
  description:'A downward V has vertex (1,3), passes through (0,1) and (2,1), and continues along both straight rays beyond the visible window.',
  legend:'The arrowheads mean the rays continue. The labeled coordinates determine the shift and vertical scale.',
  lines:[{points:[[-2,-3],[1,3],[4,-3]],arrows:true}],points:[{x:1,y:3,label:'(1, 3)',dx:10,dy:-10},{x:0,y:1,label:'(0, 1)',dx:-56,dy:14},{x:2,y:1,label:'(2, 1)',dx:9,dy:14}]},
 'signed-area':{title:'Velocity: signed area versus total distance',xMin:0,xMax:4,yMin:-3,yMax:3,xLabel:'t',yLabel:'v(t)',
  description:'The velocity graph consists of straight segments joining (0,0), (1,2), (2,0), (3,−2) and (4,0), in that order, on 0≤t≤4. The triangle on [0,2] lies above the axis, and the triangle on [2,4] lies below it. Time is in seconds and velocity in meters per second.',
  legend:'Green shading: positive velocity. Orange shading: negative velocity. Each grid step is one unit.',
  lines:[{points:[[0,0],[1,2],[2,0],[3,-2],[4,0]]}],points:[{x:0,y:0},{x:1,y:2},{x:2,y:0},{x:3,y:-2},{x:4,y:0}],
  areas:[{sign:'positive',points:[[0,0],[1,2],[2,0]]},{sign:'negative',points:[[2,0],[3,-2],[4,0]]}]}
};
const Q=(id,graph,prompt,answer,steps,extra={})=>({id,topic:'graph-reading',graph,prompt,displayPrompt:prompt,answer,steps,...extra});
const text={type:'text'},interval={type:'interval'};
const exercises=[
 Q('g-value','values-limits','Read $f(-1)$ from the filled point.','2',['The open point at $(-1,1)$ is excluded.','The filled point at $(-1,2)$ gives $f(-1)=2$.']),
 Q('g-hole-limit','values-limits','Find $lim[x,-1](f(x))$.','1',['Follow the curve from both sides of $x=-1$.','Both sides approach $1$, even though $f(-1)=2$.']),
 Q('g-left','values-limits','Find $lim[x,1-](f(x))$.','3',['Follow the rising segment as x approaches $1$ from below.','It approaches the open point $(1,3)$, so the left-hand limit is $3$.']),
 Q('g-right','values-limits','Find $lim[x,1+](f(x))$.','2',['Follow the falling segment as x approaches $1$ from above.','It approaches $(1,2)$, so the right-hand limit is $2$.']),
 Q('g-jump','values-limits','Find $lim[x,1](f(x))$. Enter DNE if it does not exist.','DNE',['The left-hand limit is $3$ and the right-hand limit is $2$.','Because the one-sided limits disagree, the two-sided limit does not exist.'],{...text,accept:['DNE','does not exist']}),
 Q('g-domain','values-limits','Give the domain of the complete plotted function.','[-3,3]',['Every x-coordinate from $-3$ through $3$ has an included function value.','The separate filled points supply values at the holes. Both outer endpoints are closed.'],interval),
 Q('g-range','values-limits','Give the range of the complete plotted function.','[-1,3)',['The smallest attained height is $-1$, at $x=-3$.','Heights approach $3$ from below, but the only point at that height is open. All intermediate heights are attained.'],interval),
 Q('g-continuity','values-limits','True or false: f is continuous at $x=-1$. Enter true or false.','false',['The limit is $1$, while the actual function value is $2$.','Continuity requires equality of the limit and the function value; this is a removable discontinuity.'],text),
 Q('g-statement','values-limits','True or false: the two-sided limit exists at every c in $(1,3)$. Enter true or false.','true',['Between $1$ and $3$, f follows one unbroken straight segment.','The endpoints are excluded from the statement, so the jump at $1$ does not contradict it.'],text),
 Q('g-tangent','tangent-slope','Use the dashed tangent to find $f′(2)$.','1',['The tangent passes through $(0,0)$ and $(2,2)$.','Its slope is $(2-0)/(2-0)=1$. The height of P is not the derivative.']),
 Q('g-height','tangent-slope','Read $f(2)$ from the solid curve.','2',['The marked point P is $(2,2)$.','The y-coordinate gives the function value: $f(2)=2$.']),
 Q('g-secant','tangent-slope','Find the average rate of change of f on $[-2,2]$.','0',['Both A and P have height $2$.','The secant slope is $(2-2)/(2-(-2))=0$.']),
 Q('g-increasing','derivative-sign','Using the graph of the derivative, where is f increasing within $(-2,2)$? Give open intervals.','(-2,-1) U (1,2)',['f increases where the derivative lies above the horizontal axis.','Here $f′>0$ on $(-2,-1)$ and $(1,2)$.'],interval),
 Q('g-decreasing','derivative-sign','Where is f decreasing within $(-2,2)$? Give an open interval.','(-1,1)',['Between the two zeros, the derivative is negative.','Thus f decreases on $(-1,1)$.'],interval),
 Q('g-maximum','derivative-sign','Enter the x-coordinate of the interior local maximum of f.','-1',['At $x=-1$, the derivative changes from positive to negative.','Therefore f changes from increasing to decreasing there.']),
 Q('g-minimum','derivative-sign','Enter the x-coordinate of the interior local minimum of f.','1',['At $x=1$, the derivative changes from negative to positive.','Therefore f changes from decreasing to increasing there.']),
 Q('g-concavity','derivative-sign','Where is f concave upward within $(-2,2)$? Give an open interval.','(0,2)',['Concavity comes from the slope of the derivative graph.','The derivative rises on $(0,2)$, so $f″>0$ there.'],interval),
 Q('g-inflection','derivative-sign','Enter the x-coordinate of the inflection point of f.','0',['The derivative decreases before $0$ and increases after $0$.','Thus f changes from concave down to concave up at $x=0$. The derivative itself has height $-1$ there.']),
 Q('g-undetermined','derivative-sign','Can the value $f(0)$ be determined from this derivative graph alone? Enter yes or no.','no',['Adding any constant to f leaves the derivative unchanged.','A function value or an initial condition is needed to fix the vertical position of f.'],text),
 Q('g-transform','absolute-shift','Write $g(x)$ for the plotted V. Enter abs(...) for absolute value.','-2*abs(x-1)+3',['The vertex $(1,3)$ gives $g(x)=A*abs(x-1)+3$.','Use $(0,1)$: $1=A+3$, hence $A=-2$.']),
 Q('g-displacement','signed-area','Find the displacement from $t=0$ to $t=4$, in meters. Enter a number.','0',['Each triangle has area $(1/2)*2*2=2$.','The lower triangle contributes negative signed area, so displacement is $2-2=0$.']),
 Q('g-distance','signed-area','Find the total distance traveled from $t=0$ to $t=4$, in meters.','4',['Distance adds the magnitudes of both triangular areas.','The total is $2+2=4$ meters, even though displacement is zero.']),
 Q('g-area','signed-area','Evaluate $integral[t,0,2](v(t))$ from the graph.','2',['On $[0,2]$, the graph is above the axis.','The triangular area is $(1/2)*2*2=2$.'])
];
const topic={id:'graph-reading',chapter:1,icon:'⌁',title:'Reading & interpreting graphs',desc:'Read values and limits, interpret slopes and derivatives, and turn areas into change.',source:'HW1 Q1–2 · Ch1 §§1.1, 1.3, 1.5 · HW2 Q2, Q4 · Ch3 §§3.3–3.4 · Ch4 §§4.1–4.3 · Midterm Q4–5',priority:true,minutes:35,
 sections:[
  ['Values, one-sided limits and continuity','Read $f(a)$ at the filled point. For $lim[x,a](f(x))$, follow the nearby curve instead. An open point can still be the approached height. Compare the two sides before claiming a two-sided limit. For a domain, project included points onto the horizontal axis; for a range, project them onto the vertical axis.'],
  ['Height, tangent slope and average slope','The point’s height gives a value of f. The tangent’s rise divided by run gives $f′(a)$. A secant uses two points on the curve and gives the average rate of change. These three quantities can be different, even at the same location.'],
  ['When the displayed curve is the derivative','First check the vertical-axis label. If the curve is $f′$, its sign controls whether f increases or decreases. Its slope controls the concavity of f. A zero of $f′$ is an extremum candidate for f; a turning point of $f′$ can indicate an inflection of f. The derivative’s height is not the value of f.'],
  ['Transformations from a plotted graph','For an absolute-value graph, locate the vertex $(h,k)$, then use $g(x)=A*abs(x-h)+k$. A second labeled point fixes A. A downward V has a negative A. Read the coordinate scales rather than guessing steepness from the picture.'],
  ['Area, displacement and total distance','A definite integral adds signed area. When the graph represents velocity, positive regions add displacement and negative regions subtract it. Total distance adds the magnitudes of the areas, so cancellation does not occur. Split the interval at the zeros of velocity.']
 ],graphGroups:['values-limits','tangent-slope','derivative-sign','absolute-shift','signed-area'],
 formula:'Value, approach, slope, sign, area.',displayFormula:'Read $f(a)$ from a filled point; read $f′(a)$ from a tangent slope; read $integral[x,a,b](f(x))$ from signed area.',
 application:'Graphs let you answer questions even when no algebraic formula is given. This is the same reading skill used in the first worksheet’s limit and true-or-false questions.',
 warning:'Always identify whether the vertical axis represents f, its derivative, or a velocity. The same curve has different meanings in each case. All figures below are original practice examples inspired by the course materials.',exercises};
course.topics.splice(2,0,topic);course.graphs=graphs;
const extensions=[['g-left','g-increasing','g-tangent'],['g-right','g-maximum','g-range'],['g-hole-limit','g-concavity','g-distance'],['g-value','g-inflection','g-transform'],['g-domain','g-secant','g-displacement']];
for(const exam of course.exams){
 const a=exam.id+1,h=exam.id+2,k=-h,m=h,id=`exam-v-${exam.id}`;
 graphs[id]={title:'Absolute-value graph for question 4',xMin:h-3,xMax:h+3,yMin:k-3*m-1,yMax:1,yStep:m,
  description:`A downward V has vertex (${h},${k}), passes through (0,${k-m*h}), and continues along both rays. In this view the vertex and the point (${h-1},${k-m}) are labeled; each unit of horizontal movement changes the height by ${m}.`,
  legend:'Both rays continue beyond the window. Use the vertex and the second labeled point to recover g.',
  lines:[{points:[[h-3,k-3*m],[h,k],[h+3,k-3*m]],arrows:true}],points:[{x:h,y:k,label:`(${h}, ${k})`,dx:9,dy:-13},{x:h-1,y:k-m,label:`(${h-1}, ${k-m})`,dx:-78,dy:16}]};
 exam.questions.find(q=>q.id===`v${exam.id}-4`).graph=id;
 extensions[exam.id].forEach((base,i)=>{const q=exercises.find(q=>q.id===base);exam.questions.push({...q,id:`v${exam.id}-graph-${i}`,prompt:`7(${String.fromCharCode(97+i)}). ${q.prompt}`,displayPrompt:`7(${String.fromCharCode(97+i)}). ${q.displayPrompt}`});});
}
root.Course=course;if(typeof module!=='undefined')module.exports=course;
})(typeof window!=='undefined'?window:globalThis);
