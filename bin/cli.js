#!/usr/bin/env node
const program = require('commander');

program.command('create')
  .alias('c')
  .description('创建新的项目')
  .arguments('<filePath> <name>')
  .action((filePath, name) => {
    require('../lib/create')(filePath, name)
  })

program.command('open')
  .alias('o')
  .description('打开指定版本的小游戏')
  .arguments('<name> <version> [version]')
  .action((name, version, port) => {
    require('../lib/open')(name, version, port)
})

program.parse(process.argv);
