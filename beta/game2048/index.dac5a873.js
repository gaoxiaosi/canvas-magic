function e(e,t,a,n){Object.defineProperty(e,t,{get:a,set:n,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var a=globalThis,n={},r={},l=a.parcelRequire6f20;null==l&&((l=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var a={id:e,exports:{}};return n[e]=a,t.call(a.exports,a,a.exports),a.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){r[e]=t},a.parcelRequire6f20=l);var o=l.register;o("dRo73",function(t,a){e(t.exports,"register",()=>n,e=>n=e);var n,r=new Map;n=function(e,t){for(var a=0;a<t.length-1;a+=2)r.set(t[a],{baseUrl:e,path:t[a+1]})}}),o("8PRdk",function(t,a){e(t.exports,"default",()=>n);var n=/**
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
   */constructor({canvas:e,onSuccess:t,onCancel:a,primaryColor:n="#F56C6C",maskColor:r="rgba(128, 128, 128, 0.6)",btnTextColor:l="#FFFFFF",textTitle:o="游戏结束",successBtnText:i="重新开始",cancelBtnText:c="取消"}){Object.assign(this,{onSuccess:t,onCancel:a,primaryColor:n,maskColor:r,btnTextColor:l,textTitle:o,successBtnText:i,cancelBtnText:c,W:e.width,H:e.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40// 按钮间距
}),// 和原canvas大小位置都一样的新canvas
// const { top, left } = canvas.getBoundingClientRect();
this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,// this.canvas.style.cssText = `position: absolute; top: ${top}px; left: ${left}px; cursor: pointer;`;
this.canvas.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",// 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
e.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}// 绘制遮罩层
drawMask(){let{ctx:e,H:t,W:a,maskColor:n}=this;e.fillStyle=n,e.fillRect(0,0,a,t)}// 绘制标题
drawTitle(){let{ctx:e,H:t,W:a,btnH:n,textTitle:r,titleH:l,titleBtnSpacing:o,primaryColor:i}=this;e.font=`${l}px Arial`,e.textAlign="center",e.textBaseline="top",e.fillStyle=i,e.fillText(r,a/2,(t-l-o-n)/2)}// 绘制按钮（并绑定点击事件）
drawButtons(){let{canvas:e,ctx:t,H:a,W:n,btnTextColor:r,primaryColor:l,onSuccess:o,onCancel:i,titleH:c,titleBtnSpacing:s,successBtnText:h,cancelBtnText:d,btnH:f,btnPadding:p,btnSpacing:m}=this;// 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
t.font=`${f-2*p}px Arial`,t.textBaseline="top",t.textAlign="left";let u=t.measureText(h).width+2*p,x=t.measureText(d).width+2*p,g=(a+c+s)/2-f/2,v=(n-u-x-m)/2,w=v+u+m,E=[v,g,v+u,g+f],y=[w,g,w+x,g+f];// 取消按钮所占矩形范围（左上XY，右下XY）
// 绘制成功和取消按钮
t.fillStyle=l,t.fillRect(v,g,u,f),t.fillRect(w,g,x,f),t.fillStyle=r,t.fillText(h,v+p,g+p),t.fillText(d,w+p,g+p);// 判断坐标是否在矩形（按钮）范围之内
let A=(e,t,[a,n,r,l])=>e>=a&&e<=n&&t>=r&&t<=l;// 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
e.onclick=e=>[o,i][[E,y].findIndex(t=>A(e.offsetX,e.offsetY,t)&&(this.close(),!0))]?.()}// 关闭模态窗（移除DOM节点）
close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}}}),l("dRo73").register(new URL("",import.meta.url).toString(),JSON.parse('["jVlne","index.dac5a873.js","2vMQB","../../1.1c79e02e.png","jgh6g","../../2.77821e30.png","670nB","../../3.12cc791a.png","fx6Vo","../../4.70762dd7.png","knvah","../../5.83ae63bf.png"]'));var i={};i=new URL("../../1.1c79e02e.png",import.meta.url).toString();var c={};c=new URL("../../2.77821e30.png",import.meta.url).toString();var s={};s=new URL("../../3.12cc791a.png",import.meta.url).toString();var h={};h=new URL("../../4.70762dd7.png",import.meta.url).toString();var d={};d=new URL("../../5.83ae63bf.png",import.meta.url).toString();var f=l("8PRdk");const p=125,m=4*p+100,u=4*p+100,x="#C2B4A5",g=6,v=[/*@__PURE__*/t(i),/*@__PURE__*/t(c),/*@__PURE__*/t(s),/*@__PURE__*/t(h),/*@__PURE__*/t(d)],// VALUES = [ // 线上图片地址（可在浏览器中设置“不要缓存”和“限制网速”进行调试）
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/1.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/3.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/4.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/5.png',
//   'https://bideyuanli.com/wp-content/themes/2048/zhan/6.png'
// ],
w=["#EEE4DA","#EDE0C8","#EDA166","#F08151","#F1654D","#F1462E","#E8C65F","#E8C34F","#E8BE40","#E8BB31","#E8B724"],E=64,y=128,A=.3;// 最大缩放比例
/** @type {HTMLCanvasElement} */let S=document.createElement("canvas"),H=S.getContext("2d");S.width=m,S.height=u,S.style.cssText="position: absolute; inset: 0; margin: auto;",document.body.appendChild(S),document.body.style.backgroundColor="#F9F7EB";let b=Array.from({length:4},()=>[,,,,].fill(-1)),F=0,R=!1,T=[],C=[],_=[],B=[],k=[],D=Array(v.length).fill(!1);// 记录图片是否加载完毕
document.addEventListener("keydown",e=>{if(R)return;let t=W[e.key];t&&M(t,b,e.key)});const M=async(e,t,a)=>{T=[],C=[],_=[],B=[];let n=e(JSON.parse(JSON.stringify(t)),a);if(n.toString()===t.toString())return;b=n;let r=await P(T,C,a);if(cancelAnimationFrame(r),_.length>0){let e=L[a];_=_.map(({index:t,end:a,val:n})=>e(t,a,n)),B=B.map(({index:t,end:a,val:n})=>e(t,a,n));let t=await O(_,B);cancelAnimationFrame(t)}j()},U={ArrowUp:(e,t,a,n)=>({x:e,y:3-t-n,val:a}),ArrowDown:(e,t,a,n)=>({x:e,y:t+n,val:a}),ArrowLeft:(e,t,a,n)=>({x:3-t-n,y:e,val:a}),ArrowRight:(e,t,a,n)=>({x:t+n,y:e,val:a})},L={ArrowUp:(e,t,a)=>({x:e,y:3-t,val:a}),ArrowDown:(e,t,a)=>({x:e,y:t,val:a}),ArrowLeft:(e,t,a)=>({x:3-t,y:e,val:a}),ArrowRight:(e,t,a)=>({x:t,y:e,val:a})},P=(e,t,a,n=E)=>new Promise(r=>{let l=null,o=null,i=[],c=null,s=U[a],h=L[a];t=t.map(({index:e,end:t,val:a})=>h(e,t,a));let d=a=>{l||(l=a),H.clearRect(0,0,m,u),G(),Y(b),t.forEach(({x:e,y:t,val:a})=>V(e,t,a)),i.forEach(({x:e,y:t,val:a})=>V(e,t,a)),(o=a-l)<n?(i=e.map(({index:e,start:t,val:a,distance:r})=>s(e,t,a,r*o/n)),// activeGroup = moveGroup.map(({index, start, val, distance}) => getMovePos(index, start, val, distance * Math.sin(elapsed / duration * Math.PI / 2)));
    requestAnimationFrame(d)):r(c)};c=requestAnimationFrame(d)}),O=(e,t,a=y,n=A)=>new Promise(r=>{let l=null,o=null,i=null,c=0,s=h=>{l||(l=h),H.clearRect(0,0,m,u),G(),Y(b),t.forEach(({x:e,y:t,val:a})=>V(e,t,a)),e.forEach(({x:e,y:t,val:a})=>V(e-c/2,t-c/2,a,p+p*c)),(o=h-l)<a?(// scaleRatio = (1 - Math.abs(1 - elapsed / duration * 2)) * 0.2
    c=Math.sin(o/a*Math.PI)*n,requestAnimationFrame(s)):r(i)};i=requestAnimationFrame(s)}),q=(e,t)=>{let a=[],n=!1,r=e.length;for(let l=r-1;l>=0;l--)-1!==e[l]&&(n&&e[l]===a[0]?(F=Math.max(++a[0],F),n=!1,_.push({index:t,val:e[l],end:r-a.length}),B.pop()):(a.unshift(e[l]),B.push({index:t,val:e[l],end:r-a.length}),n=!0),0==r-a.length-l?C.push({index:t,val:e[l],end:l}):T.push({index:t,val:e[l],start:l,distance:r-a.length-l}));return Array(r-a.length).fill(-1).concat(a)},N=e=>e[0].map((t,a)=>e.map(e=>e[a])),W={ArrowUp:e=>e.map((e,t)=>q(e.reverse(),t).reverse()),ArrowDown:e=>e.map((e,t)=>q(e,t)),ArrowLeft:e=>N(N(e).map((e,t)=>q(e.reverse(),t).reverse())),ArrowRight:e=>N(N(e).map((e,t)=>q(e,t)))},j=async()=>{if(I())// console.log('你赢了' )
R=!0,Q("你赢了!");else{let e=[];b.forEach((t,a)=>t.forEach((t,n)=>-1!==t&&e.push({x:a,y:n,val:t})));let{x:t,y:a}=ee(b),n=.5>Math.random()?0:1;b[t][a]=n,J()&&(R=!0,Q("你输了")),await O([{x:t,y:a,val:n}],e)}H.clearRect(0,0,m,u),G(),z(b)},I=()=>F===v.length-1,J=()=>!b.some((e,t)=>e.some((a,n)=>-1===a||a===e[n+1]||a===b[t+1]?.[n])),$=async()=>{v.forEach((e,t)=>{if(D[t])return;// 重新开始游戏时，如果已经加载过的图片不要再请求
let a=new Image;a.src=e,k[t]=a,a.onload=()=>{D[t]=!0,b.forEach((e,a)=>e.forEach((e,n)=>e===t&V(a,n,e)))}});let e=[];for(let t=0;t<2;t++){let{x:t,y:a}=ee(b),n=.5>Math.random()?0:1;b[t][a]=n,e.push({x:t,y:a,val:n})}await O(e,[]),// let presets = [[0, 1], [0, 2], [1, 0], [1, 3], [2, 1], [2, 4], [3, 0], [3, 3], [4, 2], [4, 1]]
// presets.forEach(([x, y]) => {
//   data[x][y] = Math.floor(Math.random() * (VALUES.length - 1))
//   scaleGroup.push({ x, y, val: data[x][y] })
// })
// await scaleAnimate(scaleGroup, [])
G(),z(b)},V=(e,t,a,n=p)=>{Z(e=e*(20+p)+20,t=t*(20+p)+20,n,n,6,w[a]),D[a]&&(H.save(),H.clip(),H.drawImage(k[a],e,t,n,n),H.restore())},Q=e=>new f.default({canvas:S,onSuccess:X,maskColor:"rgba(143, 122, 102, 0.5)",primaryColor:"#EDA166",textTitle:e}),X=()=>{R=!1,b=Array.from({length:4},()=>[,,,,].fill(-1)),F=0,T=[],C=[],_=[],B=[],$()},Y=e=>e.forEach((e,t)=>e.forEach((e,a)=>K(t,a))),z=e=>e.forEach((e,t)=>e.forEach((e,a)=>{K(t,a),-1!==e&&V(t,a,e)})),G=()=>Z(0,0,m,u,6,"#AD9D8F"),K=(e,t,a=x,n=p)=>Z(e*(20+p)+20,t*(20+p)+20,n,n,6,a),Z=(e,t,a,n,r=g,l)=>{H.beginPath(),H.moveTo(e+r,t),H.arcTo(e+a,t,e+a,t+n,r),H.arcTo(e+a,t+n,e,t+n,r),H.arcTo(e,t+n,e,t,r),H.arcTo(e,t,e+a,t,r),H.closePath(),l&&(H.fillStyle=l,H.fill())},ee=e=>{let t=[];return e.forEach((a,n)=>a.forEach((a,r)=>-1===e[n][r]&&t.push({x:n,y:r}))),t[Math.floor(Math.random()*t.length)]};window.onload=$;