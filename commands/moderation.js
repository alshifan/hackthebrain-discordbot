// commands/moderation.js
module.exports = {
    name: 'moderation',
    description: 'Kick or ban members',
    async execute(message) {
        if (!message.member.permissions.has('KickMembers')) return;

        const args = message.content.split(' ');
        const command = args[0];
        const user = message.mentions.users.first();

        if (!user) return message.reply('You need to mention someone.');

        const member = message.guild.members.cache.get(user.id);

        if (command === '!kick') {
            await member.kick();
            message.channel.send(`👢 Kicked ${user.tag}`);
        } else if (command === '!ban') {
            await member.ban();
            message.channel.send(`🔨 Banned ${user.tag}`);
        }
    }
};
// // This command allows users with the "KickMembers" permission to kick or ban members from the server    