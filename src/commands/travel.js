const {MessageActionRow, MessageSelectMenu, MessageEmbed} = require(
		'discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('travel')
	.setDescription('travel to another region'),

	async execute(interaction) {
		const row = new MessageActionRow()
		.addComponents(
				new MessageSelectMenu()
				.setCustomId('select')
				.setPlaceholder('Escolha aqui')
				.addOptions([
					{
						label: 'Cidade de Elrin',
						description: 'lvl. 1 | 5 gold - Capital da corrupão, e do reino...',
						value: 'cidade_de_elrin',
					},
					{
						label: 'Minas do Norte',
						description: 'lvl. 15 | 3 gold - Muito ouro já se ganhou e perdeu lá',
						value: 'minas_do_norte',
					},
				]),
		);
		const message = new MessageEmbed()

		.setTitle('Madame do bosque')
		.setDescription("Bora")
		.setImage(
				"https://24.media.tumblr.com/8bef625eae1b61e2eb7c180f4398a79a/tumblr_mzilfhpd1x1s4e9y0o1_500.jpg");

		await interaction.reply(
				{embeds: [message], components: [row], ephemeral: true});
	},

	async replyHandler(interaction) {
		if (interaction.values[0] === "cidade_de_elrin") {
			interaction.reply(
					"após algumas horas de estrada você chega ao seu destino")
		}
		if (interaction.values[0] === "minas_do_norte") {
			interaction.reply(
					"A carroça cai do desfiladeiro e você morre. FIM DE JOGO")
		}
	}
};
