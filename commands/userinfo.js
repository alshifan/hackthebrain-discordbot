const { SlashCommandBuilder } = require('discord.js');
const User = require('../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Show or create your user profile'),

    async execute(interaction) {
        const userId = interaction.user.id;
        let user = await User.findOne({ userId });

        if (!user) {
            user = await User.create({
                userId,
                username: interaction.user.tag
            });
        }

        await interaction.reply(`📋 User: ${user.username}\n🗓 Joined: ${user.joinDate.toDateString()}\n⚠️ Warnings: ${user.warnings}`);
    }
};
