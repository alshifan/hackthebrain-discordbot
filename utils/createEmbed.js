const { EmbedBuilder } = require('discord.js');

function createEmbed({ title, description, color = '#1c949d', footer, fields = [], timestamp = true, image }) {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);

    if (footer) {
        embed.setFooter({ text: footer });
    }

    if (timestamp !== false) {
        embed.setTimestamp();
    }

    if (image) {
        embed.setImage(image);
    }

    fields.forEach(field => {
        embed.addFields({ name: field.name, value: field.value });
    });

    return embed;
}

module.exports = createEmbed;
