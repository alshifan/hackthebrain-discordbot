const { SlashCommandBuilder, ChannelType } = require('discord.js');
const ServerContent = require('../models/ServerContent');
const createEmbed = require('../utils/createEmbed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sendcontent')
        .setDescription('Admin only: Send stored content to a specific channel')
        .addStringOption(option =>
            option.setName('key')
                .setDescription('Key for content in MongoDB')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Target text channel')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)),

    async execute(interaction) {
        try {
            // Permissions check
            if (!interaction.member.permissions.has('Administrator')) {
                return interaction.reply({ content: '⛔ You must be an admin to use this.', ephemeral: true });
            }

            const key = interaction.options.getString('key');
            const channel = interaction.options.getChannel('channel');

            const content = await ServerContent.findOne({ key });
            if (!content) {
                return interaction.reply({ content: `📭 No content found for key \`${key}\`.`, ephemeral: true });
            }

            const embed = createEmbed(content);
            await channel.send({ embeds: [embed] });

            await interaction.reply({ content: `✅ Sent **${key}** content to ${channel}`, ephemeral: true });

        } catch (err) {
            console.error('❌ /sendcontent error:', err);
            await interaction.reply({ content: '❌ Failed to send content.', ephemeral: true });
        }
    }
};
