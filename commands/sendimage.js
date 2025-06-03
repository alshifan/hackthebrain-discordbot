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
        const caption = interaction.options.getString('caption');

        const isDirectImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

        try {
            if (isDirectImage) {
                const messageOptions = caption
                    ? { content: caption, files: [url] }
                    : { files: [url] };
                await channel.send(messageOptions);
            } else {
                await channel.send({ content: `${caption ? caption + '\n' : ''}${url}` });
            }


            await interaction.reply({ content: '✅ Image sent!' });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ Failed to send image.', ephemeral: true });
        }
    }
};
