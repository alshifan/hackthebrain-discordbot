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
        await interaction.deferReply(); // lets Discord know you're working

        const member = interaction.member;
        if (!hasPermission(member, 'Administrator')) {
            return interaction.editReply({ content: "⛔ You don't have permission to use this command." });
        }

        try {
            const key = interaction.options.getString('key');
            const content = await ServerContent.findOne({ key });

            if (!content) {
                return interaction.editReply({ content: '📭 No content found for that key.' });
            }

            const embed = createEmbed(content);
            await interaction.editReply({ embeds: [embed] });
        } catch (error) {
            console.error('❌ /getcontent error:', error);
            await interaction.editReply({ content: '❌ Something went wrong fetching the content.' });
        }
    }

};
