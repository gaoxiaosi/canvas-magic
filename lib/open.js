const exec = require('child_process').exec;
const { chalkGreen } = require('../utils');

// 打开指定项目的指定版本，端口可选（后面项目太多的话可能会卡，开发时只打开一个项目即可）
function open(name, version, port = 5678) {
  exec(`parcel ${version}/${name}/index.html --no-cache -p ${port} --open`, err => {
    if (err) throw err
  })
  chalkGreen(`打开${name}的${version}版本，localhost:${port}`)
}

module.exports = (...args) => open(...args)