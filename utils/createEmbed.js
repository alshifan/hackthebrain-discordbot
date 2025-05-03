const { EmbedBuilder } = require('discord.js');

function createEmbed({ title, description, color = '#1c949d', footer, fields = [] }) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color)
        .setTimestamp();

    if (footer) {
        embed.setFooter({ text: footer });
    }

    fields.forEach(field => {
        embed.addFields({ name: field.name, value: field.value });
    });

    return embed;
}

module.exports = createEmbed;
