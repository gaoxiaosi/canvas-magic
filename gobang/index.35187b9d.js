/**
 * @class
 * @description 在当前canvas之上覆盖一个大小位置都一样的canvas遮罩层
 */let t;var e,l=class{/**
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
   */constructor({canvas:t,onSuccess:e,onCancel:l,primaryColor:i="#F56C6C",maskColor:n="rgba(128, 128, 128, 0.6)",btnTextColor:a="#FFFFFF",textTitle:o="Game Over",successBtnText:s="Try Again",cancelBtnText:c="Cancel"}){Object.assign(this,{onSuccess:e,onCancel:l,primaryColor:i,maskColor:n,btnTextColor:a,textTitle:o,successBtnText:s,cancelBtnText:c,W:t.width,H:t.height,titleH:50,titleBtnSpacing:50,btnH:40,btnPadding:10,btnSpacing:40// 按钮间距
});// 和原canvas大小位置都一样的新canvas
let{top:r,left:h}=t.getBoundingClientRect();this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.canvas.id=`mask-canvas-${new Date().getTime()}`,this.canvas.width=this.W,this.canvas.height=this.H,this.canvas.style.cssText=`position: absolute; top: ${r}px; left: ${h}px; cursor: pointer;`,// 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
t.parentNode.appendChild(this.canvas),this.drawMask(),this.drawTitle(),this.drawButtons()}// 绘制遮罩层
drawMask(){let{ctx:t,H:e,W:l,maskColor:i}=this;t.fillStyle=i,t.fillRect(0,0,l,e)}// 绘制标题
drawTitle(){let{ctx:t,H:e,W:l,btnH:i,textTitle:n,titleH:a,titleBtnSpacing:o,primaryColor:s}=this;t.font=`${a}px Arial`,t.textAlign="center",t.textBaseline="top",t.fillStyle=s,t.fillText(n,l/2,(e-a-o-i)/2)}// 绘制按钮（并绑定点击事件）
drawButtons(){let{canvas:t,ctx:e,H:l,W:i,btnTextColor:n,primaryColor:a,onSuccess:o,onCancel:s,titleH:c,titleBtnSpacing:r,successBtnText:h,cancelBtnText:d,btnH:f,btnPadding:x,btnSpacing:g}=this;// 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
e.font=`${f-2*x}px Arial`,e.textBaseline="top",e.textAlign="left";let u=e.measureText(h).width+2*x,p=e.measureText(d).width+2*x,w=(l+c+r)/2-f/2,m=(i-u-p-g)/2,y=m+u+g,T=[m,w,m+u,w+f],C=[y,w,y+p,w+f];// 取消按钮所占矩形范围（左上XY，右下XY）
// 绘制成功和取消按钮
e.fillStyle=a,e.fillRect(m,w,u,f),e.fillRect(y,w,p,f),e.fillStyle=n,e.fillText(h,m+x,w+x),e.fillText(d,y+x,w+x);// 判断坐标是否在矩形（按钮）范围之内
let b=(t,e,[l,i,n,a])=>t>=l&&t<=n&&e>=i&&e<=a;// 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
t.onclick=t=>[o,s][[T,C].findIndex(e=>b(t.offsetX,t.offsetY,e)&&(this.close(),!0))]?.()}// 关闭模态窗（移除DOM节点）
close(){this.ctx.clearRect(0,0,this.W,this.H),this.canvas.onclick=null,document.getElementById(this.canvas.id).remove()}};let i=Math.min(window.innerWidth,window.innerHeight)/18,n=16*i,a="#E4A751",o=1,s="#000000",c=document.createElement("canvas"),r=c.getContext("2d");// 总步数
c.width=c.height=n,c.style.cssText=`display: block; margin: ${(window.innerHeight-n)/2}px auto;cursor: pointer;`,document.body.appendChild(c);let h=document.createElement("button");h.innerText="悔棋";// regretBtn.style.cssText = 'display: block; position: absolute; left: 10px; top: 10px; padding: 15px 30px; font-size: 20px; cursor: pointer;'
// document.body.appendChild(regretBtn);
// 记录棋盘的黑白棋，15*15的二维数组，初始值：0，黑棋：1，白棋：2
let d=Array.from({length:15},()=>Array(15).fill(-1)),f=!0,x=0,g=[];h.onclick=t=>{if(0===g.length)return;f=!f,x--;let{x:e,y:l}=g.pop();if(d[e][l]=-1,m(e,l),0===g.length)return;let{x:i,y:n}=g.at(-1);y(i,n);// let lastStep = steps.at(-1)
// drawRedPoint(lastStep.x, lastStep.y);
},// 监听棋盘点击位置
c.onclick=t=>{let[e,l]=[t.offsetX,t.offsetY].map(t=>Math.round(t/i)-1);if(d[e]?.[l]===-1){if(g.length>0){let{x:t,y:e,isBlack:l}=g.at(-1);m(t,e),w(t,e,l)}w(e,l,f),y(e,l),g.push({x:e,y:l,isBlack:f}),d[e][l]=f?1:2,b(e,l,d[e][l],d)?C(`${f?"黑":"白"}\u{68CB}\u{8D62}\u{4E86}!`):225==++x?C("游戏结束，平局！"):f=!f}};// 绘制棋盘（棋盘背景色 && 网格线）
const u=()=>{r.fillStyle=a,r.fillRect(0,0,n,n);for(let t=0;t<15;t++)p(0,t,14,t),p(t,0,t,14)},p=(t,e,l,n,a=o,c=s)=>{r.lineWidth=a,r.strokeStyle=c,r.beginPath(),r.moveTo(t*i+i,e*i+i),r.lineTo(l*i+i,n*i+i),r.stroke()},w=(t,e,l)=>{r.save(),r.shadowColor="rgba(0, 0, 0, 0.5)",r.shadowOffsetX=r.shadowOffsetY=.06*i,r.shadowBlur=.04*i,r.beginPath(),t=t*i+i,e=e*i+i,r.arc(t,e,.4*i,0,2*Math.PI),r.closePath();let n=r.createRadialGradient(t,e,0,t,e,.4*i);n.addColorStop(0,l?"#707070":"#FFFFFF"),n.addColorStop(1,l?"#000000":"#D5D8DC"),r.fillStyle=n,r.fill(),r.restore()},m=(t,e)=>{r.fillStyle=a,r.fillRect(t*i+i/2,e*i+i/2,i,i),p(t,e>0?e-.5:e,t,e<14?e+.5:e),p(t>0?t-.5:t,e,t<14?t+.5:t,e)},y=(t,e,l=.05*i)=>{r.beginPath(),r.fillStyle="#F56C6C",r.arc(t*i+i,e*i+i,l,0,2*Math.PI),r.closePath(),r.fill()},T=()=>{r.clearRect(0,0,n,n),u(),d=Array.from({length:15},()=>Array(15).fill(-1)),f=!0,x=0},C=t=>new l({canvas:c,onSuccess:T,primaryColor:a,textTitle:t}),b=(t,e,l,i)=>{for(let[n,a]of[[1,0],[0,1],[1,1],[1,-1]]){let[o,s,c]=[1,0,0];// count：连续同种颜色棋子数
// 判断：1、坐标是否越界 2、该位置的值是否一致（都是黑或白） 3、累计的次数是否达到5
for(;o<5&&i[t+n*++s]?.[e+a*s]===l;)o++;for(;o<5&&i[t-n*++c]?.[e-a*c]===l;)o++;if(5===o)return p(t+n*(s=4-c),e+a*s,t-n*c,e-a*c,5,"#F05459"),!0}return!1};window.onresize=(e=()=>{if(console.log("onresize"),r.clearRect(0,0,n,n),i=Math.min(window.innerWidth,window.innerHeight)/18,n=16*i,c.width=c.height=n,c.style.cssText=`display: block;margin: ${(window.innerHeight-n)/2}px auto;box-shadow: 0 0 5px #dcdcdc;cursor: pointer;`,u(),g.forEach(({x:t,y:e,isBlack:l})=>{w(t,e,l)}),g.length>0){let{x:t,y:e}=g.at(-1);y(t,e)}},t=null,(...l)=>{clearTimeout(t),t=setTimeout(()=>{e(...l)},512)}),window.onload=u;