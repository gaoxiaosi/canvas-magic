var t=globalThis,e={},a={},l=t.parcelRequire6f20;null==l&&((l=function(t){if(t in e)return e[t].exports;if(t in a){var l=a[t];delete a[t];var n={id:t,exports:{}};return e[t]=n,l.call(n.exports,n,n.exports),n.exports}var r=Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){a[t]=e},t.parcelRequire6f20=l),(0,l.register)("8PRdk",function(t,e){Object.defineProperty(t.exports,"default",{get:()=>a,set:void 0,enumerable:!0,configurable:!0});var a=class{constructor({canvas:t,onSuccess:e,onCancel:a,primaryColor:l="#F56C6C",maskColor:n="rgba(128, 128, 128, 0.6)",btnTextColor:r="#FFFFFF",textTitle:i="游戏结束",successBtnText:o="重新开始",cancelBtnText:s="取消"}){Object.assign(this,{onSuccess:e,onCancel:a,primaryColor:l,maskColor:n,btnTextColor:r,textTitle:i,successBtnText:o,cancelBtnText:s,W:t.width,H:t.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40}),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,this.canvas.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",t.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}drawMask(){let{ctx:t,H:e,W:a,maskColor:l}=this;t.fillStyle=l,t.fillRect(0,0,a,e)}drawTitle(){let{ctx:t,H:e,W:a,btnH:l,textTitle:n,titleH:r,titleBtnSpacing:i,primaryColor:o}=this;t.font=`${r}px Arial`,t.textAlign="center",t.textBaseline="top",t.fillStyle=o,t.fillText(n,a/2,(e-r-i-l)/2)}drawButtons(){let{canvas:t,ctx:e,H:a,W:l,btnTextColor:n,primaryColor:r,onSuccess:i,onCancel:o,titleH:s,titleBtnSpacing:c,successBtnText:h,cancelBtnText:d,btnH:x,btnPadding:u,btnSpacing:f}=this;e.font=`${x-2*u}px Arial`,e.textBaseline="top",e.textAlign="left";let p=e.measureText(h).width+2*u,m=e.measureText(d).width+2*u,v=(a+s+c)/2-x/2,g=(l-p-m-f)/2,y=g+p+f,w=[g,g+p,v,v+x],E=[y,y+m,v,v+x];e.fillStyle=r,e.fillRect(g,v,p,x),e.fillRect(y,v,m,x),e.fillStyle=n,e.fillText(h,g+u,v+u),e.fillText(d,y+u,v+u);let T=(t,e,[a,l,n,r])=>t>=a&&t<=l&&e>=n&&e<=r;t.onclick=t=>[i,o][[w,E].findIndex(e=>T(t.offsetX,t.offsetY,e)&&(this.close(),!0))]?.()}close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}}});var n=l("8PRdk");const r=125,i=4*(r+20)+20,o=4*(r+20)+20,s="#C2B4A5",c=6,h=["2","4","8","16","32","64","128","256","512","1024","2048"],d=["#EEE4DA","#EDE0C8","#EDA166","#F08151","#F1654D","#F1462E","#E8C65F","#E8C34F","#E8BE40","#E8BB31","#E8B724"],x=[70,70,70,60,60,60,50,50,50,50,40],u=64;let f=document.createElement("canvas"),p=f.getContext("2d");f.width=i,f.height=o,f.style.cssText="position: absolute; inset: 0; margin: auto;",document.body.appendChild(f),document.body.style.backgroundColor="#F9F7EB";let m=Array.from({length:4},()=>[,,,,].fill(-1)),v=0,g=!1,y=[],w=[],E=[],T=[];document.addEventListener("keydown",async t=>{if(g)return;let e=t.key,a=k[e];if(!a)return;w=[],y=[],T=[],E=[];let l=a(JSON.parse(JSON.stringify(m)));if(l.toString()!==m.toString()){if(m=l,await A(w,y,e),T.length>0){let t=F[e];T=T.map(({index:e,pos:a,val:l})=>t(e,a,l)),E=E.map(({index:e,pos:a,val:l})=>t(e,a,l)),await C(T,E,b,.3,128)}D()}});const F={ArrowUp:(t,e,a,l=0)=>({x:t,y:3-e-l,val:a}),ArrowDown:(t,e,a,l=0)=>({x:t,y:e+l,val:a}),ArrowLeft:(t,e,a,l=0)=>({x:3-e-l,y:t,val:a}),ArrowRight:(t,e,a,l=0)=>({x:e+l,y:t,val:a})},A=(t,e,a,l=u)=>new Promise(n=>{let r=null,s=null,c=[],h=F[a];e=e.map(({index:t,pos:e,val:a})=>h(t,e,a));let d=a=>{r||(r=a),s=a-r,c=t.map(({index:t,pos:e,val:a,distance:n})=>h(t,e,a,n*Math.sin(s/l*Math.PI/2))),p.clearRect(0,0,i,o),L(),e.forEach(({x:t,y:e,val:a})=>W(t,e,a)),c.forEach(({x:t,y:e,val:a})=>W(t,e,a)),s<l?requestAnimationFrame(d):n()};requestAnimationFrame(d)}),C=(t,e,a,l,n)=>new Promise(s=>{let c=null,h=null,d=0,x=u=>{c||(c=u),console.log(d=a((h=u-c)/n,l)),p.clearRect(0,0,i,o),L(),e.forEach(({x:t,y:e,val:a})=>W(t,e,a)),t.forEach(({x:t,y:e,val:a})=>W(t-d/2,e-d/2,a,r+r*d,d)),h<n?requestAnimationFrame(x):s()};requestAnimationFrame(x)}),b=(t,e)=>Math.sin(t*Math.PI)*e,B=(t,e)=>Math.cos(t*Math.PI/2+Math.PI)*(1-e),S=(t,e)=>{let a=[],l=!1,n=t.length,r=0;for(let i=n-1;i>=0;i--)-1!==t[i]&&(l&&t[i]===a[0]?(v=Math.max(++a[0],v),l=!1,T.push({index:e,val:t[i],pos:n-a.length}),E.pop()):(a.unshift(t[i]),E.push({index:e,val:t[i],pos:n-a.length}),l=!0),0==(r=n-a.length-i)?y.push({index:e,val:t[i],pos:i}):w.push({index:e,val:t[i],pos:i,distance:r}));return Array(n-a.length).fill(-1).concat(a)},M=t=>t[0].map((e,a)=>t.map(t=>t[a])),k={ArrowUp:t=>t.map((t,e)=>S(t.reverse(),e).reverse()),ArrowDown:t=>t.map((t,e)=>S(t,e)),ArrowLeft:t=>M(M(t).map((t,e)=>S(t.reverse(),e).reverse())),ArrowRight:t=>M(M(t).map((t,e)=>S(t,e)))},D=async()=>{if(P())g=!0,O("你赢了!");else{let t=[];m.forEach((e,a)=>e.forEach((e,l)=>-1!==e&&t.push({x:a,y:l,val:e})));let{x:e,y:a}=j(m),l=.5>Math.random()?0:1;m[e][a]=l,R()&&(g=!0,O(`\u{4F60}\u{8F93}\u{4E86}\u{FF01}\u{6700}\u{9AD8}\u{5206}\u{FF1A}${h[v]}`)),await C([{x:e,y:a,val:l}],t,B,.7,256)}p.clearRect(0,0,i,o),L(),N()},P=()=>v===h.length-1,R=()=>!m.some((t,e)=>t.some((a,l)=>-1===a||a===t[l+1]||a===m[e+1]?.[l])),H=async()=>{let t=[];for(let e=0;e<2;e++){let{x:e,y:a}=j(m),l=.5>Math.random()?0:1;m[e][a]=l,t.push({x:e,y:a,val:l})}await C(t,[],B,.7,256),L(),N()},O=t=>new n.default({canvas:f,onSuccess:q,maskColor:"rgba(143, 122, 102, 0.5)",primaryColor:"#EDA166",textTitle:t}),q=()=>{g=!1,m=Array.from({length:4},()=>[,,,,].fill(-1)),v=0,w=[],y=[],T=[],E=[],H()},I=t=>t*(20+r)+20,W=(t,e,a,l=r,n=0)=>{let[i,o,s]=[h,d,x].map(t=>t[a]);$(t,e,o,l),p.font=`${s*(1+n)}px serif`,p.fillStyle=a<2?"#645B52":"#F7F4EF",p.textBaseline="middle",p.textAlign="center",p.fillText(i,I(t)+l/2,I(e)+l/2)},N=()=>m.forEach((t,e)=>t.forEach((t,a)=>-1!==t&&W(e,a,t))),$=(t,e,a=s,l=r)=>U(I(t),I(e),l,l,6,a),L=()=>{U(0,0,i,o,6,"#AD9D8F");for(let t=0;t<4;t++)for(let e=0;e<4;e++)$(t,e)},U=(t,e,a,l,n=c,r)=>{p.beginPath(),p.moveTo(t+n,e),p.arcTo(t+a,e,t+a,e+l,n),p.arcTo(t+a,e+l,t,e+l,n),p.arcTo(t,e+l,t,e,n),p.arcTo(t,e,t+a,e,n),p.closePath(),r&&(p.fillStyle=r,p.fill())},j=t=>{let e=[];return t.forEach((a,l)=>a.forEach((a,n)=>-1===t[l][n]&&e.push({x:l,y:n}))),e[Math.floor(Math.random()*e.length)]};window.onload=H;