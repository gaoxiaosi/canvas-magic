#!/usr/bin/env node
const program = require('commander');

program.command('create')
  .alias('c')
  .description('创建新的项目')
  .arguments('<filePath> <name>')
  .action((filePath, name) => {
    require('../lib/create')(filePath, name)
  })

program.parse(process.argv);
