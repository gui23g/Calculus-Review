/* Data-driven, accessible SVG figures. The plotted coordinates also drive the graph tests. */
(function(root){
'use strict';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(id,instance=''){
 const g=root.Course.graphs[id];if(!g)return '';
 const W=640,H=360,p={left:51,right:29,top:25,bottom:43},sx=x=>p.left+(x-g.xMin)/(g.xMax-g.xMin)*(W-p.left-p.right),sy=y=>H-p.bottom-(y-g.yMin)/(g.yMax-g.yMin)*(H-p.top-p.bottom);
 const uid='plot-'+id+(instance?'-'+instance:''),figureId='graph-'+id+(instance?'-'+instance:''),axisX=Math.max(g.xMin,Math.min(g.xMax,0)),axisY=Math.max(g.yMin,Math.min(g.yMax,0));
 let grid='',ticks='';
 for(let x=Math.ceil(g.xMin/(g.xStep||1))*(g.xStep||1);x<=g.xMax;x+=g.xStep||1){grid+=`<path d="M${sx(x)} ${p.top}V${H-p.bottom}"/>`;ticks+=`<text x="${sx(x)}" y="${H-17}" text-anchor="middle">${x}</text>`;}
 for(let y=Math.ceil(g.yMin/(g.yStep||1))*(g.yStep||1);y<=g.yMax;y+=g.yStep||1){grid+=`<path d="M${p.left} ${sy(y)}H${W-p.right}"/>`;ticks+=`<text x="${p.left-10}" y="${sy(y)+4}" text-anchor="end">${y}</text>`;}
 const path=points=>points.map(([x,y],i)=>`${i?'L':'M'}${sx(x).toFixed(2)},${sy(y).toFixed(2)}`).join(' ');
 const shaded=(g.areas||[]).map(a=>`<path class="plot-area ${a.sign}" d="${path(a.points)}Z"/>`).join('');
 const curves=g.lines.map(line=>`<path class="plot-curve ${line.kind||''}" d="${path(line.points)}" ${line.arrows?`marker-start="url(#${uid}-arrow)" marker-end="url(#${uid}-arrow)"`:''}/>`).join('');
 const points=(g.points||[]).map(pt=>`<circle cx="${sx(pt.x)}" cy="${sy(pt.y)}" r="5.8" class="plot-point ${pt.open?'open':'closed'}"/>${pt.label?`<text class="plot-point-label" x="${sx(pt.x)+(pt.dx||10)}" y="${sy(pt.y)+(pt.dy||-12)}">${esc(pt.label)}</text>`:''}`).join('');
 return `<figure class="study-graph" id="${figureId}"><figcaption><span class="eyebrow">Read the graph</span><strong>${esc(g.title)}</strong></figcaption><svg viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="${uid}-title ${uid}-desc"><title id="${uid}-title">${esc(g.title)}</title><desc id="${uid}-desc">${esc(g.description)}</desc><defs><marker id="${uid}-arrow" orient="auto-start-reverse" markerWidth="6" markerHeight="6" refX="5" refY="3"><path d="M0 0L6 3L0 6" fill="none" stroke="context-stroke"/></marker></defs><g class="plot-grid">${grid}</g><g class="plot-axis"><path d="M${p.left} ${sy(axisY)}H${W-p.right}"/>${g.xMin<=0&&g.xMax>=0?`<path d="M${sx(0)} ${p.top}V${H-p.bottom}"/>`:''}</g><g class="plot-ticks">${ticks}</g>${shaded}${curves}${points}<text class="plot-axis-label" x="${W-13}" y="${H-17}">${esc(g.xLabel||'x')}</text><text class="plot-axis-label" x="12" y="18">${esc(g.yLabel||'y')}</text></svg><p class="plot-legend">${esc(g.legend)}</p><details class="graph-description"><summary>Text description of this graph</summary><p>${esc(g.description)}</p></details></figure>`;
}
root.GraphView={render};if(typeof module!=='undefined')module.exports=root.GraphView;
})(typeof window!=='undefined'?window:globalThis);
