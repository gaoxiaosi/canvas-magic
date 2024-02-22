const path = require('path');
const chalk = require('chalk');
const liveServer = require('live-server');
const Table = require('cli-table3');

// 信息打印
const chalkGreen = msg => console.log(chalk.green(msg))
const chalkRed = msg => console.log(chalk.red(msg))

// 获取路径(根目录下的绝对路径)
const joinPath = filePath => path.join(__dirname, filePath)

const startServer = rootPath => liveServer.start({
  root: rootPath,
  port: 8090,
  file: '/index.html',
  mount: [['/plugin', './plugin']]
})

const tableOption = {
  colAligns: ['center', 'center', 'center'],
  colWidths: [8, 24, 24],
  style: {
    border: ['10'],
    head : ['cyan', 'bold']
  },
  head: ['序号', '名称', '目录'],
  keys: ['id', 'name', 'path']
}
const showTable = (list) => {
  let table = new Table(tableOption);
  list.forEach(item => table.push(tableOption['keys'].map(key => chalk.green(item[key]))))
  console.log(table.toString());
}

module.exports = {
  chalkGreen,
  chalkRed,
  joinPath,
  startServer,
  showTable
}
