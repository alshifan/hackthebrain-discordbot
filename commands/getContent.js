const createEmbed = require('../utils/createEmbed');
const hasPermission = require('../utils/hasPermission');
const ServerContent = require('../models/ServerContent');

module.exports = {
    name: 'getcontent',
    description: 'Admin-only: Display a piece of embedded server content. Usage: !getcontent key',
    async execute(message) {
        if (!hasPermission(message.member, 'Administrator')) {
            return message.reply("⛔ You don't have permission to use this command.");
        }

        const args = message.content.split(' ').slice(1);
        const key = args[0];
        if (!key) return message.reply('⚠️ Please provide a content key.');

        const content = await ServerContent.findOne({ key });
        if (!content) return message.reply('📭 No content found for that key.');

        const embed = createEmbed(content);
        await message.channel.send({ embeds: [embed] });
    }
};
