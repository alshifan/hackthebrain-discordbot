const { SlashCommandBuilder } = require('discord.js');
const createEmbed = require('../utils/createEmbed');
const ServerContent = require('../models/ServerContent');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Display server rules from the database'),

    async execute(interaction) {
        const rulesData = await ServerContent.findOne({ key: 'rules' });
        if (!rulesData) {
            return interaction.reply({ content: '⚠️ No rules found in the database.', ephemeral: true });
        }

        const embed = createEmbed(rulesData);
        await interaction.reply({ embeds: [embed] });
    }
};
