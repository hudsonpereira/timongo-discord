const fs = require('node:fs')
const {randomGenerate} = require("../helper/helper");

const creatureFiles = fs.readdirSync(__dirname)

const baseCreatures = creatureFiles.filter(file => file !== 'index.js')
.map(file => require(__dirname + '/' + file));

module.exports = () => {
  return baseCreatures.map(baseCreature => createCreature(baseCreature))
}

function createCreature(baseCreature) {
  return {
    name: baseCreature.name,
    attack: baseCreature.attack,
    defense: baseCreature.defense,
    hp: randomGenerate(baseCreature.hp),
    experience: randomGenerate(baseCreature.experience),
    mapId: baseCreature.mapId
  }
}
