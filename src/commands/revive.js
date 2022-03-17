const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('revive')
		.setDescription('Revive your character!'),

	async execute(interaction) {

        const User = require('../models/User')

        const user = await User.findOne({
            discord_id: interaction.member.id
        })


        user.hitpoints = user.maxHitpoints
        await user.save()

		const embed = new MessageEmbed()
			.setColor('#0000ff')
			.setTitle('You are alive again!')
			.setDescription('Better luck next time');

		await interaction.reply({ ephemeral: true, embeds: [embed] });
	},
};