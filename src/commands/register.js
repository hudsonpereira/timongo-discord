const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers a new character')
        .addStringOption(option =>
            option.setName("name")
              .setDescription("Characters name")
              .setRequired(true)
          ),
	async execute(interaction) {

        const User = require('../models/User')
        // const row = new MessageActionRow()
		// 	.addComponents(
		// 		new MessageSelectMenu()
		// 			.setCustomId('select')
		// 			.setPlaceholder('Nothing selected')
		// 			.addOptions([
		// 				{
		// 					label: 'Select me',
		// 					description: 'This is a description',
		// 					value: 'first_option',
		// 				},
		// 				{
		// 					label: 'You can select me too',
		// 					description: 'This is also a description',
		// 					value: 'second_option',
		// 				},
		// 			]),
		// 	);
        let option = interaction.options.get("name")


        const user = await User.findOne({
            discord_id: interaction.member.id,
        })

        console.log(user)

        if (user) {
            await interaction.reply({ content: `You already have a character named **${user.name}**`, ephemeral: true });
            return
        }

        await User.create({
            name: option.value,
            discord_id: interaction.member.id
        })
        
		await interaction.reply({ content: `Welcome ${option.value}! The world is yours to conquer!.` });
	},
};