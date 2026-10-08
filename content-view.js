/* Explicit typeset statements: answer notation stays independent from presentation. */
(function(root){
'use strict';
const course=root.Course||(typeof require==='function'?require('./content.js'):null);
const prompts={
 f1:'Find the domain of $f(x)=sqrt((x-1)/(x^2+x-6))$.',
 f2:'A downward V has vertex $(2,-2)$ and passes through $(0,-6)$. Write $g(x)$ using absolute value. Use abs(...) in your answer.',
 f3:'Is $f(x)=x*abs(x)$ even, odd, or neither? Enter even, odd, or neither.',
 l1:'Evaluate $lim[x,4]((7-sqrt(12*x+1))/(x-4))$.',
 l2:'Evaluate $lim[x,0](abs(x)/x)$. Enter DNE if it does not exist.',
 l3:'Set $f(2)=k$ and $f(x)=(x^2-4)/(x-2)$ for $x≠2$. What value of k makes f continuous at 2?',
 l4:'Evaluate $lim[x,inf]((3*x^2+1)/(2*x^2-5))$.',
 d1:'Evaluate $lim[h,0](((3+h)^2-9)/h)$.',
 d2:'For $f(x)=x^2-8*x+9$, find $f′(a)$. Use a as the variable.',
 d3:'For $y=x^2$, give the tangent line at $x=3$. Enter only the right-hand side of y = … .',
 r1:'Differentiate $f(x)=x/(x^2+1)$.',
 r2:'Differentiate $y=(x^2+1)^3$.',
 r3:'Differentiate $y=x^2*sin(x)$.',
 r4:'Find $f″(x)$ if $f(x)=x/(x^2+1)$.',
 i1:'For $x^2+y^2=25$, find dy/dx as an expression in x and y.',
 i2:'A rectangle has length 20 cm, width 10 cm, length increasing at 8 cm/s and width increasing at 3 cm/s. Enter the rate of area increase in cm²/s (number only).',
 i3:'A spherical balloon gains volume at 100 cm³/s. At radius 25 cm, enter the rate of radius increase in cm/s.',
 e1:'For $f(x)=x^2$ on $[1,3]$, find the Mean Value Theorem point c.',
 e2:'Find the absolute minimum value of $f(x)=x^3-3*x$ on $[-2,2]$.',
 c1:'Where is $f(x)=x/(x^2+1)$ increasing? Give an open interval.',
 c2:'Where is $f(x)=x/(x^2+1)$ concave upward?',
 c3:'Enter the horizontal asymptote’s y-value for $f(x)=x/(x^2+1)$.',
 c4:'How many vertical asymptotes does $f(x)=x/(x^2+1)$ have? Enter a number.',
 o1:'A farmer has 2400 ft of fencing for three sides beside a river. Enter the optimal perpendicular width in feet.',
 o2:'For the same field, enter the maximum area in square feet.',
 a1:'Find the general antiderivative of $6*x^2$. Include C.',
 a2:'Find $f(x)$ given $f″(x)=24*x^2-3*x-3/2$, $f′(0)=2$ and $f(0)=-1$.',
 a3:'Find $f(x)$ if $f′(x)=x*sqrt(x)$ and $f(1)=2$. Use the domain $x≥0$.',
 n1:'Evaluate $integral[x,0,2](x^2)$.',
 n2:'Find the right-endpoint Riemann sum for $f(x)=x^2$ on $[0,2]$ with $n=4$.',
 n3:'If $v(t)=t-1$ on $[0,2]$, enter the total distance traveled (not displacement).'
};
const formulas={
 functions:'$g(x)=A*abs(x-h)+k$',
 limits:'$(sqrt(u)-sqrt(v))*(sqrt(u)+sqrt(v))=u-v$',
 definition:'$f′(a)=lim[h,0]((f(a+h)-f(a))/h)$',
 rules:'$(u/v)′=(u′*v-u*v′)/v^2$ · $(f(g(x)))′=f′(g(x))*g′(x)$',
 implicit:'$V=(4/3)*pi*r^3$ ⇒ $dV/dt=4*pi*r^2*dr/dt$',
 extrema:'$f′(c)=(f(b)-f(a))/(b-a)$',
 curves:'$f(x)=x/(x^2+a^2)$ ⇒ $f′(x)=(a^2-x^2)/(x^2+a^2)^2$',
 optimization:'$A(x)=x*(P-2*x)$ ⇒ $x=P/4$, $y=P/2$',
 antiderivatives:'An antiderivative of $x^n$ is $x^(n+1)/(n+1)+C$ for $n≠-1$.',
 integrals:'$integral[x,a,b](f(x))=F(b)-F(a)$, where $F′(x)=f(x)$.'
};
// Every mathematical passage is authored explicitly, rather than inferred from prose.
const sectionBodies={
 functions:[
  'A function assigns exactly one output to each allowed input. The domain is the set of those inputs; the range is the set of outputs. A vertical line must meet a function’s graph at most once.',
  'Polynomials allow all real inputs. A denominator cannot equal zero. An even root needs a nonnegative radicand; if that root is in a denominator, its radicand must be strictly positive. Combine all restrictions by intersection.',
  'For $sqrt((x-1)/((x+3)*(x-2)))$, mark $-3$, $1$ and $2$. Test one point in each interval. Keep intervals with a nonnegative quotient. Include $1$ because zero is allowed; exclude $-3$ and $2$ because the denominator vanishes.',
  'For $g(x)=A*abs(x-h)+k$, the vertex is $(h,k)$. A negative $A$ reflects the V downward; $abs(A)$ controls steepness. An even function satisfies $f(-x)=f(x)$, and an odd function satisfies $f(-x)=-f(x)$. Composition means applying g first and then f, giving $f(g(x))$; x must be allowed by g and $g(x)$ by f.'
 ],
 limits:[
  '$lim[x,a](f(x))=L$ means $f(x)$ approaches $L$ for x close to a, excluding a itself. The value $f(a)$ can differ from $L$ or be undefined. For a usual two-sided limit, the left and right limits must agree.',
  'Try substitution first. For $0/0$, factor and cancel for $x≠a$, or multiply by a conjugate. The form $0/0$ is not an answer. For bounded oscillation, the squeeze theorem can help: $-x^2≤x^2*sin(1/x)≤x^2$ forces the limit to be zero.',
  'Continuity at a requires $f(a)$ to be defined, the limit to exist, and the two to be equal. A hole is removable, unequal finite one-sided limits create a jump, and unbounded behavior creates an infinite discontinuity. The Intermediate Value Theorem guarantees intermediate outputs for a continuous function on $[a,b]$.',
  'For rational functions at infinity, compare leading powers or divide by the highest denominator power. A finite limit $L$ gives a horizontal asymptote $y=L$. A denominator zero only gives a vertical asymptote if the function becomes unbounded there.'
 ],
 definition:[
  'The secant slope is $(f(a+h)-f(a))/h$. Let h approach zero to obtain the tangent slope $f′(a)$. The limit must exist as a finite real number for a derivative to exist.',
  'For $f(x)=x^2$, expand $(a+h)^2-a^2=2*a*h+h^2$. Divide by h while $h≠0$ to get $2*a+h$. Taking $h→0$ gives $f′(a)=2*a$. A quotient like $((3+h)^2-9)/h$ therefore describes $f′(3)$.',
  'Once the slope is $m=f′(a)$, use $y-f(a)=m*(x-a)$. The derivative is a slope, whereas a tangent equation also includes a point.',
  'Differentiability implies continuity, but the converse fails. $abs(x)$ is continuous at zero and has left slope $-1$ and right slope $1$, so it is not differentiable there. Corners, cusps, vertical tangents and discontinuities need care.'
 ],
 rules:[
  'The power rule gives $d(x^n)/dx=n*x^(n-1)$ wherever the expression is differentiable. Constants differentiate to zero and sums differentiate term by term. In radians, $(sin(x))′=cos(x)$, $(cos(x))′=-sin(x)$, and $(tan(x))′=sec(x)^2$.',
  'For a product, differentiate one factor at a time: $(u*v)′=u′*v+u*v′$. For a quotient, $(u/v)′=(u′*v-u*v′)/v^2$. Keep the subtraction order and square the full denominator.',
  'For $f(g(x))$, differentiate the outer function evaluated at $g(x)$, then multiply by $g′(x)$. Example: $((x^2+1)^3)′=3*(x^2+1)^2*2*x$. For $sin(x^2)$, the derivative is $2*x*cos(x^2)$, not $cos(2*x)$.',
  'Differentiate again to obtain $f″$. If s is position, $s′$ is velocity and $s″$ is acceleration. Rewrite negative and fractional powers when they simplify your work.'
 ],
 implicit:[
  'Differentiate both sides with respect to x. The chain rule gives $d(y^2)/dx=2*y*y′$. Gather $y′$ terms and solve. For $x^2+y^2=25$, $2*x+2*y*y′=0$, so $y′=-x/y$ when $y≠0$.',
  'Draw the situation, define quantities and units, write an equation linking them, then differentiate with respect to t. Substitute the instant’s dimensions only after differentiating.',
  '$A=L*W$ implies $dA/dt=L*dW/dt+W*dL/dt$. With $L=20$ cm, $W=10$ cm, $dL/dt=8$ cm/s and $dW/dt=3$ cm/s, the area increases at $20*3+10*8=140$ cm²/s.',
  'For a cone, use similar triangles to express radius in terms of height before differentiating volume. Keep a negative sign when a quantity is decreasing.'
 ],
 extrema:[
  'A critical number c lies in the domain and has $f′(c)=0$ or an undefined derivative. Fermat’s theorem says a differentiable interior local extremum has derivative zero. The converse fails: $x^3$ has derivative zero at $0$ without an extremum.',
  'A continuous function on $[a,b]$ attains both an absolute maximum and minimum. Evaluate f at all interior critical numbers and at both endpoints; compare values. For $x^3-3*x$ on $[-2,2]$, candidates are $-2$, $-1$, $1$ and $2$. Their values are $-2$, $2$, $-2$ and $2$.',
  'If f is continuous on $[a,b]$ and differentiable on $(a,b)$, some c in $(a,b)$ satisfies $f′(c)=(f(b)-f(a))/(b-a)$. Rolle’s theorem is the special case $f(a)=f(b)$, giving $f′(c)=0$.',
  'If $f′≤M$ throughout an interval, the MVT bounds the net increase by M times the interval length. If $f′>0$ everywhere, f is strictly increasing, which can establish uniqueness of a root.'
 ],
 curves:[
  '$f′>0$ means increasing; $f′<0$ means decreasing. A positive-to-negative change gives a local maximum, and a negative-to-positive change gives a local minimum. For $f(x)=x/(x^2+1)$, $f′=(1-x^2)/(x^2+1)^2$. The denominator is always positive, so f increases on $(-1,1)$ and decreases on both outer intervals.',
  '$f″>0$ means concave upward; $f″<0$ means concave downward. An inflection point needs a concavity change and a point on the continuous curve. A zero of $f″$ alone is insufficient. If $f′(c)=0$ and $f″(c)>0$, c is a local minimum; if $f″(c)<0$, it is a local maximum. If $f″(c)=0$, this test is inconclusive.',
  'For $x/(x^2+1)$, $f″=2*x*(x^2-3)/(x^2+1)^3$. Concave up: $(-sqrt(3),0)$ and $(sqrt(3),inf)$. Concave down: $(-inf,-sqrt(3))$ and $(0,sqrt(3))$. Local minimum: $(-1,-1/2)$. Local maximum: $(1,1/2)$. Inflection points: $(-sqrt(3),-sqrt(3)/4)$, $(0,0)$ and $(sqrt(3),sqrt(3)/4)$.',
  'Record domain, intercepts, symmetry, asymptotes, monotonicity, extrema and concavity. The exam’s curve is odd, passes through $(0,0)$, has horizontal asymptote $y=0$ and no vertical asymptotes because $x^2+1$ never vanishes.'
 ],
 optimization:[
  'Define the quantity you want to maximize or minimize and the feasible inputs. Use the constraint to express the objective in one variable.',
  'With 2400 ft of fencing for three sides, let x be the perpendicular width and y the parallel length. The constraint is $2*x+y=2400$, so $A(x)=x*(2400-2*x)$ for $0≤x≤1200$.',
  '$A′=2400-4*x$ vanishes at $x=600$. Then $y=1200$ and $A=720000$ ft². $A″=-4$ confirms a local maximum, and comparison with zero-area endpoints confirms the absolute maximum.',
  'A dimension, an area and a location are different outputs. Include units in your written work. For distance problems, minimizing distance squared can avoid a square root.'
 ],
 antiderivatives:[
  'An antiderivative F satisfies $F′=f$. On an interval, any two antiderivatives differ by a constant. For $n≠-1$, the antiderivative of $x^n$ is $x^(n+1)/(n+1)+C$. Also, $int[x](cos(x))=sin(x)+C$ and $int[x](sin(x))=-cos(x)+C$.',
  'If $f′(x)=3*x^2$ and $f(0)=5$, integrate to $f=x^3+C$, then substitute zero to get $C=5$. An initial condition selects one member of the family.',
  'From $f″=24*x^2-3*x-3/2$, first obtain $f′=8*x^3-(3/2)*x^2-(3/2)*x+C_1$. Since $f′(0)=2$, $C_1=2$. Integrate again to $f=2*x^4-(1/2)*x^3-(3/4)*x^2+2*x+C_2$. Since $f(0)=-1$, $C_2=-1$.',
  'Differentiate your proposed answer once or twice and recheck the initial values. A specific initial-value solution should not still contain an arbitrary constant.'
 ],
 integrals:[
  'Divide $[a,b]$ into n equal subintervals of width $Δx=(b-a)/n$. A Riemann sum adds $f(x_i)*Δx$. With right endpoints $x_i=a+i*Δx$, increasing n approaches the definite integral for a continuous function: $lim[n,inf](sum[i,1,n](f(x_i)*Δx))=integral[x,a,b](f(x))$.',
  'Regions above the x-axis count positively and those below negatively. Reverse the integration limits to change the sign. Split an interval to add its integrals. A definite integral is a number, while an indefinite integral is a family of functions.',
  'For f continuous on $[a,b]$ and $F′=f$, the evaluation theorem gives $integral[x,a,b](f(x))=F(b)-F(a)$. Example: $integral[x,0,2](x^2)=eval[x,0,2](x^3/3)=8/3$.',
  'The integral of velocity gives displacement. Total distance integrates $abs(v)$ and requires splitting at sign changes. For $v(t)=t-1$ on $[0,2]$, displacement is zero but distance is $1$ because the negative and positive triangular areas each have magnitude $1/2$.'
 ]
};
const solutionSteps={
 f1:['Factor the denominator: $(x+3)*(x-2)$.','The quotient is negative on $(-inf,-3)$, nonnegative on $(-3,1]$, negative on $(1,2)$, and positive on $(2,inf)$.','Exclude denominator zeros $-3$ and $2$; include the numerator zero $1$.'],
 f2:['Write $g(x)=A*abs(x-2)-2$.','Substitute $(0,-6)$: $-6=2*A-2$, so $A=-2$.'],
 f3:['$f(-x)=-x*abs(-x)=-x*abs(x)=-f(x)$.'],
 l1:['Multiply numerator and denominator by $7+sqrt(12*x+1)$.','The numerator becomes $49-(12*x+1)=-12*(x-4)$.','Cancel $x-4$ and substitute: $-12/(7+7)=-6/7$.'],
 l2:['For $x<0$, $abs(x)/x=-1$. For $x>0$, it equals $1$.','The one-sided limits differ, so the two-sided limit does not exist.'],
 l3:['For $x≠2$, factor and cancel to get $x+2$.','The limit is $4$. Continuity requires $f(2)=k=4$.'],
 l4:['Divide top and bottom by $x^2$.','Terms $1/x^2$ and $5/x^2$ tend to zero, leaving $3/2$.'],
 d1:['Expand to $6*h+h^2$.','Divide by h to obtain $6+h$, then take $h→0$.'],
 d2:['The difference quotient simplifies to $2*a+h-8$.','Let $h→0$ to get $2*a-8$.'],
 d3:['The derivative is $2*x$, so the slope at $3$ is $6$.','The point is $(3,9)$: $y-9=6*(x-3)$, hence $y=6*x-9$.'],
 r1:['Take $u=x$, $v=x^2+1$, $u′=1$ and $v′=2*x$.','The quotient rule gives $((x^2+1)-2*x^2)/(x^2+1)^2$.','Simplify the numerator to $1-x^2$.'],
 r2:['Differentiate the outer cube: $3*(x^2+1)^2$.','Multiply by the inner derivative $2*x$.'],
 r3:['Apply the product rule with $u=x^2$ and $v=sin(x)$.','Add $u′*v=2*x*sin(x)$ and $u*v′=x^2*cos(x)$.'],
 r4:['Write $f′=(1-x^2)*(x^2+1)^(-2)$.','Differentiate: $-2*x*(x^2+1)^(-2)-4*x*(1-x^2)*(x^2+1)^(-3)$.','Factor over $(x^2+1)^3$ to obtain $2*x*(x^2-3)/(x^2+1)^3$.'],
 i1:['Differentiate: $2*x+2*y*y′=0$.','Solve: $y′=-x/y$, provided $y≠0$.'],
 i2:['Differentiate $A=L*W$ to obtain $A′=L*W′+W*L′$.','Substitute: $20*3+10*8=140$ cm²/s.'],
 i3:['$V′=4*pi*r^2*r′$.','$r′=100/(4*pi*25^2)=1/(25*pi)$ cm/s.'],
 e1:['The secant slope is $(9-1)/(3-1)=4$.','Set $f′(c)=2*c=4$ to get $c=2$, inside $(1,3)$.'],
 e2:['Critical numbers: $3*x^2-3=0$ gives $x=-1$ or $x=1$.','Compare $f(-2)=-2$, $f(-1)=2$, $f(1)=-2$ and $f(2)=2$.','The smallest value is $-2$, reached at $-2$ and $1$.'],
 c1:['$f′=(1-x^2)/(x^2+1)^2$.','The denominator is positive; the numerator is positive exactly when $-1<x<1$.'],
 c2:['$f″=2*x*(x^2-3)/(x^2+1)^3$.','Test signs on intervals split at $-sqrt(3)$, $0$ and $sqrt(3)$.','The sign is positive on $(-sqrt(3),0)$ and $(sqrt(3),inf)$.'],
 c3:['The denominator has larger degree than the numerator.','Both limits at positive and negative infinity are zero, so $y=0$ is the horizontal asymptote.'],
 c4:['For real x, $x^2+1>0$.','The function is continuous everywhere; there are no vertical asymptotes.'],
 o1:['$2*x+y=2400$, so $A=2400*x-2*x^2$.','$A′=2400-4*x=0$ gives $x=600$.','$A″<0$ and endpoint areas are zero, confirming the maximum.'],
 o2:['At $x=600$, the parallel side is $y=2400-1200=1200$.','Area: $600*1200=720000$ ft².'],
 a1:['Increase the exponent by one and divide by the new exponent.','$6*x^3/3=2*x^3$. Add an arbitrary constant C.'],
 a2:['Integrate: $f′=8*x^3-3*x^2/2-3*x/2+C_1$. Use $f′(0)=2$ to get $C_1=2$.','Integrate: $f=2*x^4-x^3/2-3*x^2/4+2*x+C_2$.','Use $f(0)=-1$ to get $C_2=-1$.'],
 a3:['Rewrite $x*sqrt(x)=x^(3/2)$.','Integrate to $(2/5)*x^(5/2)+C$.','At $x=1$, $2=2/5+C$, so $C=8/5$.'],
 n1:['An antiderivative is $x^3/3$.','Evaluate at $2$ and subtract the value at $0$: $8/3-0$.'],
 n2:['$Δx=1/2$. Right endpoints: $1/2$, $1$, $3/2$ and $2$.','Sum: $(1/2)*(1/4+1+9/4+4)=15/4$.'],
 n3:['Velocity changes sign at $t=1$.','Integrate $1-t$ on $[0,1]$ and $t-1$ on $[1,2]$.','Each integral is $1/2$; total distance is $1$.']
};
for(const t of course.topics){t.exercises.forEach(q=>{q.displayPrompt=prompts[q.id];q.steps=solutionSteps[q.id];});t.sections=t.sections.map(([title],i)=>[title,sectionBodies[t.id][i]]);t.displayFormula=formulas[t.id];}
for(const exam of course.exams){const i=exam.id,a=i+1,b=i+2,h=i+2,k=-(i+2),m=i+2,p=i+1,f=`f(x)=x/(x^2+${a*a})`;
 const statements={
 '1a':`Find the domain of $sqrt((x-${b})/((x+${a})*(x-${b+1})))$.`,
 '1b':`Find the domain of $1/((x+${a})*(x-${b}))$.`,
 '1c':`Find the domain of $sqrt((x-${a})*(x^2-${b*b}))/(3*x+2-sqrt(x^2-${a*a}))$.`,
 '2a':'In the definition $f′(a)=lim[h,0]((f(a+h)-f(a))/h)$, enter the difference quotient for $f(x)=x^2$. Keep a and h as variables.',
 '2b':`Evaluate $lim[h,0](((${b}+h)^2-${b*b})/h)$.`,
 '2c':`The quotient in 2(b) is $f′(a)$ for $f(x)=x^2$. Enter a.`,
 '3a':`Evaluate the right-hand limit $lim[x,${a}+] (sqrt(x^2-${a*a}))$.`.replace('] (',']('),
 '3b':`Evaluate $lim[x,${p}]((${m}-sqrt(${m}*(x-${p})+${m*m}))/(x-${p}))$.`,
 '4':`A downward absolute-value graph has vertex $(${h},${k})$ and passes through $(0,${k-m*h})$. Give $g(x)$ using abs(...) in your answer.`,
 '5a':`For $${f}$, find $f′(x)$.`,
 '5b':`For $${f}$, enter the number of vertical asymptotes.`,
 '5c':`For $${f}$, enter the horizontal asymptote’s y-value.`,
 '5d':`Where is $${f}$ increasing?`,
 '5e':`Where is $${f}$ decreasing?`,
 '5f':`Find $f″(x)$ for $${f}$.`,
 '5g':`Where is $${f}$ concave upward?`,
 '5h':`Where is $${f}$ concave downward?`,
 '5i':`For $${f}$, enter the x-coordinate of the local maximum.`,
 '5j':`For $${f}$, enter the x-coordinate of the local minimum.`,
 '5k':`For $${f}$, enter the positive inflection point’s x-coordinate.`,
 '5l':`For $${f}$, enter the positive inflection point’s y-coordinate.`,
 '6':`Recover $f(x)$ from $f″(x)=${12*p}*x^2-${6*p}*x-2$, $f′(0)=${b}$ and $f(0)=-${a}$.`
 };
 const s=`sqrt(${3*a*a})`;
 const steps={
  '1a':[`Mark the critical values $-${a}$, $${b}$ and $${b+1}$.`,`A sign chart gives a nonnegative radicand on $(-${a},${b}]$ and $(${b+1},inf)$.`,'Exclude denominator zeros and include the numerator zero.'],
  '1b':[`The denominator vanishes at $-${a}$ and $${b}$.`,'All other real values are allowed.'],
  '1c':[`Factor the numerator radicand: $(x-${a})*(x-${b})*(x+${b})$.`,`Its nonnegative set is $[-${b},${a}] U [${b},inf)$. The denominator root requires $x≤-${a}$ or $x≥${a}$.`,`At $x=${a}$ the denominator is $3*${a}+2$, so this point is also allowed. Intersecting the restrictions gives $[-${b},-${a}] U [${a},${a}] U [${b},inf)$.`,`For $x≤-${a}$ the denominator is negative; for $x≥${a}$ it is positive. It cannot vanish on the allowed set.`],
  '2a':['The definition is $lim[h,0]((f(a+h)-f(a))/h)$.','For $f(x)=x^2$, insert $(a+h)^2$ and $a^2$.'],
  '2b':[`Expand: $${2*b}*h+h^2$.`,`Divide by h and let $h→0$ to get $${2*b}$.`],
  '2c':[`Match $f(a+h)$ with $(${b}+h)^2$ and $f(a)$ with $${b*b}$.`,`Thus $a=${b}$.`],
  '3a':['From the right the radicand is nonnegative.','By continuity of the square root, the limit is $sqrt(0)=0$.'],
  '3b':['Multiply by the conjugate.',`The numerator becomes $-${m}*(x-${p})$.`,`Cancel to get $-${m}/(${m}+sqrt(${m}*(x-${p})+${m*m}))$. The limit is $-1/2$.`],
  '4':[`Use $g(x)=A*abs(x-${h})+(${k})$.`,`Substituting $x=0$ gives $A=-${m}$.`],
  '5a':['Use the quotient rule.',`Simplify $((x^2+${a*a})-2*x^2)/(x^2+${a*a})^2$.`],
  '5b':[`$x^2+${a*a}>0$ for every real x.`,'There are no real denominator zeros and no vertical asymptotes.'],
  '5c':['Divide numerator and denominator by $x^2$.','The limits at positive and negative infinity equal zero.'],
  '5d':[`The sign of $f′$ is the sign of $${a*a}-x^2$.`,`It is positive between $-${a}$ and $${a}$.`],
  '5e':[`$f′<0$ when $x^2>${a*a}$.`,'Take the two outer intervals.'],
  '5f':['Differentiate $f′$ using the product or quotient rule.',`Collect terms to get $2*x*(x^2-${3*a*a})/(x^2+${a*a})^3$.`],
  '5g':[`$f″$ has the sign of $x*(x^2-${3*a*a})$.`,`Split at $-${s}$, $0$ and $${s}$; positive intervals are $(-${s},0)$ and $(${s},inf)$.`],
  '5h':['Use the same second-derivative sign chart.','Choose the intervals where $f″<0$.'],
  '5i':[`At $x=${a}$, $f′$ changes from positive to negative.`,`The maximum point is $(${a},1/${2*a})$. The minimum is $(-${a},-1/${2*a})$.`],
  '5j':[`At $x=-${a}$, $f′$ changes from negative to positive.`,`Its y-coordinate is $-1/${2*a}$.`],
  '5k':[`$f″$ changes sign at $-${s}$, $0$ and $${s}$.`,`The positive inflection point is $(${s},${s}/${4*a*a})$. The other two are $(0,0)$ and $(-${s},-${s}/${4*a*a})$.`],
  '5l':[`Substitute $x=${s}$ into $x/(x^2+${a*a})$.`,`The denominator becomes $${3*a*a}+${a*a}=${4*a*a}$.`],
  '6':[`First integration: $f′=${4*p}*x^3-${3*p}*x^2-2*x+C_1$.`,`Use $f′(0)=${b}$, so $C_1=${b}$.`,`Second integration: $f=${p}*x^4-${p}*x^3-x^2+${b}*x+C_2$.`,`Use $f(0)=-${a}$, so $C_2=-${a}$.`]
 };
 for(const q of exam.questions){const key=q.id.split('-')[1],label=key.replace(/^(\d)([a-z])$/,'$1($2)');q.displayPrompt=`${label}. ${statements[key]}`;q.steps=steps[key];}
}
const derivativeTopic=course.topics.find(t=>t.id==='definition');
derivativeTopic.application='If position $s(t)$ is in meters and time in seconds, $s′(t)$ is instantaneous velocity in meters per second.';
derivativeTopic.warning='Never substitute $h=0$ before canceling; the original difference quotient is undefined there.';
course.topics.find(t=>t.id==='curves').warning='Concave down does not mean decreasing. Inflection points require a change of concavity, not just $f″=0$.';
course.topics.find(t=>t.id==='optimization').warning='Solving $f′=0$ without checking the feasible domain does not establish the global optimum.';
course.topics.find(t=>t.id==='antiderivatives').warning='A general indefinite integral needs $+C$. Each integration introduces a new constant.';
root.Course=course;if(typeof module!=='undefined')module.exports=course;
})(typeof window!=='undefined'?window:globalThis);
