const { SlashCommandBuilder } = require('discord.js');
const User = require('../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Show MongoDB user profile')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to view (optional)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply(); // Public reply

        const targetUser = interaction.options.getUser('user') || interaction.user;
        const userId = targetUser.id;

        try {
            const member = await interaction.guild.members.fetch(userId);

            let user = await User.findOne({ userId });

            if (!user) {
                user = await User.create({
                    userId,
                    username: targetUser.tag,
                    nickname: member.nickname || null,
                    avatar: targetUser.displayAvatarURL(),
                    roles: member.roles.cache.map(role => role.name),
                    joinedServerAt: member.joinedAt
                });
            }

            await interaction.editReply({
                content: `📋 **User Info for ${user.username}**\n` +
                    `🧾 ID: ${user.userId}\n` +
                    `🧑 Nickname: ${user.nickname || 'N/A'}\n` +
                    `🧭 Joined Server: ${user.joinedServerAt?.toDateString() || 'Unknown'}\n` +
                    `🎭 Roles: ${user.roles?.join(', ') || 'None'}\n` +
                    `📊 Activity Score: ${user.activityScore || 0}\n` +
                    `⚠️ Warnings: ${user.warnings}\n` +
                    `💬 Last Message: ${user.lastMessage || 'N/A'}\n` +
                    `📺 Last Message Channel: ${user.lastMessageChannel || 'N/A'}\n` +
                    `🕒 Last Active: ${user.lastActive ? new Date(user.lastActive).toLocaleString() : 'N/A'}\n` +
                    `📅 Last Command: ${user.lastCommand || 'N/A'}`
            });
        } catch (error) {
            console.error('❌ /userinfo error:', error);
            await interaction.editReply({ content: '❌ Failed to fetch user info.' });
        }
    }
};
