/**
 * @class
 * @description canvas全局消息提醒
 */
class Msg {
  /**
   * @decription canvas全局消息提醒
   * @constructor
   * @param {Object} options 模态窗的配置参数
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
    msg = '',
    fontSize = 16,
    color = '#000000',
    bgColor = '#FFFFFF',
    delay = 30000
  }) {
    Object.assign(this, {
      msg,
      fontSize,
      color,
      bgColor,
      delay
    })

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.id = `mask-canvas-${new Date().getTime()}`;
    document.body.appendChild(this.canvas);
    this.open();
    setTimeout(() => this.close(), this.delay)
  }

  open() {
    this.ctx.font = `${this.fontSize}px serif`;
    const metrics = this.ctx.measureText(this.msg);
    this.canvas.height = (metrics.actualBoundingBoxDescent + metrics.actualBoundingBoxAscent) * 3;
    this.canvas.width = metrics.width * 1.2;
    this.canvas.style.cssText = `position: absolute; width: ${this.canvas.width}px; height: ${this.canvas.height}px; top: ${this.canvas.height / 2 + 15}px; left: 50%; transform: translate(-50%, -50%); z-index: 10000; box-shadow: 5px 5px 15px 0 #dcdcdc;`;
    this.ctx.fillStyle = this.bgColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.color;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `${this.fontSize}px serif`;
    this.ctx.fillText(this.msg, this.canvas.width / 2, this.canvas.height / 2);
  }

  // 关闭模态窗（移除DOM节点）
  close() {
    document.getElementById(this.canvas.id).remove();
  }
}

export default Msg;
