const fs = require('fs-extra');
const { chalkRed, joinPath, startServer } = require('../utils')

function open (projectName) {
  const projectPath = joinPath('case/' + projectName);
  fs.existsSync(projectPath) ? startServer(projectPath) : chalkRed(projectName + '：不存在！请确认名称再重新输入')
}

module.exports = (...args) => open(...args)
