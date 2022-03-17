const fs = require('node:fs')

const creatureFiles = fs.readdirSync(__dirname)

module.exports = creatureFiles.filter(file => file != 'index.js').map(file => require(__dirname  + '/' +file))