const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { token, clientId, guildId } = require('../config.json');

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
	{
		name: 'register',
		description: 'Registers a new user!',
	},
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();