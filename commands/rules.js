const { SlashCommandBuilder } = require('discord.js');
const ServerContent = require('../models/ServerContent');
const createEmbed = require('../utils/createEmbed');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Displays server rules from MongoDB'),

    async execute(interaction) {
        try {
            console.log("✅ /rules triggered by", interaction.user.tag);
            await interaction.deferReply({ ephemeral: true });

            console.log("🔍 Mongo status:", mongoose.connection.readyState); // 1 = connected

            const rulesData = await ServerContent.findOne({ key: 'rules' });
            if (!rulesData) {
                console.warn('⚠️ No document found for key "rules"');
                return interaction.editReply({ content: '⚠️ No rules found in the database.' });
            }

            console.log("📦 rulesData:", JSON.stringify(rulesData, null, 2));

            const embed = createEmbed({
                title: rulesData.title,
                description: rulesData.description,
                color: rulesData.color,
                footer: rulesData.footer,
                fields: rulesData.fields ?? [] // fallback to empty array
            });

            await interaction.editReply({ embeds: [embed] });

        } catch (error) {
            console.error('❌ Error in /rules:', error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: '❌ Failed to display rules.', ephemeral: true });
            } else {
                await interaction.reply({ content: '❌ Failed to display rules.', ephemeral: true });
            }
        }
    }
};
