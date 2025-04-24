const { EmbedBuilder } = require('discord.js');
const ServerContent = require('../models/ServerContent');

module.exports = {
    name: 'rules',
    description: 'Displays server rules from MongoDB',
    async execute(message) {
        const rulesData = await ServerContent.findOne({ key: 'rules' });

        if (!rulesData) {
            return message.reply('⚠️ No rules found in the database.');
        }

        const embed = new EmbedBuilder()
            .setTitle(rulesData.title)
            .setDescription(rulesData.description)
            .setColor(rulesData.color || '#1c949d')
            .setFooter({ text: rulesData.footer })
            .setTimestamp();

        for (const field of rulesData.fields) {
            embed.addFields({ name: field.name, value: field.value });
        }

        // Send to same channel or define a fixed one
        await message.channel.send({ embeds: [embed] });
    }
};
