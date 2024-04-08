import Mask from '../../plugin/canvas-mask'

import img1 from './1.jpg'
import img2 from './2.jpg'
import img3 from './3.jpg'
import img4 from './4.jpg'
import img5 from './5.jpg'
import img6 from './6.jpg'
import img7 from './7.jpg'
import img8 from './8.jpg'
import img9 from './9.jpg'
import img10 from './10.jpg'
import img11 from './11.jpg'
import img12 from './12.jpg'
import img13 from './13.jpg'
import img14 from './14.jpg'
import img15 from './15.jpg'
import img16 from './16.jpg'
import img17 from './17.jpg'
import img18 from './18.jpg'
import img19 from './19.jpg'
import img20 from './20.jpg'

const getRow = (row, col) => (col % 2 && row % 2) ? row - 1 : row

const isMobile = () => window.innerWidth < 768

const DPR = window.devicePixelRatio || 1,
  W = isMobile() ? 60 : 100,
  LINE_WIDTH = W / 12, // 连线的宽度
  FOCUS_LINE_WIDTH = W / 12, // 选中时边框宽度
  BORDER = W / 2 + LINE_WIDTH, // 预留连线的空间，至少大于 W / 2
  SPACE = 10 / DPR,
  COL = Math.floor((window.innerWidth - BORDER * 2 - SPACE) / (W + SPACE)), // 行列至少有一个为偶数，才能保证总数是偶数
  ROW = getRow(Math.floor((window.innerHeight - BORDER * 2 - SPACE) / (W + SPACE)), COL),
  SIDE_W = COL * (W + SPACE) + SPACE + BORDER * 2, // 宽
  SIDE_H = ROW * (W + SPACE) + SPACE + BORDER * 2, // 高
  // VALUES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  // VALUES = ['./1.jpg', './2.jpg', './3.jpg', './4.jpg', './5.jpg', './6.jpg', './7.jpg', './8.jpg', './9.jpg', './10.jpg', './11.jpg', './12.jpg', './13.jpg', './14.jpg', './15.jpg', './16.jpg', './17.jpg', './18.jpg', './19.jpg', './20.jpg'],
  VALUES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20],
  VALUE_COLORS = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#B37FEB', '#FF85C0', '#36CFC9'],
  FOCUS_COLOR = '#00AEEC',
  LINE_COLOR = '#00AEEC',
  TITLE_FONT_COLOR = '#00AEEC',
  BG_COLOR = '#F8BBD0',
  CONNECT_DURATION = 369,
  SHOW_TIPS_DURATION = 10000,
  // MASK_COLOR = 'rgba(255, 192, 203, 0.75)';
  MASK_COLOR = '#F8BBD0';

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
const selectStyle = '-webkit-user-select: none; -moz-user-select: none; ms-user-select: none; user-select: none;'
canvas.style.cssText = 'position: absolute; inset: 0; margin: auto; cursor: pointer;' + selectStyle;
canvas.width = SIDE_W * DPR;
canvas.height = SIDE_H * DPR;
canvas.style.width = SIDE_W + 'px';
canvas.style.height = SIDE_H + 'px';
document.body.appendChild(canvas);

ctx.scale(DPR, DPR); // 解决移动端渲染时图片模糊的问题

document.body.style.backgroundColor = BG_COLOR;

let data = Array.from({ length: COL + 2 }, () => Array(ROW + 2).fill(-1)),
  p1 = { x: -1, y: -1 },
  p2 = { x: -1, y: -1 },
  p3 = { x: -1, y: -1 },
  p4 = { x: -1, y: -1 },
  t1 = { x: -1, y: -1 },
  t4 = { x: -1, y: -1 },
  steps = 0,
  timer = null,
  touchTimer = null,
  isAutoPlay = false,
  isOver = false,
  showTipsCount = 0, // 记录打乱数据的次数，避免出现死循环
  images = [], // 图片对象
  isLoadeds = new Array(VALUES.length).fill(false); // 记录图片是否加载完毕

document.addEventListener('keydown', e => e.key.toUpperCase() === 'A' && !isAutoPlay && autoPlay())

const autoPlay = async () => {
  isAutoPlay = true;
  p1 = t1;
  p4 = t4;
  let { x: x1, y: y1 } = p1, { x: x4, y: y4 } = p4
  addFocus(x1, y1);
  addFocus(x4, y4);
  drawLine();
  data[x1][y1] = -1;
  data[x4][y4] = -1;
  steps++;
  await sleep(CONNECT_DURATION);
  paint();
  isOver ? over() : autoPlay();
}

canvas.onclick = async e => {
  let [x, y] = [e.offsetX, e.offsetY].map(p => Math.ceil((p - BORDER) / (W + SPACE)))
  if (e.offsetX - (x - 1) * (W + SPACE) - BORDER < SPACE) return;
  if (e.offsetY - (y - 1) * (W + SPACE) - BORDER < SPACE) return;
  if (data[x][y] === -1) return;
  // console.log(x, y)
  addFocus(x, y);
  let x1 = p1.x, y1 = p1.y;
  if (x1 === -1 && y1 === -1) {
    p1 = { x, y };
  } else {
    if (x1 === x && y1 === y) {
      p1 = { x: -1, y: -1 }
      clearFocus(x, y)
      return;
    }
    p4 = { x, y };
    if (check(p1, p4)) {
      drawLine();
      data[x1][y1] = -1;
      data[x][y] = -1;
      p1 = { x: -1, y: -1 };
      p4 = { x: -1, y: -1 };
      steps++;
      await sleep(CONNECT_DURATION);
      paint();
      isOver && over();
    } else {
      clearFocus(x1, y1);
      p1 = { x, y };
      p4 = { x: -1, y: -1 };
    }
  }
}

const sleep = t => new Promise(resolve => setTimeout(resolve, t))

const isWin = () => steps * 2 === ROW * COL && (isOver = true)

const over = () => new Mask({
  onSuccess: restart,
  isFullScreen: true,
  textTitle: 'You Win!',
  successBtnText: 'Restart',
  cancelBtnText: 'Cancel',
  primaryColor: TITLE_FONT_COLOR,
  maskColor: MASK_COLOR,
  titleH: window.innerWidth * 0.15,
  titleBtnSpacing: window.innerHeight * 0.15,
  btnH: window.innerWidth * 0.08,
  btnPadding: window.innerWidth * 0.02,
  btnSpacing: window.innerWidth * 0.05
})

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
    let i = 0, x2 = x1, y2 = y1;
    while (data[x2 = x1 + dx * ++i]?.[y2 = y1 + dy * i] === -1) {
      p2 = { x: x2, y: y2 };
      p3 = dx === 0 ? { x: x4, y: y2 } : { x: x2, y: y4 };
      // 拐1次弯
      if (JSON.stringify(p3) === JSON.stringify(p4) && checkLine(p2, p4)) return true
      // 拐2次弯
      if (data[p3.x][p3.y] === -1 && checkLine(p2, p3) && checkLine(p3, p4)) return true
    }
  }
  return false
}

const check = (p1, p4) => {
  p2 = p1;
  p3 = p4;
  if (data[p1.x][p1.y] !== data[p4.x][p4.y]) return false
  // 在同一条直线上
  if (checkLine(p1, p4)) return true;
  // 1次拐弯或2次拐弯
  return checkAll(p1, p4)
}

const showTips = () => {
  if (showTipsCount++ > 1000) {
    alert('未知错误，请重新刷新页面');
    return true;
  }
  if (isOver) return false;
  let obj = {}
  data.forEach((col, x) => col.forEach((v, y) => {
    if (v === -1) return;
    obj[v] ? obj[v].push({ x, y }) : obj[v] = [{ x, y }]
  }))
  // console.log(obj)
  // console.log(Object.values(obj))
  for (let list of Object.values(obj)) {
    // console.log(list)
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        // console.log(list[i], list[j])
        if (check(list[i], list[j])) {
          t1 = list[i];
          t4 = list[j];
          return true
        }
      }
    }
  }
  return false;
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

// 如果无法连接，打乱数据，重新渲染视图
const shuffleData = () => {
  console.log('需要打乱数据'); //后面写一个公共的msg提示插件
  let arr = []
  for (let x = 1; x < COL + 1; x++) {
    for (let y = 1; y < ROW + 1; y++) {
      arr.push(data[x][y]);
    }
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
  if (isLoadeds[valIndex]) {
    ctx.strokeStyle = BG_COLOR;
    ctx.strokeRect(x, y, w, w); // 像素差，导致图片边缘可能有之前默认Rect遗留的颜色
    ctx.drawImage(images[valIndex], x, y, w, w);
  } else {
    ctx.fillStyle = VALUE_COLORS[valIndex % VALUE_COLORS.length];
    ctx.fillRect(x, y, w, w);
  }
}

// 多点连线：points = [{ x: 1, y: 1 }, { x: 1, y: 4 }, { x: 3, y: 4 }]，线条宽度lineWidth和颜色LINE_COLOR
const drawLine = (points = [p1, p2, p3, p4], lineWidth = LINE_WIDTH, lineColor = LINE_COLOR) => {
  if (JSON.stringify(p3) === JSON.stringify(p4)) points.splice(2, 1)
  if (JSON.stringify(p1) === JSON.stringify(p2)) points.splice(1, 1)
  points = points.map(p => ({ ...p, ox: 0.5, oy: 0.5 }));
  // console.log(points)
  const len = points.length;
  points[0].x === points[1].x ? points[0].oy = +(points[0].y < points[1].y) : points[0].ox = +(points[0].x < points[1].x)
  points[len - 1].x === points[len - 2].x ? points[len - 1].oy = +(points[len - 1].y < points[len - 2].y) : points[len - 1].ox = +(points[len - 1].x < points[len - 2].x)

  // points = points.map(({ x, y }) => ({ x: trans(x) + W * 0.5, y: trans(y) + W * 0.5 }))
  points = points.map(({ x, y, ox, oy }) => ({ x: trans(x) + W * ox, y: trans(y) + W * oy }))
  // console.log(points)
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.beginPath();
  let { x, y } = points.shift();
  ctx.moveTo(x, y);
  points.forEach(({ x, y }) => ctx.lineTo(x, y))
  ctx.stroke();
}

const paint = () => {
  /**
   * 每次重绘时要做的事
   * 1.清除之前设置的定时提示
   * 2.检测是否获胜：如果没有获胜，判断是否需要打乱顺序；开启定时提示
   * 3.绘制面板、标题、格子（无论是否获胜，都要绘制）
   */
  clearTimeout(timer);
  if (!isWin()) {
    showTipsCount = 0;
    while (!showTips()) shuffleData()
    timer = setTimeout(() => {
      addFocus(t1.x, t1.y, 'red');
      addFocus(t4.x, t4.y, 'red');
    }, SHOW_TIPS_DURATION);
  }
  ctx.clearRect(0, 0, SIDE_W, SIDE_H);
  drawBoard();
  data.forEach((col, x) => col.forEach((v, y) => v !== -1 && drawBlock(x, y, v)))
}

const restart = () => {
  p1 = { x: -1, y: -1 },
  p2 = { x: -1, y: -1 },
  p3 = { x: -1, y: -1 },
  p4 = { x: -1, y: -1 },
  t1 = { x: -1, y: -1 },
  t4 = { x: -1, y: -1 },
  steps = 0,
  timer = null,
  touchTimer = null,
  isAutoPlay = false,
  isOver = false,
  showTipsCount = 0, // 记录打乱数据的次数，避免出现死循环
  initData();
  paint();
}

const start = async () => {
  initData();
  VALUES.forEach((imgPath, index) => {
    if (isLoadeds[index]) return // 重新开始游戏时，如果已经加载过的图片不要再请求
    let img = new Image();
    img.src = imgPath;
    images[index] = img;
    img.onload = () => {
      isLoadeds[index] = true;
      data.forEach((col, x) => col.forEach((v, y) => v !== -1 && drawBlock(x, y, v)))
    }
  })
  paint();
}

window.onload = start
