const { EmbedBuilder } = require('discord.js');
const ServerContent = require('../models/ServerContent');

module.exports = {
    name: 'getcontent',
    description: 'Display a piece of embedded server content. Usage: !getcontent key',
    async execute(message) {
        const args = message.content.split(' ').slice(1);
        const key = args[0];

        if (!key) return message.reply('⚠️ Please provide a content key (e.g., `!getcontent about`).');

        const content = await ServerContent.findOne({ key });

        if (!content) {
            return message.reply('📭 No content found for that key.');
        }

        const embed = new EmbedBuilder()
            .setTitle(content.title)
            .setDescription(content.description)
            .setColor(content.color || '#1c949d')
            .setFooter({ text: content.footer })

        if (content.fields?.length) {
            content.fields.forEach(field => {
                embed.addFields({ name: field.name, value: field.value });
            });
        }

        await message.channel.send({ embeds: [embed] });
    }
};
