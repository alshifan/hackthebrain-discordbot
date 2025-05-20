const { SlashCommandBuilder } = require('discord.js');
const ServerContent = require('../models/ServerContent');
const createEmbed = require('../utils/createEmbed');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription('Displays server rules from MongoDB'),

    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true }); // ⏳ tells Discord: "I'm working on it"

            const rulesData = await ServerContent.findOne({ key: 'rules' });

            if (!rulesData) {
                console.warn('⚠️ No rules document found for key: rules');
                return await interaction.editReply({ content: '⚠️ No rules found in the database.' });
            }

            const embed = createEmbed(rulesData);
            await interaction.editReply({ embeds: [embed] }); // ✅ we reply safely now

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
// This code defines a Discord bot command that retrieves and displays server rules from a MongoDB database.    