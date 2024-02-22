
const fs = require('fs-extra');
const { joinPath, showTable } = require('../utils');

async function list () {
  const list = await fs.readJSON(joinPath('data.json'));
  showTable(list);
}

module.exports = () => list()
