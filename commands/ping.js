const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    
    // Config SlashCommand
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('répond pong'),

	async execute(interaction, client) {

        // Log Console
        client.logger.log('info', `stats.js used by ${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} ( Server : ${interaction.guild.name} & ${interaction.guild.id})`);

        await interaction.deferReply();
        await interaction.editReply('Pong !');


	},
};
