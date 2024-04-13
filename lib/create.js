const fs = require('fs-extra');
const exec = require('child_process').exec;
const { chalkRed, chalkGreen, joinPath } = require('../utils');

function create(filePath, name) {
  const paths = ['alpha', 'standard', 'beta'].map(p => joinPath(p + '/' + filePath));
  if (fs.existsSync(paths[0])) return chalkRed(filePath + '：已存在！');
  paths.forEach(p => {
    fs.copySync(joinPath('template'), p);
    let indexFile = fs.readFileSync(p + '/index.html').toString().replace(/{{title}}/, name)
    fs.writeFileSync(p + '/index.html', indexFile);
  })
  chalkGreen(`${filePath}(${name})：创建成功！`);
  updateData(filePath, name);
  updateLogo(filePath, name);
  updateReadme(filePath, name);
  // updateVersion(); // 还是手动更新版本号吧，代码没有全部提交可能报错
  openFileByVSCode(`${paths[0]}/index.js`); // 默认还是注释掉吧，除非你的电脑配置了使用命令行code打开文件
}

// 更新data.js，将新增的项目加入其中
function updateData(filePath, name) {
  let dataStr = fs.readFileSync(joinPath('data.js'), 'utf-8'), data = [];
  const index = dataStr.indexOf('[');
  if (index !== -1) {
    data = JSON.parse(dataStr.slice(index))
  }
  data.push({ id: data.length + 1, name, path: filePath });
  let newData = 'export default ' + '[\n  ' + data.map(obj => JSON.stringify(obj, null, 1).replace(/\n/g, '').replace(/}/, " }")).join(',\n  ') + '\n]';
  fs.writeFileSync(joinPath('data.js'), newData, 'utf-8');
}

// 更新logo.js，将新增项目的logo加入并导出
function updateLogo(filePath) {
  let dataStr = fs.readFileSync(joinPath('logo.js'), 'utf-8');
  const newData = dataStr.replace('\nexport', "import " + filePath + " from './logo/" + filePath + ".png'" + "\n\nexport").replace('\n}', ',\n  ' + filePath + '\n}');
  fs.writeFileSync(joinPath('logo.js'), newData, 'utf-8');
}

// 更新README.md，将新增的项目加入其中
function updateReadme(filePath, name) {
  let readme = fs.readFileSync(joinPath('README.md')), site = 'https://gaoxiaosi.github.io/canvas-magic', source = 'https://github.com/gaoxiaosi/canvas-magic';
  readme += `\n|\`${filePath}\`|${name}|[简单](${site}/alpha/${filePath})、[标准](${site}/standard/${filePath})、[测试](${site}/beta/${filePath})|[简单](${source}/blob/main/alpha/${filePath}/index.js)、[标准](${source}/blob/main/standard/${filePath}/index.js)、[测试](${source}/blob/main/beta/${filePath}/index.js)| Todo | Todo |`
  fs.writeFileSync(joinPath('README.md'), readme);
}

// 版本号 + 0.0.1
function updateVersion() {
  exec('npm version patch', err => {
    if (err) throw err
  })
}

// 通过VSCode打开文件
function openFileByVSCode(file) {
  exec('code ' + file, err => {
    if (err) throw err
  })
}

module.exports = (...args) => create(...args)
