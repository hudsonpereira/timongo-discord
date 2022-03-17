const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed, Integration } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hunt')
		.setDescription('Hunts a creature!'),
	async execute(interaction) {
        const User = require('../models/User')

        const user = await User.findOne({
            discord_id: interaction.member.id
        })

        user.experience += 1;

        await user.save()

        await interaction.reply('ok')
	},
};