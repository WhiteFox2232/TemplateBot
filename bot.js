const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const winston = require('winston');


const client = new Client({
	 intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] 
	});	

	client.logger = winston.createLogger({
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({ filename: 'console.log' })
		],
		format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] • ${log.message}`)
	});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', c => {
	client.logger.log('info', `Bot en ligne sous l'identité ${c.user.tag} (${c.user.id})`);
	client.user.setStatus('idle');
	client.user.setActivity('a Discord Bot', { type: 'PLAYING' });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Une erreur est survenue, vérifiez le code', ephemeral: true });
	}
});

client.login(token);

//           /\   /\   developed by WhiteFox
//          //\\_//\\     ____
//          \_     _/    /   /
//           / * * \    /^^^]
//           \_\O/_/    [   ]
//            /   \_    [   /
//            \     \_  /  /
//             [ [ /  \/ _/
//            _[ [ \  /_/
