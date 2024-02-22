/**
 * @class
 * @description 在当前canvas之上覆盖一个大小位置都一样的canvas遮罩层
 */
class Mask {
  /**
   * @decription 在当前canvas之上覆盖一个大小位置都一样的canvas遮罩层
   * @constructor
   * @param {Object} options 模态窗的配置参数
   * @param {HTMLCanvasElement} options.canvas 原先的canvas对象
   * @param {Function} options.onSuccess 点击“成功“按钮，执行回调
   * @param {Function} options.onCancel 点击”取消“按钮，执行回调
   * @param {string} options.primaryColor 主题颜色，用于设置标题字体颜色，按钮颜色
   * @param {string} options.maskColor 遮罩层颜色，建议带透明度，如rgba(128, 128, 128, 0.6)
   * @param {string} options.btnTextColor 按钮字体颜色，默认白色
   * @param {string} options.textTitle 标题文本
   * @param {string} options.successBtnText 成功按钮的文本
   * @param {string} options.cancelBtnText 取消按钮的文本
   */
  constructor({
    canvas,
    onSuccess,
    onCancel,
    primaryColor = '#F56C6C',
    maskColor = 'rgba(128, 128, 128, 0.6)',
    btnTextColor = '#FFFFFF',
    textTitle = 'Game Over',
    successBtnText = 'Try Again',
    cancelBtnText = 'Cancel'
  }) {
    Object.assign(this, {
      onSuccess, // 点击“成功”按钮，关闭模态窗，执行回调
      onCancel, // 点击“取消”按钮，关闭模态窗，执行回调
      primaryColor, // 主题颜色，用于字体、按钮颜色等
      maskColor, // 遮罩层的颜色，默认半透明灰色
      btnTextColor, // 按钮字体颜色
      textTitle, // 模态窗的标题
      successBtnText, // 成功按钮的文本
      cancelBtnText, // 取消按钮的文本
      W: canvas.width, // 原canvas的宽，会创建一个临时的canvas覆盖在上面
      H: canvas.height, // canvas的高，会创建一个临时的canvas覆盖在上面
      titleH: 50, // 标题的高度（字体大小）
      titleBtnSpacing: 50, // 标题和按钮的间距
      btnH: 40, // 按钮高度（包含padding）
      btnPadding: 10, // 按钮的padding
      btnSpacing: 40 // 按钮间距
    })

    // 和原canvas大小位置都一样的新canvas
    const { top, left } = canvas.getBoundingClientRect();
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.id = `mask-canvas-${new Date().getTime()}`;
    this.canvas.width = this.W;
    this.canvas.height = this.H;
    this.canvas.style.cssText = `position: absolute; top: ${top}px; left: ${left}px; cursor: pointer;`;
    // 遮罩层Canvas和原Canvas为同级关系，所以添加到原Canvas后面，而不是document.body.appendChild(this.canvas)
    canvas.parentNode.appendChild(this.canvas)

    this.drawMask(); // 绘制遮罩层
    this.drawTitle(); // 绘制标题
    this.drawButtons(); // 绘制按钮，绑定遮罩层点击事件，判断是否点击到成功或取消按钮，执行相应回调
  }

  // 绘制遮罩层
  drawMask() {
    const { ctx, H, W, maskColor } = this;
    ctx.fillStyle = maskColor;
    ctx.fillRect(0, 0, W, H);
  }

  // 绘制标题
  drawTitle() {
    const { ctx, H, W, btnH, textTitle, titleH, titleBtnSpacing, primaryColor } = this;
    ctx.font = `${titleH}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = primaryColor;
    ctx.fillText(textTitle, W / 2, (H - titleH - titleBtnSpacing - btnH) / 2);
  }

  // 绘制按钮（并绑定点击事件）
  drawButtons() {
    const {
      canvas, ctx, H, W, btnTextColor, primaryColor, onSuccess, onCancel, titleH,
      titleBtnSpacing, successBtnText, cancelBtnText, btnH, btnPadding, btnSpacing,
    } = this;

    // 设置按钮样式（需提前设置字体大小，这样通过measureText方法计算文本内容的宽度）
    ctx.font = `${btnH - btnPadding * 2}px Arial`;
    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    const successBtnW = ctx.measureText(successBtnText).width + btnPadding * 2, // 成功按钮宽度，不含padding
      cancelBtnW = ctx.measureText(cancelBtnText).width + btnPadding * 2, // 取消按钮宽度，不含padding
      btnY = (H + titleH + titleBtnSpacing) / 2 - btnH / 2, // 按钮左上角纵坐标
      successBtnX = (W - successBtnW - cancelBtnW - btnSpacing) / 2, // 成功按钮左上角横坐标
      cancelBtnX = successBtnX + successBtnW + btnSpacing, // 取消按钮左上角横坐标
      successBtnRange = [successBtnX, btnY, successBtnX + successBtnW, btnY + btnH], // 成功按钮所占矩形范围（左上XY，右下XY）
      cancelBtnRange = [cancelBtnX, btnY, cancelBtnX + cancelBtnW, btnY + btnH]; // 取消按钮所占矩形范围（左上XY，右下XY）

    // 绘制成功和取消按钮
    ctx.fillStyle = primaryColor;
    ctx.fillRect(successBtnX, btnY, successBtnW, btnH);
    ctx.fillRect(cancelBtnX, btnY, cancelBtnW, btnH);
    ctx.fillStyle = btnTextColor;
    ctx.fillText(successBtnText, successBtnX + btnPadding, btnY + btnPadding);
    ctx.fillText(cancelBtnText, cancelBtnX + btnPadding, btnY + btnPadding);

    // 判断坐标是否在矩形（按钮）范围之内
    const isPointInRange = (x, y, [left, top, right, bottom]) => x >= left && x <= right && y >= top && y <= bottom

    // 监听点击事件，若点击到成功按钮，执行成功回调；若点击到取消按钮，执行取消回调。（只要点击到按钮都会关闭模态窗）
    canvas.onclick = e => [onSuccess, onCancel][[successBtnRange, cancelBtnRange].findIndex(range => isPointInRange(e.offsetX, e.offsetY, range) && (this.close(), true))]?.()
  }

  // 关闭模态窗（移除DOM节点）
  close() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this.canvas.onclick = null;
    document.getElementById(this.canvas.id).remove();
  }
}

export default Mask;
