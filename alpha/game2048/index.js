const ROW = 4,
  COL = 4,
  W = 125, // 格子宽度
  SPACE = 20, // 格子间隔
  SIDE_W = COL * (W + SPACE) + SPACE, // 宽
  SIDE_H = ROW * (W + SPACE) + SPACE, // 高
  BG_COLOR = '#F9F7EB', // 页面背景颜色
  VALUES = ['2', '4', '8', '16', '32', '64', '128', '256', '512', '1024', '2048'],
  VALUE_COLORS = ['#EEE4DA', '#EDE0C8', '#EDA166', '#F08151', '#F1654D', '#F1462E', '#E8C65F', '#E8C34F', '#E8BE40', '#E8BB31', '#E8B724'],
  FONT_SIZE = [70, 70, 70, 60, 60, 60, 50, 50, 50, 50, 40],
  FONT_GRAY = '#645B52',
  FONT_WHITE = '#F7F4EF';

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = SIDE_W;
canvas.height = SIDE_H;
canvas.style.cssText = 'position: absolute; inset: 0; margin: auto;';
document.body.appendChild(canvas);

document.body.style.backgroundColor = BG_COLOR;

let data = Array.from({ length: COL }, () => Array(ROW).fill(-1)), // 格子数据，空的为-1
  maxVal = 0; // 当前最大值（判断是否达到2048）

document.addEventListener('keydown', e => {
  const cb = keydownEvent[e.key];
  if (!cb) return;
  let newData = cb(JSON.parse(JSON.stringify(data)));
  if (newData.toString() === data.toString()) return
  data = newData;
  update();
})

// （单行）移动时算法，如[-1,2,1,1] → [-1,-1,2,2]
const move = list => {
  let temp = [], isMerge = false;
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i] === -1) continue
    if (isMerge && list[i] === temp[0]) {
      maxVal = Math.max(++temp[0], maxVal)
      isMerge = false;
    } else {
      temp.unshift(list[i]);
      isMerge = true
    }
  }
  return new Array(list.length - temp.length).fill(-1).concat(temp)
}

// 二维数组行列转换
const convert = arr => arr[0].map((_, colIndex) => arr.map(row => row[colIndex]))

// 上下左右移动，返回值：新的二维数组
const toUp = data => data.map(row => move(row.reverse()).reverse())
const toDown = data => data.map(row => move(row))
const toLeft = data => convert(convert(data).map(row => move(row.reverse()).reverse()))
const toRight = data => convert(convert(data).map(row => move(row)))

const keydownEvent = {
  ArrowUp: toUp,
  ArrowDown: toDown,
  ArrowLeft: toLeft,
  ArrowRight: toRight
}

const update = () => {
  ctx.clearRect(0, 0, SIDE_W, SIDE_H);
  drawBoard();
  drawAllDataBlock();
  if (isWin()) return alert('你赢了')
  let {x, y} = getRandomFreePos();
  data[x][y] = Math.random() < 0.5 ? 0 : 1;
  drawDataBlock(x, y, data[x][y]);
  if (isLose()) return alert('你输了！')
}

const isWin = () => maxVal === VALUES.length - 1

const isLose = () => !data.some((col, x) => col.some((v, y) => v === -1 || v === col[y + 1] || v === data[x + 1]?.[y]))

const start = () => {
  for (let i = 0; i < 2; i++) {
    let {x, y} = getRandomFreePos();
    data[x][y] = Math.random() < 0.5 ? 0 : 1;
  }
  drawBoard();
  drawAllDataBlock();
}

const drawDataBlock = (x, y, valIndex, w = W) => {
  const [dataVal, fillColor, fontSize] = [VALUES, VALUE_COLORS, FONT_SIZE].map(v => v[valIndex]);
  drawBlock(x, y, fillColor);
  ctx.font = `${fontSize}px serif`;
  ctx.fillStyle = valIndex < 2 ? FONT_GRAY : FONT_WHITE; // 值为2、4时，字体灰色；其他值字体都是白色
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(dataVal, trans(x) + w / 2, trans(y) + w / 2);
}

// 将x或y转换成真正的位置（在Canvas中的位置），用于绘制
const trans = pos => pos * (SPACE + W) + SPACE

// 绘制所有的格子
const drawAllDataBlock = () => data.forEach((col, x) => col.forEach((v, y) => v !== -1 && drawDataBlock(x, y, v)))

// 绘制面板
const drawBoard = () => {
  ctx.fillStyle = '#AD9D8F';
  ctx.fillRect(0, 0, SIDE_W, SIDE_H);
  for (let x = 0; x < COL; x++ ) {
    for (let y = 0; y < ROW; y++) {
      drawBlock(x, y);
    }
  }
}

// 绘制默认方块
const drawBlock = (x, y, fillColor = '#C2B4A5') => {
  ctx.fillStyle = fillColor;
  ctx.fillRect(trans(x), trans(y), W, W);
}

// 随机获取空闲位置
const getRandomFreePos = () => {
  let freePos = [];
  data.forEach((col, x) => col.forEach((v, y) => v === -1 && freePos.push({x, y})))
  return freePos[Math.floor(Math.random() * freePos.length)]
}

window.onload = start
