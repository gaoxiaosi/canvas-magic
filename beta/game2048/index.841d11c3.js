var t=globalThis,e={},a={},n=t.parcelRequire6f20;null==n&&((n=function(t){if(t in e)return e[t].exports;if(t in a){var n=a[t];delete a[t];var l={id:t,exports:{}};return e[t]=l,n.call(l.exports,l,l.exports),l.exports}var r=Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){a[t]=e},t.parcelRequire6f20=n),(0,n.register)("8PRdk",function(t,e){Object.defineProperty(t.exports,"default",{get:()=>a,set:void 0,enumerable:!0,configurable:!0});var a=/**
 * @class
 * @description 在当前canvas之上覆盖一个大小位置都一样的canvas遮罩层
 */class{/**
   * @decription 在当前canvas之上覆盖一个大小位置都一样的canvas遮罩层
   * @constructor
   * @param {Object} options 模态窗的配置参数
   * @param {HTMLCanvasElement} options.canvas 原先的canvas对象
   * @param {Function} options.onSuccess 点击“成功“按钮，执行回调
   * @param {Function} options.onCancel 点击”取消“按钮，执行回调
   * @param {string} options.primaryColor 主题颜色，用于设置标题字体颜色，按钮颜色
   * @param {string} options.maskColor 遮罩层颜色，建议带透明度，如rgba(128, 128, 128, 0.6)
   * @param {string} options.btnTextColor 按钮字体颜色，默认白色
   * @param {string} options.textTitle 标题文本
   * @param {string} options.successBtnText 成功按钮的文本
   * @param {string} options.cancelBtnText 取消按钮的文本
   */constructor({canvas:t,onSuccess:e,onCancel:a,primaryColor:n="#F56C6C",maskColor:l="rgba(128, 128, 128, 0.6)",btnTextColor:r="#FFFFFF",textTitle:i="游戏结束",successBtnText:o="重新开始",cancelBtnText:s="取消"}){Object.assign(this,{onSuccess:e,onCancel:a,primaryColor:n,maskColor:l,btnTextColor:r,textTitle:i,successBtnText:o,cancelBtnText:s,W:t.width,H:t.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40// 按钮间距
}),// 和原canvas大小位置都一样的新canvas
// const { top, left } = canvas.getBoundingClientRect();
this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,// this.canvas.style.cssText = `position: absolute; top: ${top}px; left: ${left}px; cursor: pointer;`;
this.canvas.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",// 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
t.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}// 绘制遮罩层
drawMask(){let{ctx:t,H:e,W:a,maskColor:n}=this;t.fillStyle=n,t.fillRect(0,0,a,e)}// 绘制标题
drawTitle(){let{ctx:t,H:e,W:a,btnH:n,textTitle:l,titleH:r,titleBtnSpacing:i,primaryColor:o}=this;t.font=`${r}px Arial`,t.textAlign="center",t.textBaseline="top",t.fillStyle=o,t.fillText(l,a/2,(e-r-i-n)/2)}// 绘制按钮（并绑定点击事件）
drawButtons(){let{canvas:t,ctx:e,H:a,W:n,btnTextColor:l,primaryColor:r,onSuccess:i,onCancel:o,titleH:s,titleBtnSpacing:c,successBtnText:h,cancelBtnText:d,btnH:x,btnPadding:f,btnSpacing:m}=this;// 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
e.font=`${x-2*f}px Arial`,e.textBaseline="top",e.textAlign="left";let u=e.measureText(h).width+2*f,p=e.measureText(d).width+2*f,v=(a+s+c)/2-x/2,g=(n-u-p-m)/2,y=g+u+m,w=[g,v,g+u,v+x],E=[y,v,y+p,v+x];// 取消按钮所占矩形范围（左上XY，右下XY）
// 绘制成功和取消按钮
e.fillStyle=r,e.fillRect(g,v,u,x),e.fillRect(y,v,p,x),e.fillStyle=l,e.fillText(h,g+f,v+f),e.fillText(d,y+f,v+f);// 判断坐标是否在矩形（按钮）范围之内
let A=(t,e,[a,n,l,r])=>t>=a&&t<=l&&e>=n&&e<=r;// 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
t.onclick=t=>[i,o][[w,E].findIndex(e=>A(t.offsetX,t.offsetY,e)&&(this.close(),!0))]?.()}// 关闭模态窗（移除DOM节点）
close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}}});// import img1 from './1.png'
// import img2 from './2.png'
// import img3 from './3.png'
// import img4 from './4.png'
// import img5 from './5.png'
var l=n("8PRdk");const r=125,i=4*r+100,o=4*r+100,s="#C2B4A5",c=6,h=["./1.png","./2.png","./3.png","./4.png","./5.png"],//   'https://bideyuanli.com/wp-content/themes/2048/zhan/1.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/3.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/4.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/5.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/6.png'
// ],
d=["#EEE4DA","#EDE0C8","#EDA166","#F08151","#F1654D","#F1462E","#E8C65F","#E8C34F","#E8BE40","#E8BB31","#E8B724"],x=64,f=128,m=.3;// 最大缩放比例
/** @type {HTMLCanvasElement} */let u=document.createElement("canvas"),p=u.getContext("2d");u.width=i,u.height=o,u.style.cssText="position: absolute; inset: 0; margin: auto;",document.body.appendChild(u),document.body.style.backgroundColor="#F9F7EB";let v=Array.from({length:4},()=>[,,,,].fill(-1)),g=0,y=!1,w=[],E=[],A=[],T=[],C=[],b=Array(h.length).fill(!1);// 记录图片是否加载完毕
document.addEventListener("keydown",t=>{if(y)return;let e=M[t.key];e&&F(e,v,t.key)});const F=async(t,e,a)=>{w=[],E=[],A=[],T=[];let n=t(JSON.parse(JSON.stringify(e)),a);if(n.toString()===e.toString())return;v=n;let l=await k(w,E,a);if(cancelAnimationFrame(l),A.length>0){let t=S[a];A=A.map(({index:e,end:a,val:n})=>t(e,a,n)),T=T.map(({index:e,end:a,val:n})=>t(e,a,n));let e=await R(A,T);cancelAnimationFrame(e)}P()},B={ArrowUp:(t,e,a,n)=>({x:t,y:3-e-n,val:a}),ArrowDown:(t,e,a,n)=>({x:t,y:e+n,val:a}),ArrowLeft:(t,e,a,n)=>({x:3-e-n,y:t,val:a}),ArrowRight:(t,e,a,n)=>({x:e+n,y:t,val:a})},S={ArrowUp:(t,e,a)=>({x:t,y:3-e,val:a}),ArrowDown:(t,e,a)=>({x:t,y:e,val:a}),ArrowLeft:(t,e,a)=>({x:3-e,y:t,val:a}),ArrowRight:(t,e,a)=>({x:e,y:t,val:a})},k=(t,e,a,n=x)=>new Promise(l=>{let r=null,s=null,c=[],h=null,d=B[a],x=S[a];e=e.map(({index:t,end:e,val:a})=>x(t,e,a));let f=a=>{r||(r=a),p.clearRect(0,0,i,o),j(),U(v),e.forEach(({x:t,y:e,val:a})=>I(t,e,a)),c.forEach(({x:t,y:e,val:a})=>I(t,e,a)),(s=a-r)<n?(c=t.map(({index:t,start:e,val:a,distance:l})=>d(t,e,a,l*s/n)),// activeGroup = moveGroup.map(({index, start, val, distance}) => getMovePos(index, start, val, distance * Math.sin(elapsed / duration * Math.PI / 2)));
    requestAnimationFrame(f)):l(h)};h=requestAnimationFrame(f)}),R=(t,e,a=f,n=m)=>new Promise(l=>{let s=null,c=null,h=null,d=0,x=f=>{s||(s=f),p.clearRect(0,0,i,o),j(),U(v),e.forEach(({x:t,y:e,val:a})=>I(t,e,a)),t.forEach(({x:t,y:e,val:a})=>I(t-d/2,e-d/2,a,r+r*d)),(c=f-s)<a?(// scaleRatio = (1 - Math.abs(1 - elapsed / duration * 2)) * 0.2
    d=Math.sin(c/a*Math.PI)*n,requestAnimationFrame(x)):l(h)};h=requestAnimationFrame(x)}),D=(t,e)=>{let a=[],n=!1,l=t.length;for(let r=l-1;r>=0;r--)-1!==t[r]&&(n&&t[r]===a[0]?(g=Math.max(++a[0],g),n=!1,A.push({index:e,val:t[r],end:l-a.length}),T.pop()):(a.unshift(t[r]),T.push({index:e,val:t[r],end:l-a.length}),n=!0),0==l-a.length-r?E.push({index:e,val:t[r],end:r}):w.push({index:e,val:t[r],start:r,distance:l-a.length-r}));return Array(l-a.length).fill(-1).concat(a)},H=t=>t[0].map((e,a)=>t.map(t=>t[a])),M={ArrowUp:t=>t.map((t,e)=>D(t.reverse(),e).reverse()),ArrowDown:t=>t.map((t,e)=>D(t,e)),ArrowLeft:t=>H(H(t).map((t,e)=>D(t.reverse(),e).reverse())),ArrowRight:t=>H(H(t).map((t,e)=>D(t,e)))},P=async()=>{if(O())// console.log('你赢了' )
y=!0,L("你赢了!");else{let t=[];v.forEach((e,a)=>e.forEach((e,n)=>-1!==e&&t.push({x:a,y:n,val:e})));let{x:e,y:a}=X(v),n=.5>Math.random()?0:1;v[e][a]=n,await R([{x:e,y:a,val:n}],t),q()&&(y=!0,L("你输了"))}p.clearRect(0,0,i,o),j(),$(v)},O=()=>g===h.length-1,q=()=>!v.some((t,e)=>t.some((a,n)=>-1===a||a===t[n+1]||a===v[e+1]?.[n])),W=async()=>{h.forEach((t,e)=>{if(b[e])return;// 重新开始游戏时，如果已经加载过的图片不要再请求
let a=new Image;a.src=t,C[e]=a,a.onload=()=>{b[e]=!0,v.forEach((t,a)=>t.forEach((t,n)=>t===e&I(a,n,t)))}});let t=[];for(let e=0;e<2;e++){let{x:e,y:a}=X(v),n=.5>Math.random()?0:1;v[e][a]=n,t.push({x:e,y:a,val:n})}await R(t,[]),j(),$(v)},I=(t,e,a,n=r)=>{_(t=t*(20+r)+20,e=e*(20+r)+20,n,n,void 0,d[a]),b[a]&&(p.save(),p.clip(),p.drawImage(C[a],t,e,n,n),p.restore())},L=t=>new l.default({canvas:u,onSuccess:N,maskColor:"rgba(143, 122, 102, 0.5)",primaryColor:"#EDA166",textTitle:t}),N=()=>{y=!1,v=Array.from({length:4},()=>[,,,,].fill(-1)),g=0,w=[],E=[],A=[],T=[],W()},U=t=>t.forEach((t,e)=>t.forEach((t,a)=>J(e,a))),$=t=>t.forEach((t,e)=>t.forEach((t,a)=>{J(e,a),-1!==t&&I(e,a,t)})),j=()=>_(0,0,i,o,6,"#AD9D8F"),J=(t,e,a=s,n=r)=>_(t*(20+r)+20,e*(20+r)+20,n,n,6,a),_=(t,e,a,n,l=c,r)=>{p.beginPath(),p.moveTo(t+l,e),p.arcTo(t+a,e,t+a,e+n,l),p.arcTo(t+a,e+n,t,e+n,l),p.arcTo(t,e+n,t,e,l),p.arcTo(t,e,t+a,e,l),p.closePath(),r&&(p.fillStyle=r,p.fill())},X=t=>{let e=[];return t.forEach((a,n)=>a.forEach((a,l)=>-1===t[n][l]&&e.push({x:n,y:l}))),e[Math.floor(Math.random()*e.length)]};window.onload=W;