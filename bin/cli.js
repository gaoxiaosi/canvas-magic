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
  .description('启动项目')
  .arguments('projectName')
  .action((projectName) => {
    require('../lib/open')(projectName)
  })

program.command('list')
  .alias('l')
  .description('查看所有项目')
  .action(() => {
    require('../lib/list')()
  })

program.parse(process.argv);
