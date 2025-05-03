const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed')
        .setDescription('Send a sample embedded message'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('📣 Announcement')
            .setDescription('This is an embedded message!')
            .setColor(0x1c949d)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
