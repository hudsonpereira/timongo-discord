const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');
const User = require('../models/User');
const {hunt} = require('../features')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('hunt')
  .setDescription('Hunts a creature!'),
  async execute(interaction) {
    const user = await User.findOne({
      discord_id: interaction.member.id
    })

    const huntResume = await hunt.hunt(user, interaction.channel.id);

    if (huntResume.message != null) {
      interaction.reply(
          {embeds: [new MessageEmbed().setTitle(huntResume.message)]})
      return
    }

    console.log(huntResume)

    const embed = new MessageEmbed()
    .setColor(huntResume.victory ? '#00FF00' : '#FF0000')
    .setTitle(`${user.name} you found a ${huntResume.enemy}`)
    .setDescription(huntResume.combatLog.join('\n'))
    interaction.reply({embeds: [embed], ephemeral: true})
  },
};
