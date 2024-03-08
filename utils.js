const path = require('path');
const chalk = require('chalk');

// 信息打印
const chalkGreen = msg => console.log(chalk.green(msg))
const chalkRed = msg => console.log(chalk.red(msg))

// 获取路径(根目录下的绝对路径)
const joinPath = filePath => path.join(__dirname, filePath)

module.exports = {
  chalkGreen,
  chalkRed,
  joinPath
}
