const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendimage')
        .setDescription('Send an image with optional caption to a channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The target channel')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Direct image URL')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('caption')
                .setDescription('Optional caption')
                .setRequired(false)),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const url = interaction.options.getString('url');
        const caption = interaction.options.getString('caption') || null;

        const isDirectImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

        try {
            if (isDirectImage) {
                await channel.send({ content: caption || null, files: [url] });
            } else {
                await channel.send({ content: `${caption ? caption + '\n' : ''}${url}` });
            }


            await interaction.reply({ content: '✅ Image sent!', ephemeral: true });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Failed to send image.', ephemeral: true });
        }
    }
};
