// commands/embed.js
const createEmbed = require('../utils/createEmbed');

module.exports = {
    name: 'embed',
    description: 'Sends an embed',
    async execute(message) {
        if (message.content === '!embed') {
            const embed = createEmbed({
                title: '📣 Announcement',
                description: 'This is an embedded message!'
            });

            await message.channel.send({ embeds: [embed] });
        }
    }
};
