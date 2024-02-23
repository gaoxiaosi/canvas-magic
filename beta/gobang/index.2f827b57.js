let t;var e,l=globalThis,i={},n={},a=l.parcelRequire6f20;null==a&&((a=function(t){if(t in i)return i[t].exports;if(t in n){var e=n[t];delete n[t];var l={id:t,exports:{}};return i[t]=l,e.call(l.exports,l,l.exports),l.exports}var a=Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(t,e){n[t]=e},l.parcelRequire6f20=a),(0,a.register)("8PRdk",function(t,e){Object.defineProperty(t.exports,"default",{get:()=>l,set:void 0,enumerable:!0,configurable:!0});var l=/**
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
   */constructor({canvas:t,onSuccess:e,onCancel:l,primaryColor:i="#F56C6C",maskColor:n="rgba(128, 128, 128, 0.6)",btnTextColor:a="#FFFFFF",textTitle:o="Game Over",successBtnText:r="Try Again",cancelBtnText:s="Cancel"}){Object.assign(this,{onSuccess:e,onCancel:l,primaryColor:i,maskColor:n,btnTextColor:a,textTitle:o,successBtnText:r,cancelBtnText:s,W:t.width,H:t.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40// 按钮间距
});// 和原canvas大小位置都一样的新canvas
let{top:c,left:h}=t.getBoundingClientRect();this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,this.canvas.style.cssText=`position: absolute; top: ${c}px; left: ${h}px; cursor: pointer;`,// 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
t.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}// 绘制遮罩层
drawMask(){let{ctx:t,H:e,W:l,maskColor:i}=this;t.fillStyle=i,t.fillRect(0,0,l,e)}// 绘制标题
drawTitle(){let{ctx:t,H:e,W:l,btnH:i,textTitle:n,titleH:a,titleBtnSpacing:o,primaryColor:r}=this;t.font=`${a}px Arial`,t.textAlign="center",t.textBaseline="top",t.fillStyle=r,t.fillText(n,l/2,(e-a-o-i)/2)}// 绘制按钮（并绑定点击事件）
drawButtons(){let{canvas:t,ctx:e,H:l,W:i,btnTextColor:n,primaryColor:a,onSuccess:o,onCancel:r,titleH:s,titleBtnSpacing:c,successBtnText:h,cancelBtnText:d,btnH:f,btnPadding:x,btnSpacing:u}=this;// 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
e.font=`${f-2*x}px Arial`,e.textBaseline="top",e.textAlign="left";let p=e.measureText(h).width+2*x,g=e.measureText(d).width+2*x,m=(l+s+c)/2-f/2,w=(i-p-g-u)/2,T=w+p+u,C=[w,m,w+p,m+f],y=[T,m,T+g,m+f];// 取消按钮所占矩形范围（左上XY，右下XY）
// 绘制成功和取消按钮
e.fillStyle=a,e.fillRect(w,m,p,f),e.fillRect(T,m,g,f),e.fillStyle=n,e.fillText(h,w+x,m+x),e.fillText(d,T+x,m+x);// 判断坐标是否在矩形（按钮）范围之内
let v=(t,e,[l,i,n,a])=>t>=l&&t<=n&&e>=i&&e<=a;// 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
t.onclick=t=>[o,r][[C,y].findIndex(e=>v(t.offsetX,t.offsetY,e)&&(this.close(),!0))]?.()}// 关闭模态窗（移除DOM节点）
close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}}});var o=a("8PRdk");let r=Math.min(window.innerWidth,window.innerHeight)/8,s=6*r,c="#E4A751",h=1,d="#000000",f=document.createElement("canvas"),x=f.getContext("2d");// 总步数
f.width=f.height=s,f.style.cssText="position: absolute; inset: 0; margin: auto; box-shadow: 5px 5px 20px #888888; cursor: pointer;",document.body.appendChild(f);// document.body.style.backgroundColor = 'pink'
let u=document.createElement("button");u.innerText="悔棋";// regretBtn.style.cssText = 'display: block; position: absolute; left: 10px; top: 10px; padding: 15px 30px; font-size: 20px; cursor: pointer;'
// document.body.appendChild(regretBtn);
// 记录棋盘的黑白棋，15*15的二维数组，初始值：0，黑棋：1，白棋：2
let p=Array.from({length:5},()=>[,,,,,].fill(0)),g=!0,m=0,w=[];u.onclick=t=>{if(0===w.length)return;g=!g,m--;let{x:e,y:l}=w.pop();if(p[e][l]=0,v(e,l),0===w.length)return;let{x:i,y:n}=w.at(-1);b(i,n);// let lastStep = steps.at(-1)
// drawRedPoint(lastStep.x, lastStep.y);
},// 监听棋盘点击位置
f.onclick=t=>{let[e,l]=[t.offsetX,t.offsetY].map(t=>Math.round(t/r)-1);if(p[e]?.[l]===0){if(w.length>0){let{x:t,y:e,isBlack:l}=w.at(-1);v(t,e),y(t,e,l)}y(e,l,g),b(e,l),w.push({x:e,y:l,isBlack:g}),p[e][l]=g?1:2,k(e,l,p[e][l],p)?S(`${g?"黑":"白"}\u{68CB}\u{8D62}\u{4E86}!`):25==++m?S("游戏结束，平局！"):g=!g}};// 绘制棋盘（棋盘背景色 && 网格线）
const T=()=>{x.fillStyle=c,x.fillRect(0,0,s,s);for(let t=0;t<5;t++)C(0,t,4,t),C(t,0,t,4)},C=(t,e,l,i,n=h,a=d)=>{x.lineWidth=n,x.strokeStyle=a,x.beginPath(),x.moveTo(t*r+r,e*r+r),x.lineTo(l*r+r,i*r+r),x.stroke()},y=(t,e,l)=>{x.save(),x.shadowColor="rgba(0, 0, 0, 0.5)",x.shadowOffsetX=x.shadowOffsetY=.06*r,x.shadowBlur=.04*r,x.beginPath(),t=t*r+r,e=e*r+r,x.arc(t,e,.4*r,0,2*Math.PI),x.closePath();let i=x.createRadialGradient(t,e,0,t,e,.4*r);i.addColorStop(0,l?"#707070":"#FFFFFF"),i.addColorStop(1,l?"#000000":"#D5D8DC"),x.fillStyle=i,x.fill(),x.restore()},v=(t,e)=>{x.fillStyle=c,x.fillRect(t*r+r/2,e*r+r/2,r,r),C(t,e>0?e-.5:e,t,e<4?e+.5:e),C(t>0?t-.5:t,e,t<4?t+.5:t,e)},b=(t,e,l=.05*r)=>{x.beginPath(),x.fillStyle="#F56C6C",x.arc(t*r+r,e*r+r,l,0,2*Math.PI),x.closePath(),x.fill()},B=()=>{x.clearRect(0,0,s,s),T(),p=Array.from({length:5},()=>[,,,,,].fill(0)),g=!0,m=0,w=[]},S=t=>new o.default({canvas:f,onSuccess:B,primaryColor:c,textTitle:t}),k=(t,e,l,i)=>{for(let[n,a]of[[1,0],[0,1],[1,1],[1,-1]]){let[o,r,s]=[1,0,0];// count：连续同种颜色棋子数
// 判断：1、坐标是否越界 2、该位置的值是否一致（都是黑或白） 3、累计的次数是否达到5
for(;o<5&&i[t+n*++r]?.[e+a*r]===l;)o++;for(;o<5&&i[t-n*++s]?.[e-a*s]===l;)o++;if(5===o)return C(t+n*(r=4-s),e+a*r,t-n*s,e-a*s,5,"#F05459"),!0}return!1};window.onresize=(e=()=>{if(console.log("onresize"),x.clearRect(0,0,s,s),r=Math.min(window.innerWidth,window.innerHeight)/8,s=6*r,f.width=f.height=s,// canvas.style.cssText = `display: block;margin: ${(window.innerHeight - SL) / 2}px auto; box-shadow: 10px 10px 50px #888; cursor: pointer;`;
T(),w.forEach(({x:t,y:e,isBlack:l})=>{y(t,e,l)}),w.length>0){let{x:t,y:e}=w.at(-1);b(t,e)}},t=null,(...l)=>{clearTimeout(t),t=setTimeout(()=>{e(...l)},512)}),window.onload=T;