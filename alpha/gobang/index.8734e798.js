let t=document.createElement("canvas"),e=t.getContext("2d");t.width=t.height=800,t.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",document.body.appendChild(t);let l=Array.from({length:15},()=>Array(15).fill(-1)),o=!0,r=0;t.onclick=t=>{let[e,i]=[t.offsetX,t.offsetY].map(t=>Math.round(t/50)-1);if(l[e]?.[i]!==-1)return alert("该位置不可落子！");n(e,i,o),l[e][i]=o?1:2,a(e,i,l[e][i],l)?alert(`${o?"黑":"白"}\u{68CB}\u{8D62}\u{4E86}!`):225==++r?alert("游戏结束，平局！"):o=!o};const i=(t,l,o,r,i=1,n="#000000")=>{e.lineWidth=i,e.strokeStyle=n,e.beginPath(),e.moveTo(50*t+50,50*l+50),e.lineTo(50*o+50,50*r+50),e.stroke()},n=(t,l,o)=>{e.beginPath(),e.arc(50*t+50,50*l+50,20,0,2*Math.PI),e.closePath(),e.fillStyle=o?"black":"white",e.fill()},a=(t,e,l,o)=>[[1,0],[0,1],[1,1],[1,-1]].some(([r,i])=>{let n=1,a=0,f=0;for(;n<5&&o[t+r*++a]?.[e+i*a]===l;)n++;for(;n<5&&o[t-r*++f]?.[e-i*f]===l;)n++;if(5===n)return!0});window.onload=()=>{e.fillStyle="#E4A751",e.fillRect(0,0,800,800);for(let t=0;t<15;t++)i(0,t,14,t),i(t,0,t,14)};