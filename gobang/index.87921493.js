/**
 * @class
 * @description 在当前canvas之上覆盖一个大小位置都一样的canvas遮罩层
 */var t=class{/**
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
   */constructor({canvas:t,onSuccess:e,onCancel:l,primaryColor:n="#F56C6C",maskColor:i="rgba(128, 128, 128, 0.6)",btnTextColor:a="#FFFFFF",textTitle:o="Game Over",successBtnText:s="Try Again",cancelBtnText:c="Cancel"}){Object.assign(this,{onSuccess:e,onCancel:l,primaryColor:n,maskColor:i,btnTextColor:a,textTitle:o,successBtnText:s,cancelBtnText:c,W:t.width,H:t.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40// 按钮间距
});// 和原canvas大小位置都一样的新canvas
let{top:r,left:d}=t.getBoundingClientRect();this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,this.canvas.style.cssText=`position: absolute; top: ${r}px; left: ${d}px; cursor: pointer;`,// 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
t.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}// 绘制遮罩层
drawMask(){let{ctx:t,H:e,W:l,maskColor:n}=this;t.fillStyle=n,t.fillRect(0,0,l,e)}// 绘制标题
drawTitle(){let{ctx:t,H:e,W:l,btnH:n,textTitle:i,titleH:a,titleBtnSpacing:o,primaryColor:s}=this;t.font=`${a}px Arial`,t.textAlign="center",t.textBaseline="top",t.fillStyle=s,t.fillText(i,l/2,(e-a-o-n)/2)}// 绘制按钮（并绑定点击事件）
drawButtons(){let{canvas:t,ctx:e,H:l,W:n,btnTextColor:i,primaryColor:a,onSuccess:o,onCancel:s,titleH:c,titleBtnSpacing:r,successBtnText:d,cancelBtnText:h,btnH:f,btnPadding:x,btnSpacing:p}=this;// 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
e.font=`${f-2*x}px Arial`,e.textBaseline="top",e.textAlign="left";let g=e.measureText(d).width+2*x,u=e.measureText(h).width+2*x,m=(l+c+r)/2-f/2,C=(n-g-u-p)/2,T=C+g+p,w=[C,m,C+g,m+f],y=[T,m,T+u,m+f];// 取消按钮所占矩形范围（左上XY，右下XY）
// 绘制成功和取消按钮
e.fillStyle=a,e.fillRect(C,m,g,f),e.fillRect(T,m,u,f),e.fillStyle=i,e.fillText(d,C+x,m+x),e.fillText(h,T+x,m+x);// 判断坐标是否在矩形（按钮）范围之内
let v=(t,e,[l,n,i,a])=>t>=l&&t<=i&&e>=n&&e<=a;// 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
t.onclick=t=>[o,s][[w,y].findIndex(e=>v(t.offsetX,t.offsetY,e)&&(this.close(),!0))]?.()}// 关闭模态窗（移除DOM节点）
close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}};let e=Math.min(window.innerWidth,window.innerHeight)/18,l=16*e,n="#E4A751",i=1,a="#000000",o=document.createElement("canvas"),s=o.getContext("2d");// 总步数
o.width=o.height=l,o.style.cssText=`display: block; margin: ${(window.innerHeight-l)/2}px auto;cursor: pointer;`,document.body.appendChild(o);// 记录棋盘的黑白棋，15*15的二维数组，初始值：0，黑棋：1，白棋：2
let c=Array.from({length:15},()=>Array(15).fill(-1)),r=!0,d=0;// 下棋步数
// 监听棋盘点击位置
o.onclick=t=>{let[l,n]=[t.offsetX,t.offsetY].map(t=>Math.round(t/e)-1);c[l]?.[n]===-1&&(x(l,n,r),c[l][n]=r?1:2,u(l,n,c[l][n],c)?g(`${r?"黑":"白"}\u{68CB}\u{8D62}\u{4E86}!`):225==++d?g("游戏结束，平局！"):r=!r)};// 绘制棋盘（棋盘背景色 && 网格线）
const h=()=>{s.fillStyle=n,s.fillRect(0,0,l,l);for(let t=0;t<15;t++)f(0,t,14,t),f(t,0,t,14)},f=(t,l,n,o,c=i,r=a)=>{s.lineWidth=c,s.strokeStyle=r,s.beginPath(),s.moveTo(t*e+e,l*e+e),s.lineTo(n*e+e,o*e+e),s.stroke()},x=(t,l,n)=>{s.save(),s.shadowColor="rgba(0, 0, 0, 0.5)",s.shadowOffsetX=s.shadowOffsetY=.06*e,s.shadowBlur=.04*e,s.beginPath(),t=t*e+e,l=l*e+e,s.arc(t,l,.4*e,0,2*Math.PI),s.closePath();let i=s.createRadialGradient(t,l,0,t,l,.4*e);i.addColorStop(0,n?"#707070":"#FFFFFF"),i.addColorStop(1,n?"#000000":"#D5D8DC"),s.fillStyle=i,s.fill(),s.restore()},p=()=>{s.clearRect(0,0,l,l),h(),c=Array.from({length:15},()=>Array(15).fill(-1)),r=!0,d=0},g=e=>new t({canvas:o,onSuccess:p,primaryColor:n,textTitle:e}),u=(t,e,l,n)=>{for(let[i,a]of[[1,0],[0,1],[1,1],[1,-1]]){let[o,s,c]=[1,0,0];// count：连续同种颜色棋子数
// 判断：1、坐标是否越界 2、该位置的值是否一致（都是黑或白） 3、累计的次数是否达到5
for(;o<5&&n[t+i*++s]?.[e+a*s]===l;)o++;for(;o<5&&n[t-i*++c]?.[e-a*c]===l;)o++;if(5===o)return f(t+i*(s=4-c),e+a*s,t-i*c,e-a*c,5,"#F05459"),!0}return!1};window.onload=h;