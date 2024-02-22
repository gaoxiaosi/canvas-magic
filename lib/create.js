
const fs = require('fs-extra');
const exec = require('child_process').exec;
const { chalkRed, chalkGreen, joinPath, startServer } = require('../utils')

function create(filePath, name) {
  const paths = ['alpha', 'standard', 'beta'].map(p => joinPath(p + '/' + filePath));
  if (fs.existsSync(paths[0])) return chalkRed(filePath + '：已存在！');
  paths.forEach(p => {
    fs.copySync(joinPath('template'), p);
    let indexFile = fs.readFileSync(p + '/index.html').toString().replace(/{{title}}/, name)
    fs.writeFileSync(p + '/index.html', indexFile);
  })
  chalkGreen(`${filePath}(${name})：创建成功！`);
  startServer(paths[0]);
  updateDataJson(filePath, name);
  updateReadme(filePath, name);
  updateVersion();
  openFileByVSCode(`${paths[0]}/index.js`)
}

// 更新data.json，将新增的项目加入其中
function updateDataJson(filePath, name) {
  let data = fs.readJSONSync(joinPath('data.json'));
  data.push({ id: data.length + 1, name, path: filePath });
  fs.writeFileSync(joinPath('data.json'), '[\n  ' + data.map(obj => JSON.stringify(obj, null, 1).replace(/\n/g, '').replace(/}/, " }")).join(',\n  ') + '\n]');
}

// 更新README.md，将新增的项目加入其中
function updateReadme(filePath, name) {
  let readme = fs.readFileSync(joinPath('README.md'));
  readme += '\n- [ ] `' + filePath + '`：' + name + '[演示地址](https://gaoxiaosi.github.io/canvas-magic/' + filePath + ')';
  fs.writeFileSync(joinPath('README.md'), readme);
}

// 版本号 + 0.0.1
function updateVersion() {
  exec('npm version patch', err => {
    if (err) throw err
  })
}

// 通过VSCode打开文件
function openFileByVSCode (file) {
  exec('code ' + file, err => {
    if (err) throw err
  })
}

module.exports = (...args) => create(...args)
