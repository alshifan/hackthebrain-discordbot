// commands/embed.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Sends an embed',
    async execute(message) {
        if (message.content === '!embed') {
            const embed = new EmbedBuilder()
                .setTitle('📣 Announcement')
                .setDescription('This is an embedded message!')
                .setColor(0x000080)
                .setTimestamp();

            await message.channel.send({ embeds: [embed] });
        }
    }
};
// This command sends an embedded message when a user sends "!embed" in the chat
// It uses the EmbedBuilder class from discord.js to create a rich embed with a title, description, color, and timestamp