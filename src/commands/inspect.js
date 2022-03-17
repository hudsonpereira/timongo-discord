const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inspect')
		.setDescription('Inspect a player!')
		.addUserOption(option => option.setName('target').setDescription('The user').setRequired(true)),
	async execute(interaction) {
        const User = require('../models/User')

        let option = interaction.options.get("target")

        if (!option) {
            await interaction.reply('You should select a target to inspect')
            return
        }

        const user = await User.findOne({
            discord_id: option.user.id
        })

        if (!user) {
            await interaction.reply('User not found')
            return
        }

        var description = '';

        description += '**Vocação:** sem vocação\n\n'
        description += '**Level:** ' + user.level + '\n'
        description += '**Experience:** 0/100' + '\n'

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(user.name)
			.setDescription(description)

		await interaction.reply({ ephemeral: true, embeds: [embed]});
	},
};