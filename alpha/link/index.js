const W = 100,
  FOCUS_LINE_WIDTH = W / 12, // 选中时边框宽度
  BORDER = W / 2, // 预留连线的空间，至少大于 W / 2
  SPACE = 10,
  COL = 6, // 行列至少有一个为偶数，才能保证总数是偶数
  ROW = 6,
  SIDE_W = COL * (W + SPACE) + SPACE + BORDER * 2, // 宽
  SIDE_H = ROW * (W + SPACE) + SPACE + BORDER * 2, // 高
  VALUES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  VALUE_COLORS = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#B37FEB', '#FF85C0', '#36CFC9'],
  FOCUS_COLOR = '#00AEEC',
  BG_COLOR = '#F8BBD0';

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.style.cssText = 'position: absolute; inset: 0; margin: auto; cursor: pointer;';
canvas.width = SIDE_W;
canvas.height = SIDE_H;
document.body.appendChild(canvas);

document.body.style.backgroundColor = BG_COLOR;

let data = Array.from({ length: COL + 2 }, () => Array(ROW + 2).fill(-1)),
  s1 = { x: -1, y: -1 },
  s2 = { x: -1, y: -1 },
  steps = 0;

canvas.onclick = e => {
  let [x, y] = [e.offsetX, e.offsetY].map(p => Math.ceil((p - BORDER) / (W + SPACE)))
  if (e.offsetX - (x - 1) * (W + SPACE) - BORDER < SPACE) return;
  if (e.offsetY - (y - 1) * (W + SPACE) - BORDER < SPACE) return;
  if (data[x][y] === -1) return;
  // console.log(x, y)
  addFocus(x, y);
  let x1 = s1.x, y1 = s1.y;
  if (x1 === -1 && y1 === -1) {
    s1 = { x, y };
  } else {
    if (x1 === x && y1 === y) {
      s1 = { x: -1, y: -1 }
      clearFocus(x, y);
      return;
    }
    s2 = { x, y };
    if (check(s1, s2)) {
      data[x1][y1] = -1;
      data[x][y] = -1;
      s1 = { x: -1, y: -1 };
      s2 = { x: -1, y: -1 };
      steps++;
      paint();
      isWin() && alert('游戏结束，你赢了');
    } else {
      clearFocus(x1, y1);
      s1 = { x, y };
      s2 = { x: -1, y: -1 };
    }
  }
}

const isWin = () => steps * 2 === ROW * COL

const checkLine = (p1, p4) => {
  let { x: x1, y: y1 } = p1, { x: x4, y: y4 } = p4;
  if (x1 === x4) {
    if (y1 > y4) [y1, y4] = [y4, y1];
    return data[x1].slice(y1 + 1, y4).every(v => v === -1)
  } else if (y1 === y4) {
    if (x1 > x4) [x1, x4] = [x4, x1]
    return data.slice(x1 + 1, x4).every(row => row[y1] === -1)
  }
  return false
}

const checkAll = (p1, p4) => {
  let { x: x1, y: y1 } = p1, { x: x4, y: y4 } = p4;
  for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
    let i = 0, x2 = x1, y2 = y1, p2 = {}, p3 = {};
    while (data[x2 = x1 + dx * ++i]?.[y2 = y1 + dy * i] === -1) {
      p2 = { x: x2, y: y2 };
      p3 = dx === 0 ? { x: x4, y: y2 } : { x: x2, y: y4 };
      // 拐1次弯
      if ((p3.x === x4 && p3.y === y4) && checkLine(p2, p4)) return true
      // 拐2次弯
      if (data[p3.x][p3.y] === -1 && checkLine(p2, p3) && checkLine(p3, p4)) return true
    }
  }
  return false
}

const check = (p1, p4) => {
  if (data[p1.x][p1.y] !== data[p4.x][p4.y]) return false
  // 在同一条直线上
  if (checkLine(p1, p4)) return true;
  // 1次拐弯或2次拐弯
  return checkAll(p1, p4)
}

const addFocus = (x, y, focusColor = FOCUS_COLOR) => {
  let w = FOCUS_LINE_WIDTH;
  ctx.strokeStyle = focusColor;
  ctx.lineWidth = w;
  ctx.strokeRect(trans(x) + w / 2, trans(y) + w / 2, W - w, W - w);
}

const clearFocus = (x, y) => {
  drawBlock(x, y, data[x][y]);
}

const drawBoard = () => {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(BORDER, BORDER, SIDE_W - BORDER * 2, SIDE_H - BORDER * 2)
}

// 坐标转换
const trans = p => (p - 1) * (W + SPACE) + SPACE + BORDER

// 洗牌（打乱数组的顺序）
const shuffle = arr => arr.sort(() => Math.random() - 0.5)

const initData = () => {
  let arr = [], num = 0;
  for (let i = 0; i < ROW * COL / 2; i++) {
    num = i % VALUES.length;
    arr.push(num, num);
  }
  let randomArr = shuffle(arr);
  for (let x = 1; x < COL + 1; x++) {
    for (let y = 1; y < ROW + 1; y++) {
      data[x][y] = randomArr.pop();
    }
  }
}

const drawBlock = (x, y, valIndex, w = W) => {
  x = trans(x);
  y = trans(y);
  ctx.fillStyle = VALUE_COLORS[valIndex % VALUE_COLORS.length];
  ctx.fillRect(x, y, w, w);
  ctx.font = '40px serif'
  ctx.fillStyle = '#FFFFFF';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(VALUES[valIndex], x + w / 2, y + w / 2);
}

const paint = () => {
  ctx.clearRect(0, 0, SIDE_W, SIDE_H);
  drawBoard();
  data.forEach((col, x) => col.forEach((v, y) => v !== -1 && drawBlock(x, y, v)));
}

const start = async () => {
  initData();
  paint();
}

window.onload = start
