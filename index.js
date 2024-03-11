import dataList from './data.js'                 // 所有项目数据
import logo from './assets/logo.png'             // 网站Logo
import alphaIcon from './assets/alpha.png'       // 简单版icon
import standardIcon from './assets/standard.png' // 标准版icon
import betaIcon from './assets/beta.png'         // 测试版icon
import * as logos from './logo.js'               // 导入所有项目的Logo

const BG_COLOR = '#0E0E0E',  // 背景颜色
  PRIMARY_COLOR = '#1289FF', // 主题颜色
  TITLE_H = 80,              // 网站Logo+标题部分的高度
  TITEL = 'Canvas Magic',    // 标题
  TITLE_FONT_SIZE = 50,      // 标题字体大小
  RADIUS_SIZE = 8,           // 卡片的圆角
  CARD_COLOR = '#2C2C32',    // 卡片的颜色
  LOGO_W = 64,               // 卡片里logo的大小
  PADDING = 15,              // 卡片内部的padding
  W = 230,                   // 卡片的宽
  H = LOGO_W + PADDING * 2,  // 卡片的高
  SPACE = 25,                // 间距（通用，标题与第一行卡片、卡片与卡片）
  DEBOUNCE_DURATION = 256,   // 防抖延时时间
  MIN_COLUMN = 2,            // 最小列数（自适应），最小不可小于2，否则标题显示不全
  MAX_COLUMN = 2;            // 最多列数（自适应），项目暂时只有2个，为了居中暂设为2

// 根据页面宽度获取列数
const getColumn = () => {
  let col = Math.floor(window.innerWidth / (W + SPACE));
  return col < MIN_COLUMN ? MIN_COLUMN : 
    col > MAX_COLUMN ? MAX_COLUMN : col
}

let column = getColumn(),                    // 列数
  row = Math.ceil(dataList.length / column); // 行数

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.width = (W + SPACE) * column - SPACE;
canvas.height = TITLE_H + (H + SPACE) * row;
canvas.style.cssText = 'position: absolute; inset: 0; margin: auto;';
document.body.appendChild(canvas);

document.body.style.backgroundColor = BG_COLOR;

canvas.onclick = e => {
  let { type, curRow, curCol } = getType(e.offsetX, e.offsetY);
  type && window.open(`${type}/${dataList[curRow * column + curCol]['path']}`, '_blank')
}

/**
 * 思路：
 * 1.先确定行列，当前点击范围在哪个卡片
 * 2.判断是否点击到卡片中的3个按钮
 * 3.打开相应的页面
 * @description 获取当前点是否属于可以点击的模块（版本）
 * @param {String} x x坐标
 * @param {String} y y坐标
 * @returns {Object} type: 'alpha' || 'standard' || 'beta' || undefinded; curRow: Number, curCol: Number
 */
const getType = (x, y) => {
  let { curCol, curRow } = getPos(x, y);
  if (curCol < 0 || curRow < 0) return {};
  let curX = x - curCol * (W + SPACE), curY = y - TITLE_H - SPACE - curRow * (H + SPACE);
  let startY = PADDING + LOGO_W * 0.5, endY = PADDING + LOGO_W;
  let ranges = [
    [PADDING * 2 + LOGO_W,         PADDING * 2 + LOGO_W * 1.375, startY, endY],
    [PADDING * 3 + LOGO_W * 1.375, PADDING * 3 + LOGO_W * 1.75,  startY, endY],
    [PADDING * 4 + LOGO_W * 1.75,  PADDING * 4 + LOGO_W * 2.215, startY, endY]
  ]
  return {
    type: ['alpha', 'standard', 'beta'][ranges.findIndex(r => isPointInRange(curX, curY, r))],
    curRow,
    curCol
  }
}

// 判断坐标是否在某个范围之内
const isPointInRange = (x, y, [left, right, top, bottom]) => x >= left && x <= right && y >= top && y <= bottom

// 获取点击的位置所在的行列
const getPos = (x, y) => ({ curCol: Math.floor(x / (W + SPACE)), curRow: Math.floor((y - TITLE_H - SPACE) / (H + SPACE))})

const drawCard = (data, index) => {
  let curRow = Math.floor(index / column);
  let curCol = index % column;
  let x = curCol * (W + SPACE), y = TITLE_H + (H + SPACE) * curRow + SPACE;
  roundRect(x, y, W, H, 8, CARD_COLOR);
  let { name, path } = data;
  drawImage(logos[path], x + PADDING, y + PADDING, LOGO_W, LOGO_W);
  ctx.beginPath();
  ctx.font = `20px blod serif`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(name, x + PADDING * 2 + LOGO_W, y + PADDING);
  ctx.font = '16px blod serif';
  ctx.fillStyle = PRIMARY_COLOR;
  let w = LOGO_W * 0.375, h = LOGO_W * 0.5, startY = y + PADDING + LOGO_W * 0.5;
  drawImage(alphaIcon,    x + PADDING * 2 + LOGO_W,         startY, w, h);
  drawImage(standardIcon, x + PADDING * 3 + LOGO_W * 1.375, startY, w, h);
  drawImage(betaIcon,     x + PADDING * 4 + LOGO_W * 1.75,  startY, w, h);
}

const drawImage = (src, x, y, w, h) => {
  let img = new Image();
  img.src = src;
  img.onload = () => {
    ctx.drawImage(img, x, y, w, h);
  }
}

const drawTitle = () => {
  ctx.font = `${TITLE_FONT_SIZE}px blod serif`;
  let metrics = ctx.measureText(TITEL);
  let textWidth = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  let start = (canvas.width - TITLE_H - SPACE - textWidth) / 2;
  let img = new Image();
  img.src = logo;
  img.onload = () => {
    ctx.drawImage(img, start, 0, TITLE_H, TITLE_H);
  }
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left'
  ctx.fillStyle = PRIMARY_COLOR;
  ctx.fillText(TITEL, start + TITLE_H + SPACE, TITLE_H / 2)
}

const start = () => {
  drawTitle(); // 绘制Logo和标题
  dataList.forEach((data, index) => drawCard(data, index)); // 绘制卡片
}

// 圆角矩形
const roundRect = (x, y, w, h, r = RADIUS_SIZE, fillColor = 'white') => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
}

// 防抖
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
  let newColumn = getColumn();
  if (newColumn === column) return;
  column = newColumn;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  row = Math.ceil(dataList.length / column);
  canvas.width = (W + SPACE) * column - SPACE;
  canvas.height = TITLE_H + (H + SPACE) * row;
  start();
}

const handleMoveOnCanvas = e => canvas.style.cursor = getType(e.offsetX, y = e.offsetY)['type'] ? 'pointer' : 'auto'

window.onresize = debounce(handleResize, DEBOUNCE_DURATION)

canvas.onmousemove = debounce(handleMoveOnCanvas, 64)

window.onload = start
