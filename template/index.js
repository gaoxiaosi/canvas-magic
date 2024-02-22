import Mask from "../../plugin/canvas-mask.js";

/** @type {HTMLCanvasElement} */
let canvas = document.createElement('canvas'), ctx = canvas.getContext('2d');
canvas.style.cssText = 'position: absolute; inset: 0; margin: auto; cursor: pointer;';
document.body.appendChild(canvas);