const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Integration } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Check your character\'s status!'),
		
	async execute(interaction) {

        const User = require('../models/User')

        const user = await User.findOne({
            discord_id: interaction.member.id
        })

        if (!user) {
            await interaction.reply('You dont seems to have an character registered yet! Use /register command')
            return;
        }

        var description = '';

        description += '**Vocação:** sem vocação\n\n'
        description += '**Level:** ' + user.level + '\n'
        description += '**Experience:** 0/100' + '\n'

        description += '**Strength:** 1' + '\n'
        description += '**Dexterity:** 1' + '\n'
        description += '**Constitution:** 1' + '\n'
        description += '**Intelligence:** 1' + '\n'
        description += '**Charism:** 1' + '\n\n'

        description += '**Gold:** 10 :Gold_Coin:' + '\n\n'

        description += '**Attribute Points:** 0' + '\n'
        description += '**Soul essences:** 9 :Spirit_Container:' + '\n\n'

        description += '**Hitpoints:** 15/25' + '\n'
        description += '**Mana:** 10/10' + '\n'
        description += '**Stamina:** 10/10' + '\n'

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(user.name)
			.setDescription(description)
            .setThumbnail(interaction.member.displayAvatarURL())
            .setImage(interaction.member.displayAvatarURL())

		await interaction.reply({ ephemeral: true, embeds: [embed]});
	},
};