const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Check your character\'s status!'),
		
	async execute(interaction, client) {

        const User = require('../models/User')

        const user = await User.findOne({
            discord_id: interaction.member.id
        })

        if (!user) {
            await interaction.reply('You dont seems to have an character registered yet! Use /register command')
            return;
        }

        const goldEmoji = client.emojis.cache.find(emoji => emoji.name == 'Gold_Coin')

        var description = '';

        description += '**Vocação:** sem vocação\n\n'
        description += '**Level:** ' + user.level + '\n'
        description += '**Experience:** ' + user.experience + '/' + user.toNextLevel + '\n'

        description += '**Strength:** ' + user.strength + '\n'
        description += '**Dexterity:** ' + user.dexterity + '\n'
        description += '**Constitution:** ' + user.constitution + '\n'
        description += '**Intelligence:** ' + user.intelligence + '\n'
        description += '**Charism:** ' + user.charism + '\n\n'

        description += `**Gold:** ${user.gold} ${goldEmoji}` + '\n\n'

        description += '**Attribute Points:** ' + user.points + '\n'
        // description += '**Soul essences:** 9 \:Spirit_Container:' + '\n\n'

        description += `**Hitpoints:** ${user.hitpoints}/${user.maxHitpoints}` + '\n'
        description += `**Mana:** ${user.manapoints}/${user.maxManapoints}` + '\n'
        description += `**Eenrgy:** ${user.energy}/${user.maxEnergy}` + '\n'

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(user.name)
			.setDescription(description)
            .setThumbnail(interaction.member.displayAvatarURL())
            .setImage(interaction.member.displayAvatarURL())

		await interaction.reply({ ephemeral: true, embeds: [embed]});
	},
};