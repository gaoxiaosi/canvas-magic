var t=globalThis,e={},l={},n=t.parcelRequire6f20;null==n&&((n=function(t){if(t in e)return e[t].exports;if(t in l){var n=l[t];delete l[t];var i={id:t,exports:{}};return e[t]=i,n.call(i.exports,i,i.exports),i.exports}var a=Error("Cannot find module '"+t+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(t,e){l[t]=e},t.parcelRequire6f20=n),(0,n.register)("8PRdk",function(t,e){Object.defineProperty(t.exports,"default",{get:()=>l,set:void 0,enumerable:!0,configurable:!0});var l=/**
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
   */constructor({canvas:t,onSuccess:e,onCancel:l,primaryColor:n="#F56C6C",maskColor:i="rgba(128, 128, 128, 0.6)",btnTextColor:a="#FFFFFF",textTitle:o="Game Over",successBtnText:r="Try Again",cancelBtnText:s="Cancel"}){Object.assign(this,{onSuccess:e,onCancel:l,primaryColor:n,maskColor:i,btnTextColor:a,textTitle:o,successBtnText:r,cancelBtnText:s,W:t.width,H:t.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40// 按钮间距
});// 和原canvas大小位置都一样的新canvas
let{top:c,left:d}=t.getBoundingClientRect();this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,this.canvas.style.cssText=`position: absolute; top: ${c}px; left: ${d}px; cursor: pointer;`,// 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
t.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}// 绘制遮罩层
drawMask(){let{ctx:t,H:e,W:l,maskColor:n}=this;t.fillStyle=n,t.fillRect(0,0,l,e)}// 绘制标题
drawTitle(){let{ctx:t,H:e,W:l,btnH:n,textTitle:i,titleH:a,titleBtnSpacing:o,primaryColor:r}=this;t.font=`${a}px Arial`,t.textAlign="center",t.textBaseline="top",t.fillStyle=r,t.fillText(i,l/2,(e-a-o-n)/2)}// 绘制按钮（并绑定点击事件）
drawButtons(){let{canvas:t,ctx:e,H:l,W:n,btnTextColor:i,primaryColor:a,onSuccess:o,onCancel:r,titleH:s,titleBtnSpacing:c,successBtnText:d,cancelBtnText:f,btnH:h,btnPadding:x,btnSpacing:u}=this;// 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
e.font=`${h-2*x}px Arial`,e.textBaseline="top",e.textAlign="left";let p=e.measureText(d).width+2*x,g=e.measureText(f).width+2*x,m=(l+s+c)/2-h/2,C=(n-p-g-u)/2,T=C+p+u,v=[C,m,C+p,m+h],w=[T,m,T+g,m+h];// 取消按钮所占矩形范围（左上XY，右下XY）
// 绘制成功和取消按钮
e.fillStyle=a,e.fillRect(C,m,p,h),e.fillRect(T,m,g,h),e.fillStyle=i,e.fillText(d,C+x,m+x),e.fillText(f,T+x,m+x);// 判断坐标是否在矩形（按钮）范围之内
let y=(t,e,[l,n,i,a])=>t>=l&&t<=i&&e>=n&&e<=a;// 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
t.onclick=t=>[o,r][[v,w].findIndex(e=>y(t.offsetX,t.offsetY,e)&&(this.close(),!0))]?.()}// 关闭模态窗（移除DOM节点）
close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}}});var i=n("8PRdk");let a=Math.min(window.innerWidth,window.innerHeight)/18,o=16*a,r="#E4A751",s=1,c="#000000",d=document.createElement("canvas"),f=d.getContext("2d");// 总步数
d.width=d.height=o,d.style.cssText=`display: block; margin: ${(window.innerHeight-o)/2}px auto;cursor: pointer;`,document.body.appendChild(d);// 记录棋盘的黑白棋，15*15的二维数组，初始值：0，黑棋：1，白棋：2
let h=Array.from({length:15},()=>Array(15).fill(-1)),x=!0,u=0;// 下棋步数
// 监听棋盘点击位置
d.onclick=t=>{let[e,l]=[t.offsetX,t.offsetY].map(t=>Math.round(t/a)-1);h[e]?.[l]===-1&&(m(e,l,x),h[e][l]=x?1:2,v(e,l,h[e][l],h)?T(`${x?"黑":"白"}\u{68CB}\u{8D62}\u{4E86}!`):225==++u?T("游戏结束，平局！"):x=!x)};// 绘制棋盘（棋盘背景色 && 网格线）
const p=()=>{f.fillStyle=r,f.fillRect(0,0,o,o);for(let t=0;t<15;t++)g(0,t,14,t),g(t,0,t,14)},g=(t,e,l,n,i=s,o=c)=>{f.lineWidth=i,f.strokeStyle=o,f.beginPath(),f.moveTo(t*a+a,e*a+a),f.lineTo(l*a+a,n*a+a),f.stroke()},m=(t,e,l)=>{f.save(),f.shadowColor="rgba(0, 0, 0, 0.5)",f.shadowOffsetX=f.shadowOffsetY=.06*a,f.shadowBlur=.04*a,f.beginPath(),t=t*a+a,e=e*a+a,f.arc(t,e,.4*a,0,2*Math.PI),f.closePath();let n=f.createRadialGradient(t,e,0,t,e,.4*a);n.addColorStop(0,l?"#707070":"#FFFFFF"),n.addColorStop(1,l?"#000000":"#D5D8DC"),f.fillStyle=n,f.fill(),f.restore()},C=()=>{f.clearRect(0,0,o,o),p(),h=Array.from({length:15},()=>Array(15).fill(-1)),x=!0,u=0},T=t=>new i.default({canvas:d,onSuccess:C,primaryColor:r,textTitle:t}),v=(t,e,l,n)=>{for(let[i,a]of[[1,0],[0,1],[1,1],[1,-1]]){let[o,r,s]=[1,0,0];// count：连续同种颜色棋子数
// 判断：1、坐标是否越界 2、该位置的值是否一致（都是黑或白） 3、累计的次数是否达到5
for(;o<5&&n[t+i*++r]?.[e+a*r]===l;)o++;for(;o<5&&n[t-i*++s]?.[e-a*s]===l;)o++;if(5===o)return g(t+i*(r=4-s),e+a*r,t-i*s,e-a*s,5,"#F05459"),!0}return!1};window.onload=p;