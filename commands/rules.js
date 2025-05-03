const createEmbed = require('../utils/createEmbed');
const ServerContent = require('../models/ServerContent');

module.exports = {
    name: 'rules',
    description: 'Displays server rules from MongoDB',
    async execute(message) {
        const rulesData = await ServerContent.findOne({ key: 'rules' });
        if (!rulesData) return message.reply('⚠️ No rules found in the database.');

        const embed = createEmbed(rulesData);
        await message.channel.send({ embeds: [embed] });
    }
};
