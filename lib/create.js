
const fs = require('fs-extra');
const exec = require('child_process').exec;
const { chalkRed, chalkGreen, joinPath } = require('../utils')

function create(filePath, name) {
  const paths = ['alpha', 'standard', 'beta'].map(p => joinPath(p + '/' + filePath));
  if (fs.existsSync(paths[0])) return chalkRed(filePath + '：已存在！');
  paths.forEach(p => {
    fs.copySync(joinPath('template'), p);
    let indexFile = fs.readFileSync(p + '/index.html').toString().replace(/{{title}}/, name)
    fs.writeFileSync(p + '/index.html', indexFile);
  })
  chalkGreen(`${filePath}(${name})：创建成功！`);
  // startServer(filePath);
  updateDataJson(filePath, name);
  updateReadme(filePath, name);
  updateVersion();
  openFileByVSCode(`${paths[0]}/index.js`)
}

// 开启服务，在浏览器中打开alpha/项目名/index.html
function startServer (filePath) {
  exec(`npm run start /alpha/${filePath}/index.html`, err => {
    if (err) throw err
  })
  chalkGreen(`服务已开启:localhost:1234`)
}

// 更新data.json，将新增的项目加入其中
function updateDataJson(filePath, name) {
  let data = fs.readJSONSync(joinPath('data.json'));
  data.push({ id: data.length + 1, name, path: filePath });
  fs.writeFileSync(joinPath('data.json'), '[\n  ' + data.map(obj => JSON.stringify(obj, null, 1).replace(/\n/g, '').replace(/}/, " }")).join(',\n  ') + '\n]');
}

// 更新README.md，将新增的项目加入其中
function updateReadme(filePath, name) {
  let readme = fs.readFileSync(joinPath('README.md')), site = 'https://gaoxiaosi.github.io/canvas-magic';
  let tableItem = `\n|\`${filePath}|${name}\`|[简单版](${site}/alpha/${filePath}/index.html)、[标准版](${site}/standard/${filePath}/index.html)、[测试版](${site}/beta/${filePath}/index.html)|[简单版](${site}/tree/main/alpha/${filePath})、[标准版](${site}/tree/main/standard/${filePath})、[测试版](${site}/tree/main/beta/${filePath})| Todo | Todo |`
  readme += tableItem;
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
