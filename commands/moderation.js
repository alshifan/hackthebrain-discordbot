const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('moderation')
        .setDescription('Kick or ban a user')
        .addSubcommand(sub =>
            sub.setName('kick')
                .setDescription('Kick a user')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to kick')
                        .setRequired(true)))
        .addSubcommand(sub =>
            sub.setName('ban')
                .setDescription('Ban a user')
                .addUserOption(option =>
                    option.setName('target')
                        .setDescription('User to ban')
                        .setRequired(true)))
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const user = interaction.options.getUser('target');
        const member = await interaction.guild.members.fetch(user.id);

        if (subcommand === 'kick') {
            await member.kick();
            await interaction.reply(`👢 Kicked ${user.tag}`);
        } else if (subcommand === 'ban') {
            await member.ban();
            await interaction.reply(`🔨 Banned ${user.tag}`);
        }
    }
};
