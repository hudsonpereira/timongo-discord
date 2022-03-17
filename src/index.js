require('dotenv').config()
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const { token } = require('../config.json');
require('./database')

const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	
	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;

	await interaction.update({ content: 'A button was clicked!', embeds: [], components: [] });
	// await interaction.reply({ content: 'you\'ve clicked a button, congratz!, id: ' + interaction.customId });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) {
		return;
	}
	const command = client.commands.get(interaction.message.interaction.commandName)
	await command.replyHandler(interaction)
});

client.login(token);
