let t;function e(t,e,n,r){Object.defineProperty(t,e,{get:n,set:r,enumerable:!0,configurable:!0})}function n(t){return t&&t.__esModule?t.default:t}var r=globalThis,i={},a={},o=r.parcelRequire6f20;null==o&&((o=function(t){if(t in i)return i[t].exports;if(t in a){var e=a[t];delete a[t];var n={id:t,exports:{}};return i[t]=n,e.call(n.exports,n,n.exports),n.exports}var r=Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){a[t]=e},r.parcelRequire6f20=o);var l=o.register;l("dRo73",function(t,n){e(t.exports,"register",()=>r,t=>r=t);var r,i=new Map;r=function(t,e){for(var n=0;n<e.length-1;n+=2)i.set(e[n],{baseUrl:t,path:e[n+1]})}}),l("8PRdk",function(t,n){e(t.exports,"default",()=>r);var r=class{constructor({isFullScreen:t,canvas:e,onSuccess:n,onCancel:r,primaryColor:i="#F56C6C",maskColor:a="rgba(128, 128, 128, 0.6)",btnTextColor:o="#FFFFFF",textTitle:l="游戏结束",successBtnText:c="重新开始",cancelBtnText:s="取消",titleH:d=50,titleBtnSpacing:f=50,btnH:p=40,btnPadding:g=10,btnSpacing:H=40}){Object.assign(this,{isFullScreen:!1,onSuccess:n,onCancel:r,primaryColor:i,maskColor:a,btnTextColor:o,textTitle:l,successBtnText:c,cancelBtnText:s,W:e?.width,H:e?.height,titleH:d,titleBtnSpacing:f,btnH:p,btnPadding:g,btnSpacing:H}),this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,t?(this.canvas.width=window.innerWidth,this.W=window.innerWidth,this.canvas.height=window.innerHeight,this.H=window.innerHeight,this.canvas.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",document.body.appendChild(this.canvas)):(this.canvas.width=this.W,this.canvas.height=this.H,this.canvas.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",e.parentNode.appendChild(this.canvas)),this.drawMask(),this.drawTitle(),this.drawButtons()}drawMask(){let{ctx:t,H:e,W:n,maskColor:r}=this;t.fillStyle=r,t.fillRect(0,0,n,e)}drawTitle(){let{ctx:t,H:e,W:n,btnH:r,textTitle:i,titleH:a,titleBtnSpacing:o,primaryColor:l}=this;t.font=`${a}px Arial`,t.textAlign="center",t.textBaseline="top",t.fillStyle=l,t.fillText(i,n/2,(e-a-o-r)/2)}drawButtons(){let{canvas:t,ctx:e,H:n,W:r,btnTextColor:i,primaryColor:a,onSuccess:o,onCancel:l,titleH:c,titleBtnSpacing:s,successBtnText:d,cancelBtnText:f,btnH:p,btnPadding:g,btnSpacing:H}=this;e.font=`${p-2*g}px Arial`,e.textBaseline="top",e.textAlign="left";let u=e.measureText(d).width+2*g,x=e.measureText(f).width+2*g,S=(n+c+s)/2-p/2,h=(r-u-x-H)/2,y=h+u+H,m=[h,h+u,S,S+p],_=[y,y+x,S,S+p];e.fillStyle=a,e.fillRect(h,S,u,p),e.fillRect(y,S,x,p),e.fillStyle=i,e.fillText(d,h+g,S+g),e.fillText(f,y+g,S+g);let R=(t,e,[n,r,i,a])=>t>=n&&t<=r&&e>=i&&e<=a;t.onclick=t=>[o,l][[m,_].findIndex(e=>R(t.offsetX,t.offsetY,e)&&(this.close(),!0))]?.()}close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}}}),o("dRo73").register(new URL("",import.meta.url).toString(),JSON.parse('["2azQZ","index.b01d5535.js","iJRo9","../../1.6a13da6b.jpg","ipDpp","../../2.79f62ab7.jpg","k9cm9","../../3.befba8c5.jpg","bnZNv","../../4.cd8a4663.jpg","8Obk0","../../5.aabd2e3f.jpg","8whIW","../../6.f8bd7b96.jpg","2ypfC","../../7.ee282bc1.jpg","e0mL4","../../8.dc49f5aa.jpg","9bUDr","../../9.6490605c.jpg","jaKF2","../../10.5ec68f07.jpg","aH5ub","../../11.ac78ea64.jpg","2A4rN","../../12.cf884c2a.jpg","dHmkK","../../13.19815d43.jpg","1rBeV","../../14.f363d0c4.jpg","1mvLs","../../15.13cdb960.jpg","kzU9y","../../16.df82ff1c.jpg","hd8t2","../../17.77e0b12b.jpg","tcdFn","../../18.b0432aad.jpg","7GaMD","../../19.372b5444.jpg","anvwP","../../20.a0d7bd23.jpg"]'));var c=o("8PRdk"),s={};s=new URL("../../1.6a13da6b.jpg",import.meta.url).toString();var d={};d=new URL("../../2.79f62ab7.jpg",import.meta.url).toString();var f={};f=new URL("../../3.befba8c5.jpg",import.meta.url).toString();var p={};p=new URL("../../4.cd8a4663.jpg",import.meta.url).toString();var g={};g=new URL("../../5.aabd2e3f.jpg",import.meta.url).toString();var H={};H=new URL("../../6.f8bd7b96.jpg",import.meta.url).toString();var u={};u=new URL("../../7.ee282bc1.jpg",import.meta.url).toString();var x={};x=new URL("../../8.dc49f5aa.jpg",import.meta.url).toString();var S={};S=new URL("../../9.6490605c.jpg",import.meta.url).toString();var h={};h=new URL("../../10.5ec68f07.jpg",import.meta.url).toString();var y={};y=new URL("../../11.ac78ea64.jpg",import.meta.url).toString();var m={};m=new URL("../../12.cf884c2a.jpg",import.meta.url).toString();var _={};_=new URL("../../13.19815d43.jpg",import.meta.url).toString();var R={};R=new URL("../../14.f363d0c4.jpg",import.meta.url).toString();var b={};b=new URL("../../15.13cdb960.jpg",import.meta.url).toString();var w={};w=new URL("../../16.df82ff1c.jpg",import.meta.url).toString();var E={};E=new URL("../../17.77e0b12b.jpg",import.meta.url).toString();var F={};F=new URL("../../18.b0432aad.jpg",import.meta.url).toString();var v={};v=new URL("../../19.372b5444.jpg",import.meta.url).toString();var A={};A=new URL("../../20.a0d7bd23.jpg",import.meta.url).toString();const j=window.devicePixelRatio||1,C=window.innerWidth<768?60:100,T=C/12,U=C/12,k=C/2+T,B=10/j,L=Math.floor((window.innerWidth-2*k-B)/(C+B)),W=(t=Math.floor((window.innerHeight-2*k-B)/(C+B)),L%2&&t%2?t-1:t),O=L*(C+B)+B+2*k,N=W*(C+B)+B+2*k,P=[n(s),n(d),n(f),n(p),n(g),n(H),n(u),n(x),n(S),n(h),n(y),n(m),n(_),n(R),n(b),n(w),n(E),n(F),n(v),n(A)],M=["#409EFF","#67C23A","#E6A23C","#F56C6C","#B37FEB","#FF85C0","#36CFC9"],D="#00AEEC",J="#00AEEC",I="#F8BBD0";let Y=document.createElement("canvas"),z=Y.getContext("2d");Y.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;-webkit-user-select: none; -moz-user-select: none; ms-user-select: none; user-select: none;",Y.width=O*j,Y.height=N*j,Y.style.width=O+"px",Y.style.height=N+"px",document.body.appendChild(Y),z.scale(j,j),document.body.style.backgroundColor=I;let X=Array.from({length:L+2},()=>Array(W+2).fill(-1)),$={x:-1,y:-1},q={x:-1,y:-1},K={x:-1,y:-1},Z={x:-1,y:-1},G={x:-1,y:-1},Q={x:-1,y:-1},V=0,tt=null,te=!1,tn=!1,tr=0,ti=[],ta=Array(P.length).fill(!1);document.addEventListener("keydown",t=>"A"===t.key.toUpperCase()&&!te&&to());const to=async()=>{te=!0,$=G,Z=Q;let{x:t,y:e}=$,{x:n,y:r}=Z;tH(t,e),tH(n,r),tR(),X[t][e]=-1,X[n][r]=-1,V++,await tl(369),tb(),tn?ts():to()};Y.onclick=async t=>{let[e,n]=[t.offsetX,t.offsetY].map(t=>Math.ceil((t-k)/(C+B)));if(t.offsetX-(e-1)*(C+B)-k<B||t.offsetY-(n-1)*(C+B)-k<B||-1===X[e][n])return;tH(e,n);let r=$.x,i=$.y;if(-1===r&&-1===i)$={x:e,y:n};else{if(r===e&&i===n){$={x:-1,y:-1},tu(e,n);return}Z={x:e,y:n},tp($,Z)?(tR(),X[r][i]=-1,X[e][n]=-1,$={x:-1,y:-1},Z={x:-1,y:-1},V++,await tl(369),tb(),tn&&ts()):(tu(r,i),$={x:e,y:n},Z={x:-1,y:-1})}};const tl=t=>new Promise(e=>setTimeout(e,t)),tc=()=>2*V==W*L&&(tn=!0),ts=()=>new c.default({onSuccess:tw,isFullScreen:!0,textTitle:"You Win!",successBtnText:"Restart",cancelBtnText:"Cancel",primaryColor:"#00AEEC",maskColor:"#F8BBD0",titleH:.15*window.innerWidth,titleBtnSpacing:.15*window.innerHeight,btnH:.08*window.innerWidth,btnPadding:.02*window.innerWidth,btnSpacing:.05*window.innerWidth}),td=(t,e)=>{let{x:n,y:r}=t,{x:i,y:a}=e;return n===i?(r>a&&([r,a]=[a,r]),X[n].slice(r+1,a).every(t=>-1===t)):r===a&&(n>i&&([n,i]=[i,n]),X.slice(n+1,i).every(t=>-1===t[r]))},tf=(t,e)=>{let{x:n,y:r}=t,{x:i,y:a}=e;for(let[t,o]of[[1,0],[-1,0],[0,1],[0,-1]]){let l=0,c=n,s=r;for(;X[c=n+t*++l]?.[s=r+o*l]===-1;)if(q={x:c,y:s},K=0===t?{x:i,y:s}:{x:c,y:a},JSON.stringify(K)===JSON.stringify(e)&&td(q,e)||-1===X[K.x][K.y]&&td(q,K)&&td(K,e))return!0}return!1},tp=(t,e)=>(q=t,K=e,X[t.x][t.y]===X[e.x][e.y]&&(!!td(t,e)||tf(t,e))),tg=()=>{if(tr++>1e3)return alert("未知错误，请重新刷新页面"),!0;if(tn)return!1;let t={};for(let e of(X.forEach((e,n)=>e.forEach((e,r)=>{-1!==e&&(t[e]?t[e].push({x:n,y:r}):t[e]=[{x:n,y:r}])})),Object.values(t)))for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++)if(tp(e[t],e[n]))return G=e[t],Q=e[n],!0;return!1},tH=(t,e,n=D)=>{z.strokeStyle=n,z.lineWidth=U,z.strokeRect(tS(t)+U/2,tS(e)+U/2,C-U,C-U)},tu=(t,e)=>{t_(t,e,X[t][e])},tx=()=>{z.fillStyle=I,z.fillRect(k,k,O-2*k,N-2*k)},tS=t=>(t-1)*(C+B)+B+k,th=t=>t.sort(()=>Math.random()-.5),ty=()=>{let t=[],e=0;for(let n=0;n<W*L/2;n++)e=n%P.length,t.push(e,e);let n=th(t);for(let t=1;t<L+1;t++)for(let e=1;e<W+1;e++)X[t][e]=n.pop()},tm=()=>{console.log("需要打乱数据");let t=[];for(let e=1;e<L+1;e++)for(let n=1;n<W+1;n++)t.push(X[e][n]);let e=th(t);for(let t=1;t<L+1;t++)for(let n=1;n<W+1;n++)X[t][n]=e.pop()},t_=(t,e,n,r=C)=>{t=tS(t),e=tS(e),ta[n]?(z.strokeStyle=I,z.strokeRect(t,e,r,r),z.drawImage(ti[n],t,e,r,r)):(z.fillStyle=M[n%M.length],z.fillRect(t,e,r,r))},tR=(t=[$,q,K,Z],e=T,n=J)=>{JSON.stringify(K)===JSON.stringify(Z)&&t.splice(2,1),JSON.stringify($)===JSON.stringify(q)&&t.splice(1,1);let r=(t=t.map(t=>({...t,ox:.5,oy:.5}))).length;t[0].x===t[1].x?t[0].oy=+(t[0].y<t[1].y):t[0].ox=+(t[0].x<t[1].x),t[r-1].x===t[r-2].x?t[r-1].oy=+(t[r-1].y<t[r-2].y):t[r-1].ox=+(t[r-1].x<t[r-2].x),t=t.map(({x:t,y:e,ox:n,oy:r})=>({x:tS(t)+C*n,y:tS(e)+C*r})),z.lineWidth=e,z.strokeStyle=n,z.beginPath();let{x:i,y:a}=t.shift();z.moveTo(i,a),t.forEach(({x:t,y:e})=>z.lineTo(t,e)),z.stroke()},tb=()=>{if(clearTimeout(tt),!tc()){for(tr=0;!tg();)tm();tt=setTimeout(()=>{tH(G.x,G.y,"red"),tH(Q.x,Q.y,"red")},1e4)}z.clearRect(0,0,O,N),tx(),X.forEach((t,e)=>t.forEach((t,n)=>-1!==t&&t_(e,n,t)))},tw=()=>{$={x:-1,y:-1},q={x:-1,y:-1},K={x:-1,y:-1},Z={x:-1,y:-1},G={x:-1,y:-1},Q={x:-1,y:-1},V=0,tt=null,te=!1,tn=!1,tr=0,ty(),tb()},tE=async()=>{ty(),P.forEach((t,e)=>{if(ta[e])return;let n=new Image;n.src=t,ti[e]=n,n.onload=()=>{ta[e]=!0,X.forEach((t,e)=>t.forEach((t,n)=>-1!==t&&t_(e,n,t)))}}),tb()};window.onload=tE;