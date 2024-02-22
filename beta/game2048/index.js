const W = 125, // 格子宽度
  SPACE = 20, // 格子间隔
  ROWS = 4,
  COLUMNS = 4,
  SIDE_W = W * COLUMNS + SPACE * (COLUMNS + 1), // 宽
  SIDE_H = W * ROWS + SPACE * (ROWS + 1), // 高
  // VALUES = ['2', '4', '8', '16', '32', '64', '128', '256', '512', '1024', '2048'],
  VALUES = [
    './201.png',
    './202.png',
    './203.png',
    './204.png',
    './214.png'
  ],
  IMAGES = [],
  VALUE_COLORS = ['#EEE4DA', '#EDE0C8', '#EDA166', '#F08151', '#F1654D', '#F1462E', '#E8C65F', '#E8C34F', '#E8BE40', '#E8BB31', '#E8B724'],
  FONT_SIZE = [70, 70, 70, 60, 60, 60, 50, 50, 50, 50, 40],
  FONT_GRAY = '#645B52',
  FONT_WHITE = '#F7F4EF',
  DURATION = 256;

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = SIDE_W;
canvas.height = SIDE_H;
canvas.style.cssText = 'position: absolute; top: 0; left: 0; bottom: 0; right: 0; margin: auto;';
document.body.appendChild(canvas);

document.body.style.backgroundColor = '#F9F7EB'

let data = Array.from({ length: COLUMNS }, () => Array(ROWS).fill(-1)), // 格子数据，空的为-1
  maxVal = 0, // 当前最大值（判断是否达到2048）
  animationGroup = [], // 当前移动的方块（其实可以把那些start=end的抽出来，因为这些不用移动）
  moveIndex = -1; // 当前移动的是某一行或某一列

document.addEventListener('keydown', e => {
  const cb = keydownEvent[e.key];
  cb && execute(cb, data, e.key);
})

const execute = async (cb, oldData, diretion) => {
  animationGroup = [], moveIndex = -1;
  let newData = cb(oldData);
  if (newData.toString() === oldData.toString()) return
  data = newData;
  let animateId = await animate(animationGroup, diretion)
  cancelAnimationFrame(animateId)
  update();
}

const animate = (animationGroup, diretion, duration = DURATION) => new Promise(resolve => {
  const linear = (groups, ratio) => groups.map(({index, val, start, end}) => {
    const delta = (end - start) * ratio;
    if (diretion === 'ArrowUp') return { x: index, y: ROWS - 1 - start - delta, val }
    if (diretion === 'ArrowDown') return { x: index, y: start + delta, val }
    if (diretion === 'ArrowLeft') return { x: COLUMNS - 1 - start - delta, y: index, val }
    if (diretion === 'ArrowRight') return { x: start = start + delta, y: index, val }
  })

  let start = null, elapsed, activeGroups = [], animateId = null;
  const draw = timestamp => {
    if (!start) start = timestamp;
    ctx.clearRect(0, 0, SIDE_W, SIDE_H);
    drawBoard();
    drawBaseBlock(data);
    activeGroups.forEach(({x, y, val}) => drawDataBlock(x, y, val))
    elapsed = timestamp - start;
    if (elapsed < duration) { // 判断是否绘制完成
      activeGroups = linear(animationGroup, elapsed / duration);
      requestAnimationFrame(draw);
    } else { // 绘制完成
      resolve(animateId);
    }
  }
  animateId = requestAnimationFrame(draw);
})

const move = list => {
  moveIndex++;
  let temp = [], isMerge = false;
  for (let i = list.length - 1; i >= 0; i--) {
    if (list[i] === -1) continue
    if (isMerge && list[i] === temp[0]) {
      maxVal = Math.max(++temp[0], maxVal)
      isMerge = false;
    } else {
      temp.unshift(list[i]);
      isMerge = true;
    }
    animationGroup.push({ index: moveIndex, val: list[i], start: i, end: list.length - temp.length });
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
  if (isWin()) {
    console.log('你赢了')
  } else {
    let {x, y} = getRandomFreePos(data);
    data[x][y] = 0;
  }
  ctx.clearRect(0, 0, SIDE_W, SIDE_H);
  drawBoard();
  drawAllBlock(data);
  if (isLose()) console.log('你输了！')
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
  VALUES.forEach((src, index) => {
    let img = new Image();
    img.src = src;
    IMAGES[index] = img;
    img.onload = function () {
      console.log('onload');
      data.forEach((row, x) => row.forEach((_, y) => data[x][y] !== -1 && drawDataBlock(x, y, data[x][y])))
    }
  })
  drawBoard();
  drawAllBlock(data);
}

// const drawDataBlock = (x, y, valIndex) => {
//   const [dataVal, fillColor, fontSize] = [VALUES, VALUE_COLORS, FONT_SIZE].map(v => v[valIndex]);
//   drawBlock(x, y, fillColor);
//   ctx.font = `${fontSize}px serif`;
//   ctx.fillStyle = valIndex < 2 ? FONT_GRAY : FONT_WHITE; // 值为2、4时，字体灰色；其他值字体都是白色
//   const metrics = ctx.measureText(dataVal);
//   const width = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
//   const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
//   ctx.fillText(dataVal, x * (SPACE + W) + SPACE + (W - width) / 2, y * (SPACE + W) + SPACE + height + (W - height) / 2);
// }

// 绘制图片
const drawDataBlock = (x, y, valIndex) => {
  ctx.drawImage(IMAGES[valIndex], x * (SPACE + W) + SPACE, y * (SPACE + W) + SPACE, W, W)
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

// const transform = pos => pos * SPACE + pos * W + W

// 随机获取空闲位置
const getRandomFreePos = data => {
  let freePos = [];
  data.forEach((row, x) => row.forEach((_, y) => data[x][y] === -1 && freePos.push({x, y})))
  return freePos[Math.floor(Math.random() * freePos.length)]
}

window.onload = start
