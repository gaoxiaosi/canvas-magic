const W = 125, // 格子宽度
  SPACE = 20, // 格子间隔
  ROWS = 4,
  COLUMNS = 4,
  SIDE_W = W * COLUMNS + SPACE * (COLUMNS + 1), // 宽
  SIDE_H = W * ROWS + SPACE * (ROWS + 1), // 高
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

let data = Array.from({ length: COLUMNS }, () => Array(ROWS).fill(-1)), // 格子数据，空的为-1
  maxVal = 0; // 当前最大值（判断是否达到2048）

document.addEventListener('keydown', e => {
  const cb = keydownEvent[e.key];
  cb && execute(cb, data);
})

const execute = (cb, oldData) => {
  let newData = cb(oldData);
  if (newData.toString() === oldData.toString()) return
  data = newData;
  update();
}

// 移动时数字的移动和合并
// const move = list => {
//   let result = list.filter(item => item !== -1);
//   for (let i = result.length - 1; i > 0; i--) {
//     if (result[i] === result[i - 1]) {
//       maxVal = Math.max(maxVal, ++result[i]);
//       result.splice(--i, 1); 
//     }
//   }
//   return new Array(list.length - result.length).fill(-1).concat(result)
// }

const move = list => {
  let temp = [], isMerge = false;
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i] === -1) continue
    if (isMerge && list[i] === temp[0]) {
      temp[0]++;
      isMerge = false;
    } else {
      temp.unshift(list[i]);
      isMerge = true
    }
  }
  return new Array(list.length - result.length).fill(-1).concat(result)
}

// const convert2 = arr => {
//   let newArr = []
//   for (let y = 0; y < arr[0].length; y++) {
//     newArr[y] = []
//     for (let x = 0; x < arr.length; x++) {
//       newArr[y][x] = arr[x][y]
//     }
//   }
//   return newArr
// }

// let arr = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ]

// console.log(convert2(arr))
// console.log(convert2(arr))

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
  if (isWin()) return alert('你赢了')
  let {x, y} = getRandomFreePos(data);
  data[x][y] = 0;
  ctx.clearRect(0, 0, SIDE_W, SIDE_H);
  drawBoard();
  drawAllBlock(data);
  if (isLose()) return alert('你输了！')
}

const isWin = () => maxVal === VALUES.length - 1

const isLose = () => {
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < ROWS; j++) {
      // 游戏未结束条件：1.本身是空值 2.下方没有相同值 3.右侧没有相同值
      if (data[i][j] === -1 || (j < ROWS - 1 && data[i][j] === data[i][j + 1]) || (i < COLUMNS - 1 && data[i][j] === data[i + 1][j])) return false
    }
  }
  return true
}

const start = () => {
  for (let i = 0; i < 2; i++) {
    let {x, y} = getRandomFreePos(data);
    data[x][y] = 0;
  }
  drawBoard();
  drawAllBlock(data);
}

const drawDataBlock = (x, y, valIndex) => {
  const [dataVal, fillColor, fontSize] = [VALUES, VALUE_COLORS, FONT_SIZE].map(v => v[valIndex]);
  drawBlock(x, y, fillColor);
  ctx.font = `${fontSize}px serif`;
  ctx.fillStyle = valIndex < 2 ? FONT_GRAY : FONT_WHITE; // 值为2、4时，字体灰色；其他值字体都是白色
  const metrics = ctx.measureText(dataVal);
  const width = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  ctx.fillText(dataVal, x * (SPACE + W) + SPACE + (W - width) / 2, y * (SPACE + W) + SPACE + height + (W - height) / 2);
}

// 绘制格子（无论是否有值，打底）
const drawBaseBlock = data => data.forEach((row, x) => row.forEach((_, y) => drawBlock(x, y)))

// 绘制所有的格子
const drawAllBlock = data => data.forEach((row, x) => row.forEach((_, y) => {
  drawBlock(x, y);
  data[x][y] !== -1 && drawDataBlock(x, y, data[x][y]);
}))

// 绘制面板
const drawBoard = () => {
  ctx.fillStyle = '#AD9D8F';
  ctx.fillRect(0, 0, SIDE_W, SIDE_H);
}

const drawBlock = (x, y, fillColor = '#C2B4A5') => {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x * (SPACE + W) + SPACE, y * (SPACE + W) + SPACE, W, W);
}

// 随机获取空闲位置
const getRandomFreePos = data => {
  let freePos = [];
  data.forEach((row, x) => row.forEach((_, y) => data[x][y] === -1 && freePos.push({x, y})))
  return freePos[Math.floor(Math.random() * freePos.length)]
}

window.onload = start
