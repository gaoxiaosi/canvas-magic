import Mask from "../../plugin/canvas-mask.js";

const SIZE = 15, // 棋盘15*15=225个点
  BOARD_BG_COLOR = '#E4A751', // 棋盘背景颜色
  LINE_WIDTH = 1, // 默认线条宽度
  LINE_COLOR = '#000000', // 棋盘线颜色
  WIN_LINE_WIDTH = 5, // 获胜时连线的宽度
  WIN_LINE_COLOR = '#F05459', // 获胜线颜色
  RED_POINT_COLOR = '#F56C6C', // 红点颜色
  BLACK_CHESS_COLOR = '#000000', // 黑棋底黑
  BLACK_CHESS_TOP_COLOR = '#707070', // 黑棋顶灰，顶灰过渡到底黑+阴影=立体
  WHITE_CHESS_COLOR = '#D5D8DC',  // 白棋底灰
  WHITE_CHESS_TOP_COLOR = '#FFFFFF', // 白棋顶白，顶白过渡到底灰+阴影=立体
  PIECE_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)', // 棋子的阴影
  BOARD_SHADOW_COLOR = '#888888', // 棋盘的阴影
  BLACK_ROLE = 1, // 黑棋
  WHITE_ROLE = 2, // 白棋
  EMPTY_ROLE = -1, // 空
  TOTAL_STEPS = SIZE * SIZE; // 总步数

let W = Math.min(window.innerWidth, window.innerHeight) / (SIZE + 3) , // 棋盘格子大小
  SL = W * (SIZE + 1); // 边长 = 棋盘宽高

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = canvas.height = SL; // 棋盘宽高 = 边长
canvas.style.cssText = `position: absolute; inset: 0; margin: auto; box-shadow: 5px 5px 20px ${BOARD_SHADOW_COLOR}; cursor: pointer;`;
document.body.appendChild(canvas);

// document.body.style.backgroundColor = '#f5f3e1'

let regretBtn = document.createElement('button');
regretBtn.innerText = '悔棋';
regretBtn.style.cssText = 'display: block; position: absolute; left: 10px; top: 10px; padding: 15px 30px; font-size: 20px; cursor: pointer;'
// document.body.appendChild(regretBtn);

// 记录棋盘的黑白棋，15*15的二维数组，初始值：0，黑棋：1，白棋：2
let chess = Array.from({ length: SIZE }, () => Array(SIZE).fill(EMPTY_ROLE)),
  isBlack = true, // 黑棋先下
  moveSteps = 0, // 下棋步数
  steps = [];

regretBtn.onclick = e => {
  if (steps.length === 0) return;
  isBlack = !isBlack;
  moveSteps--;
  let {x, y} = steps.pop();
  chess[x][y] = EMPTY_ROLE;
  clearPiece(x, y);
  if (steps.length === 0) return;
  let lastStep = steps.at(-1);
  drawRedPoint(lastStep.x, lastStep.y);
}

// 监听棋盘点击位置
canvas.onclick = e => {
  let [x, y] = [e.offsetX, e.offsetY].map(p => Math.round(p / W) - 1);
  if (chess[x]?.[y] !== EMPTY_ROLE) return;
  if (steps.length > 0) {
    let {x, y, isBlack} = steps.at(-1)
    clearPiece(x, y);
    drawPiece(x, y, isBlack);
  };
  drawPiece(x, y, isBlack);
  drawRedPoint(x, y);
  steps.push({x, y, isBlack})
  chess[x][y] = isBlack ? BLACK_ROLE : WHITE_ROLE;
  isWin(x, y, chess[x][y], chess) ? over(`${isBlack ? '黑' : '白'}棋赢了!`) :
    ++moveSteps === TOTAL_STEPS ? over('游戏结束，平局！') : isBlack = !isBlack;
}

// 绘制棋盘（棋盘背景色 && 网格线）
const drawBoard = () => {
  ctx.fillStyle = BOARD_BG_COLOR;
  ctx.fillRect(0, 0, SL, SL);
  for (let i = 0; i < SIZE; i++) {
    drawLine(0, i, SIZE - 1, i);5
    drawLine(i, 0, i, SIZE - 1);
  }
}

// 两点连线：(x1, y1) - (x2, y2)，设置线条宽度lineWidth和颜色LINE_COLOR
const drawLine = (x1, y1, x2, y2, lineWidth = LINE_WIDTH, lineColor = LINE_COLOR) => {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  ctx.moveTo(x1 * W + W, y1 * W + W);
  ctx.lineTo(x2 * W + W, y2 * W + W);
  ctx.stroke();
}

// 绘制棋子
const drawPiece = (x, y, isBlack) => {
  ctx.save();
  ctx.beginPath();
  x = x * W + W;
  y = y * W + W;
  ctx.arc(x, y, W * 0.4, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.shadowColor = PIECE_SHADOW_COLOR;
  ctx.shadowOffsetX = ctx.shadowOffsetY = W * 0.06;
  ctx.shadowBlur = W * 0.04;
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, W * 0.4);
  gradient.addColorStop(0, isBlack ? BLACK_CHESS_TOP_COLOR : WHITE_CHESS_TOP_COLOR);
  gradient.addColorStop(1, isBlack ? BLACK_CHESS_COLOR : WHITE_CHESS_COLOR);
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.restore();
}

const clearPiece = (x, y) => {
  ctx.fillStyle = BOARD_BG_COLOR;
  ctx.fillRect(x * W + W / 2, y * W + W / 2, W, W);
  drawLine(x, y > 0 ? y - 0.5 : y, x, y < SIZE - 1 ? y + 0.5 : y);
  drawLine(x > 0 ? x - 0.5 : x, y, x < SIZE - 1 ? x + 0.5 : x, y);
}

const drawRedPoint = (x, y, r = 0.05 * W) => {
  ctx.beginPath();
  ctx.fillStyle = RED_POINT_COLOR;
  ctx.arc(x * W + W, y * W + W, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

// 重新开始
const restart = () => {
  ctx.clearRect(0, 0, SL, SL);
  drawBoard();
  chess = Array.from({ length: SIZE }, () => new Array(SIZE).fill(EMPTY_ROLE))
  isBlack = true;
  moveSteps = 0;
  steps = []
}

// 游戏结束，弹出提示
const over = textTitle => new Mask({canvas, onSuccess: restart, primaryColor: BOARD_BG_COLOR, textTitle})

// 判断游戏胜负，(x, y)当前下棋坐标，role：黑1白2，chess：棋盘信息
// const isWin = (x, y, role, chess) => {
//   for (let [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
//     let [count, i, j] = [1, 0, 0];  // count：连续同种颜色棋子数
//     // 判断：1、坐标是否越界 2、该位置的值是否一致（都是黑或白） 3、累计的次数是否达到5
//     while(count < 5 && chess[x + dx * ++i]?.[y + dy * i] === role) count++
//     while(count < 5 && chess[x - dx * ++j]?.[y - dy * j] === role) count++
//     if (count === 5) return i = 4 -j ,drawLine(x + dx * i, y + dy * i, x - dx * j, y - dy * j, WIN_LINE_WIDTH, WIN_LINE_COLOR), true
//   }
//   return false
// }

// 判断游戏胜负，(x, y)当前下棋坐标，role：黑1白2，chess：棋盘信息
const isWin = (x, y, role, chess) => [[1, 0], [0, 1], [1, 1], [1, -1]].some(([dx, dy]) => {
  let count = 1, i = 0, j = 0;
  while(count < 5 && chess[x + dx * ++i]?.[y + dy * i] === role) count++
  while(count < 5 && chess[x - dx * ++j]?.[y - dy * j] === role) count++
  return count === 5 && (i = 4 -j, drawLine(x + dx * i, y + dy * i, x - dx * j, y - dy * j, WIN_LINE_WIDTH, WIN_LINE_COLOR), true)
})

const debounce = (fn, delay) => {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  }
}

const handleResize = () => {
  ctx.clearRect(0, 0, SL, SL);
  W = Math.min(window.innerWidth, window.innerHeight) / (SIZE + 3);
  SL = W * (SIZE + 1);
  canvas.width = canvas.height = SL; // 棋盘宽高 = 边长
  drawBoard();
  steps.forEach(({x, y, isBlack}) => {
    drawPiece(x, y, isBlack)
  })
  if (steps.length > 0) {
    let { x, y } = steps.at(-1)
    drawRedPoint(x, y)
  }
}

window.onresize = debounce(handleResize, 512)

window.onload = drawBoard
