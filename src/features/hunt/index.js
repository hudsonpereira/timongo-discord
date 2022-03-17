module.exports = {
  async hunt(user, locationName) {
    let huntResume = {
      message: null,
      combatLog: [],
      enemy: null
    }

    if (user.hitpoints <= 0) {
      huntResume.message = "You are dead"
      return huntResume;
    }

    const creatures = require('../../creatures')().filter(
        creature => creature.mapId === locationName)

    if (creatures.length === 0) {
      huntResume.message = "No foe found at this map"
      return huntResume;
    }

    const creature = creatures[Math.floor(
        Math.random() * creatures.length)]

    huntResume.enemy = creature.name

    while (creature.hp > 0 && user.hitpoints > 0) {
      console.log(`${creature.hp}  ${user.hitpoints}`)
      const userDamage = user.damage
      creature.hp -= userDamage
      huntResume.combatLog.push(`${user.name} caused ${userDamage}`)

      if (creature.hp <= 0) {
        break
      }

      huntResume.combatLog.push(
          `${creature.name} caused ${creature.attack} damage on you`)
      user.hitpoints -= creature.attack
    }

    if (user.hitpoints > 0) {
      user.experience += creature.experience

      huntResume.combatLog.push(
          `\n**You won! You got ${creature.experience} points of experience**`)
      huntResume.victory = true
    } else {
      huntResume.combatLog.push('**You died :(**')
      huntResume.victory = false
    }

    if (user.hitpoints < 0) {
      user.hitpoints = 0
    }

    await user.save()

    return huntResume

  }
}
