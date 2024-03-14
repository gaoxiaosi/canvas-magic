function e(e,t,a,n){Object.defineProperty(e,t,{get:a,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var a=globalThis,n={},r={},l=a.parcelRequire6f20;null==l&&((l=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){r[e]=t},a.parcelRequire6f20=l);var i=l.register;i("dRo73",function(t,a){e(t.exports,"register",()=>n,e=>n=e);var n,r=new Map;n=function(e,t){for(var a=0;a<t.length-1;a+=2)r.set(t[a],{baseUrl:e,path:t[a+1]})}}),i("8PRdk",function(t,a){e(t.exports,"default",()=>n);var n=/**
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
   */constructor({canvas:e,onSuccess:t,onCancel:a,primaryColor:n="#F56C6C",maskColor:r="rgba(128, 128, 128, 0.6)",btnTextColor:l="#FFFFFF",textTitle:i="游戏结束",successBtnText:o="重新开始",cancelBtnText:c="取消"}){Object.assign(this,{onSuccess:t,onCancel:a,primaryColor:n,maskColor:r,btnTextColor:l,textTitle:i,successBtnText:o,cancelBtnText:c,W:e.width,H:e.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40// 按钮间距
}),// 和原canvas大小位置都一样的新canvas
// const { top, left } = canvas.getBoundingClientRect();
this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,// this.canvas.style.cssText = `position: absolute; top: ${top}px; left: ${left}px; cursor: pointer;`;
this.canvas.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",// 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
e.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}// 绘制遮罩层
drawMask(){let{ctx:e,H:t,W:a,maskColor:n}=this;e.fillStyle=n,e.fillRect(0,0,a,t)}// 绘制标题
drawTitle(){let{ctx:e,H:t,W:a,btnH:n,textTitle:r,titleH:l,titleBtnSpacing:i,primaryColor:o}=this;e.font=`${l}px Arial`,e.textAlign="center",e.textBaseline="top",e.fillStyle=o,e.fillText(r,a/2,(t-l-i-n)/2)}// 绘制按钮（并绑定点击事件）
drawButtons(){let{canvas:e,ctx:t,H:a,W:n,btnTextColor:r,primaryColor:l,onSuccess:i,onCancel:o,titleH:c,titleBtnSpacing:s,successBtnText:h,cancelBtnText:d,btnH:f,btnPadding:p,btnSpacing:g}=this;// 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
t.font=`${f-2*p}px Arial`,t.textBaseline="top",t.textAlign="left";let m=t.measureText(h).width+2*p,u=t.measureText(d).width+2*p,x=(a+c+s)/2-f/2,v=(n-m-u-g)/2,E=v+m+g,H=[v,v+m,x,x+f],S=[E,E+u,x,x+f];// 取消按钮所占矩形范围（左右X的范围，上下Y的范围）
// 绘制成功和取消按钮
t.fillStyle=l,t.fillRect(v,x,m,f),t.fillRect(E,x,u,f),t.fillStyle=r,t.fillText(h,v+p,x+p),t.fillText(d,E+p,x+p);// 判断坐标是否在矩形（按钮）范围之内
let A=(e,t,[a,n,r,l])=>e>=a&&e<=n&&t>=r&&t<=l;// 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
e.onclick=e=>[i,o][[H,S].findIndex(t=>A(e.offsetX,e.offsetY,t)&&(this.close(),!0))]?.()}// 关闭模态窗（移除DOM节点）
close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}}}),l("dRo73").register(new URL("",import.meta.url).toString(),JSON.parse('["jVlne","index.0b0285da.js","2vMQB","../../1.1c79e02e.png","jgh6g","../../2.77821e30.png","670nB","../../3.12cc791a.png","fx6Vo","../../4.70762dd7.png","knvah","../../5.83ae63bf.png","ixghU","../../6.a63dd41d.png","bdmag","../../7.ee8a74b7.jpg","5zXnb","../../8.de58636c.jpg","1mHI9","../../9.cb86a63b.png","kcZvl","../../10.ae789f3c.jpg"]'));var o={};o=new URL("../../1.1c79e02e.png",import.meta.url).toString();var c={};c=new URL("../../2.77821e30.png",import.meta.url).toString();var s={};s=new URL("../../3.12cc791a.png",import.meta.url).toString();var h={};h=new URL("../../4.70762dd7.png",import.meta.url).toString();var d={};d=new URL("../../5.83ae63bf.png",import.meta.url).toString();var f={};f=new URL("../../6.a63dd41d.png",import.meta.url).toString();var p={};p=new URL("../../7.ee8a74b7.jpg",import.meta.url).toString();var g={};g=new URL("../../8.de58636c.jpg",import.meta.url).toString();var m={};m=new URL("../../9.cb86a63b.png",import.meta.url).toString();var u={};u=new URL("../../10.ae789f3c.jpg",import.meta.url).toString();var x=l("8PRdk");const v=125,E=5*v+120,H=5*v+120,S="#C2B4A5",A=6,w=[/*@__PURE__*/t(o),/*@__PURE__*/t(c),/*@__PURE__*/t(s),/*@__PURE__*/t(h),/*@__PURE__*/t(d),/*@__PURE__*/t(f),/*@__PURE__*/t(p),/*@__PURE__*/t(g),/*@__PURE__*/t(m),/*@__PURE__*/t(u)],// VALUES = [ // 线上图片地址（可在浏览器中设置“不要缓存”和“限制网速”进行调试）
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/1.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/3.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/4.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/5.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/6.png'
// ],
R=["#EEE4DA","#EDE0C8","#EDA166","#F08151","#F1654D","#F1462E","#E8C65F","#E8C34F","#E8BE40","#E8BB31","#E8B724"],_=64;// 新出现时的初始比例
/** @type {HTMLCanvasElement} */let b=document.createElement("canvas"),F=b.getContext("2d");b.width=E,b.height=H,b.style.cssText="position: absolute; inset: 0; margin: auto;",document.body.appendChild(b),document.body.style.backgroundColor="#F9F7EB";let y=Array.from({length:5},()=>[,,,,,].fill(-1)),T=0,C=!1,B=[],k=[],U=[],M=[],L=[],D=Array(w.length).fill(!1);// 记录图片是否加载完毕
document.addEventListener("keydown",e=>{if(C)return;let t=$[e.key];t&&P(t,y,e.key)});const P=async(e,t,a)=>{B=[],k=[],U=[],M=[];let n=e(JSON.parse(JSON.stringify(t)),a);if(n.toString()===t.toString())return;y=n;let r=await I(B,k,a);if(cancelAnimationFrame(r),U.length>0){let e=j[a];U=U.map(({index:t,end:a,val:n})=>e(t,a,n)),M=M.map(({index:t,end:a,val:n})=>e(t,a,n));let t=await O(U,M,q,.3,128);cancelAnimationFrame(t)}V()},j={ArrowUp:(e,t,a,n=0)=>({x:e,y:4-t-n,val:a}),ArrowDown:(e,t,a,n=0)=>({x:e,y:t+n,val:a}),ArrowLeft:(e,t,a,n=0)=>({x:4-t-n,y:e,val:a}),ArrowRight:(e,t,a,n=0)=>({x:t+n,y:e,val:a})},I=(e,t,a,n=_)=>new Promise(r=>{let l=null,i=null,o=[],c=null,s=j[a];t=t.map(({index:e,end:t,val:a})=>s(e,t,a));let h=a=>{l||(l=a),F.clearRect(0,0,E,H),et(),K(y),t.forEach(({x:e,y:t,val:a})=>Y(e,t,a)),o.forEach(({x:e,y:t,val:a})=>Y(e,t,a)),(i=a-l)<n?(// activeGroup = moveGroup.map(({ index, start, val, distance }) => getMovePos(index, start, val, distance * elapsed / duration)); // 匀速
    o=e.map(({index:e,start:t,val:a,distance:r})=>s(e,t,a,r*Math.sin(i/n*Math.PI/2))),requestAnimationFrame(h)):r(c)};c=requestAnimationFrame(h)}),O=(e,t,a,n,r)=>new Promise(l=>{let i=null,o=null,c=null,s=0,h=d=>{i||(i=d),F.clearRect(0,0,E,H),et(),K(y),t.forEach(({x:e,y:t,val:a})=>Y(e,t,a)),e.forEach(({x:e,y:t,val:a})=>Y(e-s/2,t-s/2,a,v+v*s)),(o=d-i)<r?(// scaleRatio = (1 - Math.abs(1 - elapsed / duration * 2)) * maxScaleRatio
    s=a(o/r,n),requestAnimationFrame(h)):l(c)};c=requestAnimationFrame(h)}),q=(e,t)=>Math.sin(e*Math.PI)*t,N=(e,t)=>-Math.cos(e*Math.PI/2)*t,W=(e,t)=>{let a=[],n=!1,r=e.length;for(let l=r-1;l>=0;l--)-1!==e[l]&&(n&&e[l]===a[0]?(T=Math.max(++a[0],T),n=!1,U.push({index:t,val:e[l],end:r-a.length}),M.pop()):(a.unshift(e[l]),M.push({index:t,val:e[l],end:r-a.length}),n=!0),0==r-a.length-l?k.push({index:t,val:e[l],end:l}):B.push({index:t,val:e[l],start:l,distance:r-a.length-l}));return Array(r-a.length).fill(-1).concat(a)},J=e=>e[0].map((t,a)=>e.map(e=>e[a])),$={ArrowUp:e=>e.map((e,t)=>W(e.reverse(),t).reverse()),ArrowDown:e=>e.map((e,t)=>W(e,t)),ArrowLeft:e=>J(J(e).map((e,t)=>W(e.reverse(),t).reverse())),ArrowRight:e=>J(J(e).map((e,t)=>W(e,t)))},V=async()=>{if(X())C=!0,Z("你赢了!");else{let e=[];y.forEach((t,a)=>t.forEach((t,n)=>-1!==t&&e.push({x:a,y:n,val:t})));let{x:t,y:a}=er(y),n=.5>Math.random()?0:1;y[t][a]=n,z()&&(C=!0,Z("你输了")),await O([{x:t,y:a,val:n}],e,N,.3,256)}F.clearRect(0,0,E,H),et(),ee(y)},X=()=>T===w.length-1,z=()=>!y.some((e,t)=>e.some((a,n)=>-1===a||a===e[n+1]||a===y[t+1]?.[n])),Q=async()=>{w.forEach((e,t)=>{if(D[t])return;// 重新开始游戏时，如果已经加载过的图片不要再请求
let a=new Image;a.src=e,L[t]=a,a.onload=()=>{D[t]=!0,y.forEach((e,a)=>e.forEach((e,n)=>e===t&&Y(a,n,e)))}});// let scaleGroup = [];
// for (let i = 0; i < 2; i++) {
//   let {x, y} = getRandomFreePos(data);
//   let val = Math.random() < 0.5 ? 0 : 1;
//   data[x][y] = val;
//   scaleGroup.push({x, y, val});
// }
// await scaleAnimate(scaleGroup, [], appearScale, APPEAR_SCALE_RATIO, APPEAR_SCALE_DURATION)
// 爱心的点位，记得将行和列改成5*5，在全局变量处改：ROWS = 5, COLUMNS = 5
let e=[],t=[0,6,7,3,5,8,4,2,1,9];[[1,0],[0,1],[0,2],[1,3],[2,4],[3,3],[4,2],[4,1],[3,0],[2,1]].forEach(([a,n],r)=>{console.log(a,n,r),y[a][n]=t[r],e.push({x:a,y:n,val:t[r]})}),await O(e,[],N,.3,256),et(),ee(y)},Y=(e,t,a,n=v)=>{e=e*(20+v)+20,t=t*(20+v)+20,D[a]?(F.save(),en(e,t,n,n,6,S),F.clip(),F.drawImage(L[a],e,t,n,n),F.restore()):en(e,t,n,n,6,R[a])},Z=e=>new x.default({canvas:b,onSuccess:G,maskColor:"rgba(143, 122, 102, 0.5)",primaryColor:"#EDA166",textTitle:e}),G=()=>{C=!1,y=Array.from({length:5},()=>[,,,,,].fill(-1)),T=0,B=[],k=[],U=[],M=[],Q()},K=e=>e.forEach((e,t)=>e.forEach((e,a)=>ea(t,a))),ee=e=>e.forEach((e,t)=>e.forEach((e,a)=>{ea(t,a),-1!==e&&Y(t,a,e)})),et=()=>en(0,0,E,H,6,"#AD9D8F"),ea=(e,t,a=S,n=v)=>en(e*(20+v)+20,t*(20+v)+20,n,n,6,a),en=(e,t,a,n,r=A,l)=>{F.beginPath(),F.moveTo(e+r,t),F.arcTo(e+a,t,e+a,t+n,r),F.arcTo(e+a,t+n,e,t+n,r),F.arcTo(e,t+n,e,t,r),F.arcTo(e,t,e+a,t,r),F.closePath(),l&&(F.fillStyle=l,F.fill())},er=e=>{let t=[];return e.forEach((a,n)=>a.forEach((a,r)=>-1===e[n][r]&&t.push({x:n,y:r}))),t[Math.floor(Math.random()*t.length)]};window.onload=Q;