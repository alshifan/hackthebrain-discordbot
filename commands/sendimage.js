const { AttachmentBuilder, ChannelType } = require('discord.js');

module.exports = {
    name: 'sendimage',
    description: 'Send an image to a specific channel (admin/mod only)',

    async execute(message) {
        // Permissions check
        const isAuthorized = message.member.permissions.has('Administrator') || message.member.permissions.has('ManageMessages');
        if (!isAuthorized) {
            return message.reply("⛔ You don't have permission to use this command.");
        }

        const args = message.content.split(' ').slice(1);
        const channelMention = args[0];
        const imageUrl = args[1];
        const caption = args.slice(2).join(' ') || null;

        if (!channelMention || !imageUrl) {
            return message.reply('⚠️ Usage: `!sendimage #channel https://drive.google.com/file/d/1DZQQVfpQ5OK8-BHwCQD-3YnzPsvtmhIu/view?usp=drive_link Optional caption`');
        }

        const channelId = channelMention.replace(/[<#>]/g, '');
        const targetChannel = message.guild.channels.cache.get(channelId);

        if (!targetChannel || targetChannel.type !== ChannelType.GuildText) {
            return message.reply('⚠️ Invalid or missing text channel.');
        }

        try {
            await targetChannel.send({
                content: caption || null,
                files: [imageUrl]
            });

            await message.reply(`✅ Image sent to ${targetChannel}`);
            if (message.deletable) await message.delete(); // optional: clean up
        } catch (err) {
            console.error(err);
            await message.reply('❌ Failed to send image. Make sure the URL is correct.');
        }
    }
};
