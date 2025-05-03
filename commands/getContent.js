const { SlashCommandBuilder } = require('discord.js');
const createEmbed = require('../utils/createEmbed');
const ServerContent = require('../models/ServerContent');
const hasPermission = require('../utils/hasPermission');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('getcontent')
        .setDescription('Admin only: Display a custom embed from the database by key')
        .addStringOption(option =>
            option.setName('key')
                .setDescription('The content key (e.g., about, faq, etc.)')
                .setRequired(true)),

    async execute(interaction) {
        const member = interaction.member;
        if (!hasPermission(member, 'Administrator')) {
            return interaction.reply({ content: "⛔ You don't have permission to use this command.", ephemeral: true });
        }

        const key = interaction.options.getString('key');
        const content = await ServerContent.findOne({ key });

        if (!content) {
            return interaction.reply({ content: '📭 No content found for that key.', ephemeral: true });
        }

        const embed = createEmbed(content);
        await interaction.reply({ embeds: [embed] });
    }
};
