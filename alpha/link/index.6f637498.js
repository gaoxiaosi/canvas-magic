const e=100,t=e/12,l=e/2,r=6*(e+10)+10+2*l,o=6*(e+10)+10+2*l,i=["A","B","C","D","E","F","G"],n=["#409EFF","#67C23A","#E6A23C","#F56C6C","#B37FEB","#FF85C0","#36CFC9"],y="#00AEEC",f="#F8BBD0";let s=document.createElement("canvas"),x=s.getContext("2d");s.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",s.width=r,s.height=o,document.body.appendChild(s),document.body.style.backgroundColor=f;let c=Array.from({length:8},()=>Array(8).fill(-1)),a={x:-1,y:-1},d={x:-1,y:-1},F={x:-1,y:-1},h=0;s.onclick=t=>{let[r,o]=[t.offsetX,t.offsetY].map(t=>Math.ceil((t-l)/(e+10)));if(t.offsetX-(r-1)*(e+10)-l<10||t.offsetY-(o-1)*(e+10)-l<10||-1===c[r][o])return;p(r,o);let i=a.x,n=a.y;if(-1===i&&-1===n)a={x:r,y:o};else{if(i===r&&n===o){a={x:-1,y:-1},E(r,o);return}m(a,{x:r,y:o})?(c[i][n]=-1,c[r][o]=-1,a={x:-1,y:-1},h++,R(),u()&&alert("游戏结束，你赢了")):(E(i,n),a={x:r,y:o})}};const u=()=>2*h==36,C=(e,t)=>{let{x:l,y:r}=e,{x:o,y:i}=t;return l===o?(r>i&&([r,i]=[i,r]),c[l].slice(r+1,i).every(e=>-1===e)):r===i&&(l>o&&([l,o]=[o,l]),c.slice(l+1,o).every(e=>-1===e[r]))},g=(e,t)=>{let{x:l,y:r}=e,{x:o,y:i}=t;for(let[e,n]of[[1,0],[-1,0],[0,1],[0,-1]]){let y=0,f=l,s=r;for(;c[f=l+e*++y]?.[s=r+n*y]===-1;)if(d={x:f,y:s},JSON.stringify(F=0===e?{x:o,y:s}:{x:f,y:i})===JSON.stringify(t)&&C(d,t)||-1===c[F.x][F.y]&&C(d,F)&&C(F,t))return!0}return!1},m=(e,t)=>(d=e,F=t,c[e.x][e.y]===c[t.x][t.y]&&(!!C(e,t)||g(e,t))),p=(l,r,o=y)=>{x.strokeStyle=o,x.lineWidth=t,x.strokeRect(B(l)+t/2,B(r)+t/2,e-t,e-t)},E=(e,t)=>{k(e,t,c[e][t])},A=()=>{x.fillStyle=f,x.fillRect(l,l,r-2*l,o-2*l)},B=t=>(t-1)*(e+10)+10+l,S=e=>e.sort(()=>Math.random()-.5),b=()=>{let e=[],t=0;for(let l=0;l<18;l++)t=l%i.length,e.push(t,t);let l=S(e);for(let e=1;e<7;e++)for(let t=1;t<7;t++)c[e][t]=l.pop()},k=(t,l,r,o=e)=>{t=B(t),l=B(l),x.fillStyle=n[r%n.length],x.fillRect(t,l,o,o),x.font="40px serif",x.fillStyle="#FFFFFF",x.textBaseline="middle",x.textAlign="center",x.fillText(i[r],t+o/2,l+o/2)},R=()=>{x.clearRect(0,0,r,o),A(),c.forEach((e,t)=>e.forEach((e,l)=>-1!==e&&k(t,l,e)))},v=async()=>{b(),R()};window.onload=v;