const e=["2","4","8","16","32","64","128","256","512","1024","2048"],t=["#EEE4DA","#EDE0C8","#EDA166","#F08151","#F1654D","#F1462E","#E8C65F","#E8C34F","#E8BE40","#E8BB31","#E8B724"],r=[70,70,70,60,60,60,50,50,50,50,40];/** @type {HTMLCanvasElement} */let l=document.createElement("canvas"),o=l.getContext("2d");l.width=600,l.height=600,l.style.cssText="position: absolute; inset: 0; margin: auto;",document.body.appendChild(l),document.body.style.backgroundColor="#F9F7EB";let n=Array.from({length:4},()=>[,,,,].fill(-1));// 当前最大值（判断是否达到2048）
document.addEventListener("keydown",e=>{let t=s[e.key];t&&a(t,n)});const a=(e,t)=>{let r=e(JSON.parse(JSON.stringify(t)));r.toString()!==t.toString()&&(n=r,f())},i=e=>{let t=[],r=!1;for(let l=e.length-1;l>=0;l--)-1!==e[l]&&(r&&e[l]===t[0]?(t[0]++,r=!1):(t.unshift(e[l]),r=!0));return Array(e.length-t.length).fill(-1).concat(t)},c=e=>e[0].map((t,r)=>e.map(e=>e[r])),s={ArrowUp:e=>e.map(e=>i(e.reverse()).reverse()),ArrowDown:e=>e.map(e=>i(e)),ArrowLeft:e=>c(c(e).map(e=>i(e.reverse()).reverse())),ArrowRight:e=>c(c(e).map(e=>i(e)))},f=()=>{if(d())return alert("你赢了");let{x:e,y:t}=y(n);if(n[e][t]=.5>Math.random()?0:1,o.clearRect(0,0,600,600),m(),E(n),h())return alert("你输了！")},d=()=>0==e.length-1,h=()=>!n.some((e,t)=>e.some((r,l)=>-1===r||r===e[l+1]||r===n[t+1]?.[l])),u=(l,n,a)=>{let[i,c,s]=[e,t,r].map(e=>e[a]);g(l,n,c),o.font=`${s}px serif`,o.fillStyle=a<2?"#645B52":"#F7F4EF";let f=o.measureText(i),d=f.actualBoundingBoxLeft+f.actualBoundingBoxRight,h=f.actualBoundingBoxAscent+f.actualBoundingBoxDescent;o.fillText(i,145*l+20+(125-d)/2,145*n+20+h+(125-h)/2)},E=e=>e.forEach((t,r)=>t.forEach((t,l)=>{g(r,l),-1!==e[r][l]&&u(r,l,e[r][l])})),m=()=>{o.fillStyle="#AD9D8F",o.fillRect(0,0,600,600)},g=(e,t,r="#C2B4A5")=>{o.fillStyle=r,o.fillRect(145*e+20,145*t+20,125,125)},y=e=>{let t=[];return e.forEach((r,l)=>r.forEach((r,o)=>-1===e[l][o]&&t.push({x:l,y:o}))),t[Math.floor(Math.random()*t.length)]};window.onload=()=>{for(let e=0;e<2;e++){let{x:e,y:t}=y(n);n[e][t]=.5>Math.random()?0:1}m(),E(n)};