function e(e){return e&&e.__esModule?e.default:e}var r=globalThis,t={},n={},o=r.parcelRequire6f20;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){n[e]=r},r.parcelRequire6f20=o),(0,o.register)("dRo73",function(e,r){Object.defineProperty(e.exports,"register",{get:()=>t,set:e=>t=e,enumerable:!0,configurable:!0});var t,n=new Map;t=function(e,r){for(var t=0;t<r.length-1;t+=2)n.set(r[t],{baseUrl:e,path:r[t+1]})}}),o("dRo73").register(new URL("",import.meta.url).toString(),JSON.parse('["jVlne","index.ee4d64fd.js","7i45P","../../201.1c79e02e.png","8zSqV","../../202.77821e30.png","6Xsq2","../../203.12cc791a.png","9nsZt","../../204.70762dd7.png","luu81","../../214.83ae63bf.png"]'));var a={};a=new URL("../../201.1c79e02e.png",import.meta.url).toString();var l={};l=new URL("../../202.77821e30.png",import.meta.url).toString();var i={};i=new URL("../../203.12cc791a.png",import.meta.url).toString();var c={};c=new URL("../../204.70762dd7.png",import.meta.url).toString();var f={};f=new URL("../../214.83ae63bf.png",import.meta.url).toString();const // VALUES = [
//   './201.png',
//   './202.png',
//   './203.png',
//   './204.png',
//   './214.png'
// ],
d=[/*@__PURE__*/e(a),/*@__PURE__*/e(l),/*@__PURE__*/e(i),/*@__PURE__*/e(c),/*@__PURE__*/e(f)],s=256;/** @type {HTMLCanvasElement} */let u=document.createElement("canvas"),g=u.getContext("2d");u.width=600,u.height=600,u.style.cssText="position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto;",document.body.appendChild(u),document.body.style.backgroundColor="#F9F7EB";let p=Array.from({length:4},()=>[,,,,].fill(-1)),m=0,h=[],R=-1,w=[];// 图片对象数组
document.addEventListener("keydown",e=>{let r=S[e.key];r&&A(r,p,e.key)});const A=async(e,r,t)=>{h=[],R=-1;let n=e(r);if(n.toString()===r.toString())return;p=n;let o=await E(h,t);cancelAnimationFrame(o),H()},E=(e,r,t=s)=>new Promise(n=>{let o=(e,t)=>e.map(({index:e,val:n,start:o,end:a})=>{let l=(a-o)*t;return"ArrowUp"===r?{x:e,y:3-o-l,val:n}:"ArrowDown"===r?{x:e,y:o+l,val:n}:"ArrowLeft"===r?{x:3-o-l,y:e,val:n}:"ArrowRight"===r?{x:o+=l,y:e,val:n}:void 0}),a=null,l,i=[],c=null,f=r=>{a||(a=r),g.clearRect(0,0,600,600),L(),F(p),i.forEach(({x:e,y:r,val:t})=>x(e,r,t)),(l=r-a)<t?(i=o(e,l/t),requestAnimationFrame(f)):n(c)};c=requestAnimationFrame(f)}),_=e=>{R++;let r=[],t=!1,n=e.length;for(let o=n-1;o>=0;o--)-1!==e[o]&&(t&&e[o]===r[0]?(m=Math.max(++r[0],m),t=!1):(r.unshift(e[o]),t=!0),h.push({index:R,val:e[o],start:o,end:n-r.length}));return Array(n-r.length).fill(-1).concat(r)},v=e=>e[0].map((r,t)=>e.map(e=>e[t])),S={ArrowUp:e=>e.map(e=>_(e.reverse()).reverse()),ArrowDown:e=>e.map(e=>_(e)),ArrowLeft:e=>v(v(e).map(e=>_(e.reverse()).reverse())),ArrowRight:e=>v(v(e).map(e=>_(e)))},H=()=>{if(b())console.log("你赢了");else{let{x:e,y:r}=D(p);p[e][r]=0}g.clearRect(0,0,600,600),L(),U(p),y()&&console.log("你输了！")},b=()=>m===d.length-1,y=()=>{for(let e=0;e<4;e++)for(let r=0;r<4;r++)// 游戏未结束条件：1.本身是空值 2.下方没有相同值 3.右侧没有相同值
if(-1===p[e][r]||r<3&&p[e][r]===p[e][r+1]||e<3&&p[e][r]===p[e+1][r])return!1;return!0},x=(e,r,t)=>{g.drawImage(w[t],145*e+20,145*r+20,125,125)},F=e=>e.forEach((e,r)=>e.forEach((e,t)=>q(r,t))),U=e=>e.forEach((r,t)=>r.forEach((r,n)=>{q(t,n),-1!==e[t][n]&&x(t,n,e[t][n])})),L=()=>{g.fillStyle="#AD9D8F",g.fillRect(0,0,600,600)},q=(e,r,t="#C2B4A5")=>{g.fillStyle=t,g.fillRect(145*e+20,145*r+20,125,125)},D=e=>{let r=[];return e.forEach((t,n)=>t.forEach((t,o)=>-1===e[n][o]&&r.push({x:n,y:o}))),r[Math.floor(Math.random()*r.length)]};window.onload=()=>{for(let e=0;e<2;e++){let{x:e,y:r}=D(p);p[e][r]=0}d.forEach((e,r)=>{let t=new Image;t.src=e,w[r]=t,t.onload=function(){console.log("onload"),p.forEach((e,r)=>e.forEach((e,t)=>-1!==p[r][t]&&x(r,t,p[r][t])))}}),L(),U(p)};