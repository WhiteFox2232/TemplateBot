const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    
    // Config SlashCommand
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('répond pong'),

	async execute(interaction, client) {

        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Pong !')

        // Log Console
        client.logger.log('info', `ping.js used by ${interaction.user.tag} (${interaction.user.id}) in #${interaction.channel.name} ( Server : ${interaction.guild.name} & ${interaction.guild.id})`);

        return interaction.reply({embeds: [embed]});


	},
};
