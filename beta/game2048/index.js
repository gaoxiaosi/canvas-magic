import img1 from './1.png'
import img2 from './2.png'
import img3 from './3.png'
import img4 from './4.png'
import img5 from './5.png'
import img6 from './6.png'
import img7 from './7.jpg'
import img8 from './8.jpg'
import img9 from './9.png'
import img10 from './10.jpg'

import Mask from "../../plugin/canvas-mask.js";

const W = 125, // 格子宽度
  SPACE = 20, // 格子间隔
  ROW = 4, // 行
  COL = 4, // 列
  SIDE_W = COL * (W + SPACE) + SPACE, // 宽
  SIDE_H = ROW * (W + SPACE) + SPACE, // 高
  BG_COLOR = '#F9F7EB', // 页面背景颜色
  BOARD_COLOR = '#AD9D8F', // 面板颜色
  BLOCK_COLOR = '#C2B4A5', // 方块颜色（默认）
  RADIUS_SIZE = 6, // 默认圆角大小
  MASK_PRIMARY_COLOR = '#EDA166',
  MASK_COLOR = 'rgba(143, 122, 102, 0.5)',
  VALUES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10], // 打包时通过import引入图片
  // VALUES = ['./1.png', './2.png', './3.png', './4.png', './5.png'], // 本地测试
  // VALUES = [ // 线上图片地址（可在浏览器中设置“不要缓存”和“限制网速”进行调试）
  //   'https://bideyuanli.com/wp-content/themes/2048/zhan/1.png',
  //   'https://bideyuanli.com/wp-content/themes/2048/zhan/3.png',
  //   'https://bideyuanli.com/wp-content/themes/2048/zhan/4.png',
  //   'https://bideyuanli.com/wp-content/themes/2048/zhan/5.png',
  //   'https://bideyuanli.com/wp-content/themes/2048/zhan/6.png'
  // ],
  VALUE_COLORS = ['#EEE4DA', '#EDE0C8', '#EDA166', '#F08151', '#F1654D', '#F1462E', '#E8C65F', '#E8C34F', '#E8BE40', '#E8BB31', '#E8B724'],
  MOVE_DURATION = 64,  //  移动动画时间
  MERGE_SCALE_DURATION = 128, // 合并时缩放动画时间
  APPEAR_SCALE_DURATION = 256, // 新出现时缩放动画时间
  MERGE_SCALE_RATIO = 0.3, // 合并时最大缩放比例
  APPEAR_SCALE_RATIO = 0.7; // 新出现时的初始比例

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = SIDE_W;
canvas.height = SIDE_H;
canvas.style.cssText = 'position: absolute; inset: 0; margin: auto;';
document.body.appendChild(canvas);

document.body.style.backgroundColor = BG_COLOR;

let data = Array.from({ length: COL }, () => Array(ROW).fill(-1)), // 格子数据，空的为-1
  maxVal = 0, // 当前最大值（判断是否达到2048）
  isOver = false, // 游戏状态，是否已结束
  moveGroup = [], // 移动动画组
  staticMoveGroup = [], // 移动时，静态组
  scaleGroup = [], // 缩放动画组
  staticScaleGroup = [], // 缩放时，静态组
  images = [], // 图片对象
  isLoadeds = new Array(VALUES.length).fill(false); // 记录图片是否加载完毕

document.addEventListener('keydown', async e => {
  if (isOver) return;
  const cb = keydownEvent[e.key], diretion = e.key;
  if (!cb) return;
  moveGroup = [], staticMoveGroup = [], scaleGroup = [], staticScaleGroup = [];
  let newData = cb(JSON.parse(JSON.stringify(data)), diretion);
  if (newData.toString() === data.toString()) return
  data = newData;
  let moveAnimateId = await moveAnimate(moveGroup, staticMoveGroup, diretion);
  cancelAnimationFrame(moveAnimateId);
  if (scaleGroup.length > 0) {
    let getPos = getTruePos[diretion];
    scaleGroup = scaleGroup.map(({ index, pos, val }) => getPos(index, pos, val))
    staticScaleGroup = staticScaleGroup.map(({ index, pos, val }) => getPos(index, pos, val))
    let scaleAnimateId = await scaleAnimate(scaleGroup, staticScaleGroup, mergeScale, MERGE_SCALE_RATIO, MERGE_SCALE_DURATION);
    cancelAnimationFrame(scaleAnimateId);
  }
  update();
})

// 获取准确的坐标（根据方向、行列、下标）
const getTruePos = {
  ArrowUp: (index, pos, val, delta = 0) => ({ x: index, y: ROW - 1 - pos - delta, val }),
  ArrowDown: (index, pos, val, delta = 0) => ({ x: index, y: pos + delta, val }),
  ArrowLeft: (index, pos, val, delta = 0) => ({ x: COL - 1 - pos - delta, y: index, val }),
  ArrowRight: (index, pos, val, delta = 0) => ({ x: pos + delta, y: index, val })
}

// 移动动画
const moveAnimate = (moveGroup, staticMoveGroup, diretion, duration = MOVE_DURATION) => new Promise(resolve => {
  let start = null, elapsed = null, activeGroup = [], animateId = null, getPos = getTruePos[diretion];
  staticMoveGroup = staticMoveGroup.map(({ index, pos, val }) => getPos(index, pos, val))
  const draw = timestamp => {
    if (!start) start = timestamp;
    ctx.clearRect(0, 0, SIDE_W, SIDE_H);
    drawBoard();
    drawBaseBlock(data);
    staticMoveGroup.forEach(({ x, y, val }) => drawDataBlock(x, y, val))
    activeGroup.forEach(({ x, y, val }) => drawDataBlock(x, y, val))
    elapsed = timestamp - start;
    if (elapsed < duration) { // 判断是否绘制完成
      // activeGroup = moveGroup.map(({ index, pos, val, distance }) => getMovePos(index, pos, val, distance * elapsed / duration)); // 匀速
      activeGroup = moveGroup.map(({index, pos, val, distance}) => getPos(index, pos, val, distance * Math.sin(elapsed / duration * Math.PI / 2))); //sin函数，先快后慢
      requestAnimationFrame(draw);
    } else { // 绘制完成
      resolve(animateId);
    }
  }
  animateId = requestAnimationFrame(draw);
})

// 缩放动画
const scaleAnimate = (scaleGroup, staticScaleGroup, scaleFn, scaleRatio, duration) => new Promise(resolve => {
  let start = null, elapsed = null, animateId = null, ratio = 0;
  const draw = timestamp => {
    if (!start) start = timestamp;
    ctx.clearRect(0, 0, SIDE_W, SIDE_H);
    drawBoard();
    drawBaseBlock(data);
    staticScaleGroup.forEach(({ x, y, val }) => drawDataBlock(x, y, val))
    scaleGroup.forEach(({ x, y, val }) => drawDataBlock(x - ratio / 2, y - ratio / 2, val, W + W * ratio))
    elapsed = timestamp - start;
    if (elapsed < duration) { // 判断是否绘制完成
      ratio = scaleFn(elapsed / duration, scaleRatio);
      requestAnimationFrame(draw);
    } else { // 绘制完成
      resolve(animateId);
    }
  }
  animateId = requestAnimationFrame(draw);
})

// 合并时缩放变化：先放大，再恢复原本大小
const mergeScale = (progress, scaleRatio) => Math.sin(progress * Math.PI) * scaleRatio;

// 新出现方块的缩放变化，从小变到大
const appearScale = (progress, scaleRatio) => - Math.cos(progress * Math.PI / 2) * (1 - scaleRatio);

// 移动合并
const move = (list, index) => {
  let temp = [], isMerge = false, len = list.length, distance = 0;
  for (let i = len - 1; i >= 0; i--) {
    if (list[i] === -1) continue
    if (isMerge && list[i] === temp[0]) {
      maxVal = Math.max(++temp[0], maxVal)
      isMerge = false;
      scaleGroup.push({ index, val: list[i], pos: len - temp.length })
      staticScaleGroup.pop();
    } else {
      temp.unshift(list[i]);
      staticScaleGroup.push({ index, val: list[i], pos: len - temp.length })
      isMerge = true;
    }
    distance = len - temp.length - i;
    distance === 0 ? staticMoveGroup.push({ index, val: list[i], pos: i }) : moveGroup.push({ index, val: list[i], pos: i, distance });
  }
  return new Array(len - temp.length).fill(-1).concat(temp)
}

// 二维数组行列转换
const convert = arr => arr[0].map((_, colIndex) => arr.map(col => col[colIndex]))

// 上下左右移动，返回值：新的二维数组
const toUp = data => data.map((col, index) => move(col.reverse(), index).reverse())
const toDown = data => data.map((col, index) => move(col, index))
const toLeft = data => convert(convert(data).map((col, index) => move(col.reverse(), index).reverse()))
const toRight = data => convert(convert(data).map((col, index) => move(col, index)))

const keydownEvent = {
  ArrowUp: toUp,
  ArrowDown: toDown,
  ArrowLeft: toLeft,
  ArrowRight: toRight
}


const update = async () => {
  if (isWin()) {
    isOver = true;
    over('你赢了!');
  } else {
    let staticGroup = [];
    data.forEach((col, x) => col.forEach((val, y) => val !== -1 && staticGroup.push({ x, y, val })))
    let { x, y } = getRandomFreePos(data);
    let val = Math.random() < 0.5 ? 0 : 1;
    data[x][y] = val;
    // if (isLose()) console.log(`你输了！最高分：${VALUES[maxVal]}`);
    if (isLose()) {
      isOver = true;
      over('你输了');
    };
    await scaleAnimate([{ x, y, val }], staticGroup, appearScale, APPEAR_SCALE_RATIO, APPEAR_SCALE_DURATION)
  }
  ctx.clearRect(0, 0, SIDE_W, SIDE_H);
  drawBoard();
  drawAllBlock(data);
}

// 判断是否获胜
const isWin = () => maxVal === VALUES.length - 1

// 判断是否失败（页面上每次新增一个2或4时判断）
const isLose = () => !data.some((col, x) => col.some((v, y) => v === -1 || v === col[y + 1] || v === data[x + 1]?.[y]))

// 开始：绘制面板，生成2个随机位置的方块
const start = async () => {
  VALUES.forEach((imgPath, index) => {
    if (isLoadeds[index]) return // 重新开始游戏时，如果已经加载过的图片不要再请求
    let img = new Image();
    img.src = imgPath;
    images[index] = img;
    img.onload = () => {
      isLoadeds[index] = true;
      data.forEach((col, x) => col.forEach((v, y) => v === index && drawDataBlock(x, y, v)))
    }
  })
  let scaleGroup = [];
  for (let i = 0; i < 2; i++) {
    let {x, y} = getRandomFreePos(data);
    let val = Math.random() < 0.5 ? 0 : 1;
    data[x][y] = val;
    scaleGroup.push({x, y, val});
  }
  await scaleAnimate(scaleGroup, [], appearScale, APPEAR_SCALE_RATIO, APPEAR_SCALE_DURATION);
  drawBoard();
  drawAllBlock(data);
}

const drawDataBlock = (x, y, valIndex, w = W) => {
  x = trans(x);
  y = trans(y);
  if (isLoadeds[valIndex]) {
    ctx.save();
    roundRect(x, y, w, w, 6, BLOCK_COLOR);
    ctx.clip();
    ctx.drawImage(images[valIndex], x, y, w, w);
    ctx.restore();
  } else {
    roundRect(x, y, w, w, 6, VALUE_COLORS[valIndex]);
  }
}

// 游戏结束，弹出提示
const over = textTitle => new Mask({ canvas, onSuccess: restart, maskColor: MASK_COLOR, primaryColor: MASK_PRIMARY_COLOR, textTitle })

const restart = () => {
  isOver = false;
  data = Array.from({ length: COL }, () => Array(ROW).fill(-1));
  maxVal = 0;
  moveGroup = [];
  staticMoveGroup = [];
  scaleGroup = [];
  staticScaleGroup = [];
  start();
}

const trans = pos => pos * (W + SPACE) + SPACE

// 绘制格子（无论是否有值，打底）
const drawBaseBlock = data => data.forEach((col, x) => col.forEach((_, y) => drawBlock(x, y)))

// 绘制所有的格子
const drawAllBlock = data => data.forEach((col, x) => col.forEach((val, y) => {
  drawBlock(x, y);
  val !== -1 && drawDataBlock(x, y, val);
}))

// 绘制面板
const drawBoard = () => roundRect(0, 0, SIDE_W, SIDE_H, 6, BOARD_COLOR)

// 绘制默认方块
const drawBlock = (x, y, fillColor = BLOCK_COLOR, w = W) => roundRect(trans(x), trans(y), w, w, 6, fillColor)

// 圆角矩形
const roundRect = (x, y, w, h, r = RADIUS_SIZE, fillColor) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
}

// 随机获取空闲位置
const getRandomFreePos = data => {
  let freePos = [];
  data.forEach((col, x) => col.forEach((_, y) => data[x][y] === -1 && freePos.push({ x, y })))
  return freePos[Math.floor(Math.random() * freePos.length)]
}

window.onload = start
