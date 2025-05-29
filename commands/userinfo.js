const { SlashCommandBuilder } = require('discord.js');
const User = require('../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Show user profile')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to view (optional)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();

        const targetUser = interaction.options.getUser('user') || interaction.user;
        const userId = targetUser.id;

        try {
            let user = await User.findOne({ userId });

            if (!user) {
                user = await User.create({
                    userId,
                    username: targetUser.tag
                });
            }

            await interaction.editReply({
                content: `📋 User: ${user.username}\n🗓 Joined: ${user.joinDate.toDateString()}\n⚠️ Warnings: ${user.warnings}`
            });
        } catch (error) {
            console.error('❌ /userinfo error:', error);
            await interaction.editReply({ content: '❌ Failed to fetch user info.' });
        }
    }

};
