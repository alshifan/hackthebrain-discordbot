const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eannounce')
        .setDescription('Send an embedded announcement to a channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the embed to')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Embed title')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Embed description')
                .setRequired(true)),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(0x1c949d)
            .setTimestamp();

        await channel.send({ embeds: [embed] });
        await interaction.reply({ content: '✅ Embedded announcement sent!', ephemeral: true });
    }
};
