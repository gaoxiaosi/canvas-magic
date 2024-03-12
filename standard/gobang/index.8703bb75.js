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
   */constructor({canvas:t,onSuccess:e,onCancel:l,primaryColor:n="#F56C6C",maskColor:i="rgba(128, 128, 128, 0.6)",btnTextColor:a="#FFFFFF",textTitle:o="游戏结束",successBtnText:s="重新开始",cancelBtnText:r="取消"}){Object.assign(this,{onSuccess:e,onCancel:l,primaryColor:n,maskColor:i,btnTextColor:a,textTitle:o,successBtnText:s,cancelBtnText:r,W:t.width,H:t.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40// 按钮间距
}),// 和原canvas大小位置都一样的新canvas
// const { top, left } = canvas.getBoundingClientRect();
this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,// this.canvas.style.cssText = `position: absolute; top: ${top}px; left: ${left}px; cursor: pointer;`;
this.canvas.style.cssText="position: absolute; inset: 0; margin: auto; cursor: pointer;",// 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
t.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}// 绘制遮罩层
drawMask(){let{ctx:t,H:e,W:l,maskColor:n}=this;t.fillStyle=n,t.fillRect(0,0,l,e)}// 绘制标题
drawTitle(){let{ctx:t,H:e,W:l,btnH:n,textTitle:i,titleH:a,titleBtnSpacing:o,primaryColor:s}=this;t.font=`${a}px Arial`,t.textAlign="center",t.textBaseline="top",t.fillStyle=s,t.fillText(i,l/2,(e-a-o-n)/2)}// 绘制按钮（并绑定点击事件）
drawButtons(){let{canvas:t,ctx:e,H:l,W:n,btnTextColor:i,primaryColor:a,onSuccess:o,onCancel:s,titleH:r,titleBtnSpacing:c,successBtnText:d,cancelBtnText:h,btnH:f,btnPadding:u,btnSpacing:x}=this;// 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
e.font=`${f-2*u}px Arial`,e.textBaseline="top",e.textAlign="left";let p=e.measureText(d).width+2*u,g=e.measureText(h).width+2*u,m=(l+r+c)/2-f/2,T=(n-p-g-x)/2,C=T+p+x,v=[T,T+p,m,m+f],w=[C,C+g,m,m+f];// 取消按钮所占矩形范围（左右X的范围，上下Y的范围）
// 绘制成功和取消按钮
e.fillStyle=a,e.fillRect(T,m,p,f),e.fillRect(C,m,g,f),e.fillStyle=i,e.fillText(d,T+u,m+u),e.fillText(h,C+u,m+u);// 判断坐标是否在矩形（按钮）范围之内
let b=(t,e,[l,n,i,a])=>t>=l&&t<=n&&e>=i&&e<=a;// 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
t.onclick=t=>[o,s][[v,w].findIndex(e=>b(t.offsetX,t.offsetY,e)&&(this.close(),!0))]?.()}// 关闭模态窗（移除DOM节点）
close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}}});var i=n("8PRdk");const a=Math.min(window.innerWidth,window.innerHeight)/18,o=16*a,s="#E4A751",r=1,c="#000000";// 总步数
/** @type {HTMLCanvasElement} */let d=document.createElement("canvas"),h=d.getContext("2d");d.width=d.height=o,d.style.cssText="position: absolute; inset: 0; margin: auto;cursor: pointer;",document.body.appendChild(d);// 记录棋盘的黑白棋，15*15的二维数组，初始值：0，黑棋：1，白棋：2
let f=Array.from({length:15},()=>Array(15).fill(-1)),u=!0,x=0;// 下棋步数
// 监听棋盘点击位置
d.onclick=t=>{let[e,l]=[t.offsetX,t.offsetY].map(t=>Math.round(t/a)-1);f[e]?.[l]===-1&&(m(e,l,u),f[e][l]=u?1:2,v(e,l,f[e][l],f)?C(`${u?"黑":"白"}\u{68CB}\u{8D62}\u{4E86}!`):225==++x?C("游戏结束，平局！"):u=!u)};// 绘制棋盘（棋盘背景色 && 网格线）
const p=()=>{h.fillStyle=s,h.fillRect(0,0,o,o);for(let t=0;t<15;t++)g(0,t,14,t),g(t,0,t,14)},g=(t,e,l,n,i=r,o=c)=>{h.lineWidth=i,h.strokeStyle=o,h.beginPath(),h.moveTo(t*a+a,e*a+a),h.lineTo(l*a+a,n*a+a),h.stroke()},m=(t,e,l)=>{h.save(),h.beginPath(),t=t*a+a,e=e*a+a,h.arc(t,e,.4*a,0,2*Math.PI),h.closePath(),h.shadowColor="rgba(0, 0, 0, 0.5)",h.shadowOffsetX=h.shadowOffsetY=.06*a,h.shadowBlur=.04*a;let n=h.createRadialGradient(t,e,0,t,e,.4*a);n.addColorStop(0,l?"#707070":"#FFFFFF"),n.addColorStop(1,l?"#000000":"#D5D8DC"),h.fillStyle=n,h.fill(),h.restore()},T=()=>{h.clearRect(0,0,o,o),p(),f=Array.from({length:15},()=>Array(15).fill(-1)),u=!0,x=0},C=t=>new i.default({canvas:d,onSuccess:T,primaryColor:s,textTitle:t}),v=(t,e,l,n)=>{for(let[i,a]of[[1,0],[0,1],[1,1],[1,-1]]){let[o,s,r]=[1,0,0];// count：连续同种颜色棋子数
// 判断：1、坐标是否越界 2、该位置的值是否一致（都是黑或白） 3、累计的次数是否达到5
for(;o<5&&n[t+i*++s]?.[e+a*s]===l;)o++;for(;o<5&&n[t-i*++r]?.[e-a*r]===l;)o++;if(5===o)return g(t+i*(s=4-r),e+a*s,t-i*r,e-a*r,5,"#F05459"),!0}return!1};window.onload=p;