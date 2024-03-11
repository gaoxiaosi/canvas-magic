const SIZE = 15, // 棋盘15*15=225个点
  W = 50 , // 棋盘格子大小
  SL = W * (SIZE + 1), // 边长 = 棋盘宽高
  TOTAL_STEPS = SIZE * SIZE; // 总步数

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = canvas.height = SL; // 棋盘宽高 = 边长
canvas.style.cssText = 'position: absolute; inset: 0; margin: auto; cursor: pointer;';
document.body.appendChild(canvas);

// 记录棋盘的黑白棋，15*15的二维数组，初始值：-1，黑棋：1，白棋：2
let chess = Array.from({ length: SIZE }, () => Array(SIZE).fill(-1)),
  isBlack = true, // 黑棋先下
  moveSteps = 0; // 下棋步数

// 监听棋盘点击位置
canvas.onclick = e => {
  let [x, y] = [e.offsetX, e.offsetY].map(p => Math.round(p / W) - 1);
  if (chess[x]?.[y] !== -1) return alert('该位置不可落子！');
  drawPiece(x, y, isBlack);
  chess[x][y] = isBlack ? 1 : 2;
  isWin(x, y, chess[x][y], chess) ? alert(`${isBlack ? '黑' : '白'}棋赢了!`) :
    ++moveSteps === TOTAL_STEPS ? alert('游戏结束，平局！') : isBlack = !isBlack;
}

// 绘制棋盘（棋盘背景色 && 网格线）
const drawBoard = () => {
  ctx.fillStyle = '#E4A751';
  ctx.fillRect(0, 0, SL, SL);
  for (let i = 0; i < SIZE; i++) {
    drawLine(0, i, SIZE - 1, i);
    drawLine(i, 0, i, SIZE - 1);
  }
}

// 两点连线：(x1, y1) <-> (x2, y2)，设置线条宽度lineWidth和颜色LINE_COLOR
const drawLine = (x1, y1, x2, y2, lineWidth = 1, lineColor = '#000000') => {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  ctx.moveTo(x1 * W + W, y1 * W + W);
  ctx.lineTo(x2 * W + W, y2 * W + W);
  ctx.stroke();
}

// 绘制棋子，x、y为坐标，isBlack判断黑白棋
const drawPiece = (x, y, isBlack) => {
  ctx.beginPath();
  ctx.arc(x * W + W, y * W + W, W * 0.4, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = isBlack ? 'black' : 'white';
  ctx.fill();
}

// 判断游戏胜负，(x, y)当前下棋坐标，role：黑1白2，chess：棋盘数据，二维数组，黑1白2空位-1
const isWin = (x, y, role, chess) => {
  for (let [dx, dy] of [[1, 0], [0, 1], [1, 1], [1, -1]]) {
    let count = 1, i = 0, j = 0;
    while(count < 5 && chess[x + dx * ++i]?.[y + dy * i] === role) count++
    while(count < 5 && chess[x - dx * ++j]?.[y - dy * j] === role) count++
    if (count === 5) return true
  }
  return false
}

window.onload = drawBoard
