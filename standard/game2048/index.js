import Mask from '../../plugin/canvas-mask.js';

const W = 125, // 格子宽度
  SPACE = 20, // 格子间隔
  ROWS = 4,
  COLUMNS = 4,
  SIDE_W = W * COLUMNS + SPACE * (COLUMNS + 1), // 宽
  SIDE_H = W * ROWS + SPACE * (ROWS + 1), // 高
  BG_COLOR = '#F9F7EB', // 页面背景颜色
  BOARD_COLOR = '#AD9D8F', // 面板颜色
  BLOCK_COLOR = '#C2B4A5', // 方块颜色（默认）
  RADIUS_SIZE = 6, // 默认圆角大小
  MASK_PRIMARY_COLOR = '#EDA166', // 遮罩层主题颜色
  MASK_COLOR = 'rgba(143, 122, 102, 0.5)', // 遮罩层颜色
  VALUES = ['2', '4', '8', '16', '32', '64', '128', '256', '512', '1024', '2048'], // 格子中的值
  // VALUES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'],
  // VALUES = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚'],
  VALUE_COLORS = ['#EEE4DA', '#EDE0C8', '#EDA166', '#F08151', '#F1654D', '#F1462E', '#E8C65F', '#E8C34F', '#E8BE40', '#E8BB31', '#E8B724'], // 每一个值对应的颜色
  FONT = 'serif', // 字体
  FONT_SIZE = [70, 70, 70, 60, 60, 60, 50, 50, 50, 50, 40], // 每一个值对应的字体大小
  FONT_GRAY = '#645B52', // 2或4时，字体颜色，浅灰
  FONT_WHITE = '#F7F4EF', // 8及其之后（第3项开始）背景颜色都是比较亮的，字体颜色为白色
  MOVE_DURATION = 64,  //  移动动画时间
  MERGE_SCALE_DURATION = 128, // 合并时缩放动画时间
  APPEAR_SCALE_DURATION = 128, // 新出现时缩放动画时间
  MERGE_SCALE_RATIO = 0.3, // 合并时最大缩放比例
  APPEAR_SCALE_RATIO = 0.3; // 新出现时的初始比例

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = SIDE_W;
canvas.height = SIDE_H;
canvas.style.cssText = 'position: absolute; inset: 0; margin: auto;';
document.body.appendChild(canvas);

document.body.style.backgroundColor = BG_COLOR;

let data = Array.from({ length: COLUMNS }, () => Array(ROWS).fill(-1)), // 格子数据，空的为-1
  maxVal = 0, // 当前最大值（判断是否达到2048）
  isOver = false, // 游戏状态，是否已结束
  staticMoveGroup = [],
  moveGroup = [],
  staticScaleGroup = [],
  scaleGroup = [];

document.addEventListener('keydown', e => {
  if (isOver) return;
  const cb = keydownEvent[e.key];
  cb && execute(cb, data, e.key);
})

const execute = async (cb, oldData, diretion) => {
  moveGroup = [], staticMoveGroup = [], scaleGroup = [], staticScaleGroup = [];
  let newData = cb(JSON.parse(JSON.stringify(oldData)), diretion);
  if (newData.toString() === oldData.toString()) return
  data = newData;
  let moveAnimateId = await moveAnimate(moveGroup, staticMoveGroup, diretion);
  cancelAnimationFrame(moveAnimateId);
  if (scaleGroup.length > 0) {
    let getPos = getTruePos[diretion];
    scaleGroup = scaleGroup.map(({ index, end, val }) => getPos(index, end, val))
    staticScaleGroup = staticScaleGroup.map(({ index, end, val }) => getPos(index, end, val))
    let scaleAnimateId = await scaleAnimate(scaleGroup, staticScaleGroup, mergeScale, MERGE_SCALE_RATIO, MERGE_SCALE_DURATION)
    cancelAnimationFrame(scaleAnimateId);
  }
  update();
}

// 移动动画时：获取坐标
const getTruePos = {
  ArrowUp: (index, start, val, delta = 0) => ({ x: index, y: ROWS - 1 - start - delta, val }),
  ArrowDown: (index, start, val, delta = 0) => ({ x: index, y: start + delta, val }),
  ArrowLeft: (index, start, val, delta = 0) => ({ x: COLUMNS - 1 - start - delta, y: index, val }),
  ArrowRight: (index, start, val, delta = 0) => ({ x: start + delta, y: index, val })
}

const moveAnimate = (moveGroup, staticMoveGroup, diretion, duration = MOVE_DURATION) => new Promise(resolve => {
  let start = null, elapsed = null, activeGroup = [], animateId = null, getPos = getTruePos[diretion];
  staticMoveGroup = staticMoveGroup.map(({ index, end, val }) => getPos(index, end, val))
  const draw = timestamp => {
    if (!start) start = timestamp;
    ctx.clearRect(0, 0, SIDE_W, SIDE_H);
    drawBoard();
    drawBaseBlock(data);
    staticMoveGroup.forEach(({x, y, val}) => drawDataBlock(x, y, val))
    activeGroup.forEach(({x, y, val}) => drawDataBlock(x, y, val))
    elapsed = timestamp - start;
    if (elapsed < duration) { // 判断是否绘制完成
      // activeGroup = moveGroup.map(({index, start, val, distance}) => getPos(index, start, val, distance * elapsed / duration));
      activeGroup = moveGroup.map(({index, start, val, distance}) => getPos(index, start, val, distance * Math.sin(elapsed / duration * Math.PI / 2)));
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
    staticScaleGroup.forEach(({x, y, val}) => drawDataBlock(x, y , val))
    scaleGroup.forEach(({x, y, val}) => drawDataBlock(x - ratio / 2, y - ratio / 2, val, W + W * ratio, ratio))
    elapsed = timestamp - start;
    if (elapsed < duration) { // 判断是否绘制完成
      // scaleRatio = (1 - Math.abs(1 - elapsed / duration * 2)) * maxScaleRatio
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
const appearScale = (progress, scaleRatio) => - Math.cos(progress * Math.PI / 2) * scaleRatio;

const move = (list, index) => {
  let temp = [], isMerge = false, len = list.length, distance = 0;
  for (let i = len - 1; i >= 0; i--) {
    if (list[i] === -1) continue
    if (isMerge && list[i] === temp[0]) {
      maxVal = Math.max(++temp[0], maxVal)
      isMerge = false;
      scaleGroup.push({ index, val: list[i], end: len - temp.length })
      staticScaleGroup.pop();
    } else {
      temp.unshift(list[i]);
      staticScaleGroup.push({ index, val: list[i], end: len - temp.length })
      isMerge = true;
    }
    distance = len - temp.length - i;
    distance === 0 ? staticMoveGroup.push({ index, val: list[i], end: i }) : moveGroup.push({ index, val: list[i], start: i, distance: len - temp.length - i });
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
    data.forEach((col, x) => col.forEach((val, y) => val !== -1 && staticGroup.push({x, y, val})))
    let {x, y} = getRandomFreePos(data);
    let val = Math.random() < 0.5 ? 0 : 1;
    data[x][y] = val;
    if (isLose()) {
      isOver = true;
      over(`你输了！最高分：${VALUES[maxVal]}`)
    };
    await scaleAnimate([{x, y, val}], staticGroup, appearScale, APPEAR_SCALE_RATIO, APPEAR_SCALE_DURATION)
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
  let scaleGroup = [];
  for (let i = 0; i < 2; i++) {
    let {x, y} = getRandomFreePos(data);
    let val = Math.random() < 0.5 ? 0 : 1;
    data[x][y] = val;
    scaleGroup.push({x, y, val})
  }
  await scaleAnimate(scaleGroup, [], appearScale, APPEAR_SCALE_RATIO, APPEAR_SCALE_DURATION)
  drawBoard();
  drawAllBlock(data);
}

// 游戏结束，弹出提示
const over = textTitle => new Mask({canvas, onSuccess: restart, maskColor: MASK_COLOR, primaryColor: MASK_PRIMARY_COLOR, textTitle})

const restart = () => {
  isOver = false;
  data = Array.from({ length: COLUMNS }, () => Array(ROWS).fill(-1));
  maxVal = 0;
  moveGroup = [];
  staticMoveGroup = [];
  scaleGroup = [];
  staticScaleGroup = [];
  start();
}

const drawDataBlock = (x, y, valIndex, w = W, scaleRatio = 0) => {
  const [dataVal, fillColor, fontSize] = [VALUES, VALUE_COLORS, FONT_SIZE].map(v => v[valIndex]);
  drawBlock(x, y, fillColor, w);
  ctx.font = `${fontSize * (1 + scaleRatio)}px ${FONT}`;
  ctx.fillStyle = valIndex < 2 ? FONT_GRAY : FONT_WHITE; // 值为2、4时，字体灰色；其他值字体都是白色
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(dataVal, trans(x) + w / 2, trans(y) + w / 2);
}

const trans = pos => pos * (SPACE + W) + SPACE

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
  data.forEach((col, x) => col.forEach((_, y) => data[x][y] === -1 && freePos.push({x, y})))
  return freePos[Math.floor(Math.random() * freePos.length)]
}

window.onload = start
