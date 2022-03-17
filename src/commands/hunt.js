const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, Integration } = require('discord.js');


const { create } = require('../models/User');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hunt')
		.setDescription('Hunts a creature!'),
	async execute(interaction) {
        const User = require('../models/User')
        const creatures = require('../creatures')()
        const user = await User.findOne({
            discord_id: interaction.member.id
        })

        if (user.hitpoints <= 0) {
            return await interaction.reply({ content: 'You are dead', ephemeral: true })
        }

        const mapCreatures = creatures.filter(creature => creature.mapId == interaction.channel.id)

        if (mapCreatures.length == 0) {
            return await interaction.reply({ content: 'No foe found at this map', ephemeral: true })
        }

        const creature = mapCreatures[Math.floor(Math.random()*mapCreatures.length)]

        const combatLog = []

        while (creature.hp > 0 && user.hitpoints > 0) {
            const userDamage = user.damage
            combatLog.push(`${user.name} caused ${userDamage}`)
            creature.hp -= userDamage

            if (creature.hp <= 0) break

            combatLog.push(`${creature.name} caused ${creature.attack} damage on you`)
            user.hitpoints -= creature.attack
        }

        var color = '#00ff00'
        //victory
        if (user.hitpoints > 0) {
            user.experience += creature.experience

            combatLog.push(`\n**You won! You got ${creature.experience} points of experience**`)
        } else {
            // :(
            color = '#ff0000';

            combatLog.push('**You died :(**')
        }

        await user.save()

        const embed = new MessageEmbed()
			.setColor(color)
			.setTitle(user.name)
			.setDescription(combatLog.join('\n'))
            .setThumbnail(interaction.member.displayAvatarURL())
            .setImage(interaction.member.displayAvatarURL())

		await interaction.reply({ ephemeral: true, embeds: [embed], ephemeral: true });
	},
};
