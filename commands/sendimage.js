const { ChannelType, AttachmentBuilder } = require('discord.js');
const hasPermission = require('../utils/hasPermission');

module.exports = {
    name: 'sendimage',
    description: 'Send an image to a specific channel (admin/mod only)',

    async execute(message) {
        if (!hasPermission(message.member, 'Administrator', 'ManageMessages')) {
            return message.reply("⛔ You don't have permission to use this command.");
        }

        const args = message.content.split(' ').slice(1);
        const channelMention = args[0];
        const imageUrl = args[1];
        const caption = args.slice(2).join(' ') || null;

        if (!channelMention || !imageUrl) {
            return message.reply('⚠️ Usage: `!sendimage #channel <imageURL> Optional caption`');
        }

        const channelId = channelMention.replace(/[<#>]/g, '');
        const targetChannel = message.guild.channels.cache.get(channelId);

        if (!targetChannel || targetChannel.type !== ChannelType.GuildText) {
            return message.reply('⚠️ Invalid or missing text channel.');
        }

        try {
            // Check if URL ends with image extension
            const isDirectImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(imageUrl);

            if (isDirectImage) {
                await targetChannel.send({
                    content: caption || null,
                    files: [imageUrl]
                });
            } else {
                await targetChannel.send({
                    content: `${caption ? caption + '\n' : ''}${imageUrl}`
                });
            }

            await message.reply(`✅ Image sent to ${targetChannel}`);
            if (message.deletable) await message.delete();
        } catch (err) {
            console.error(err);
            await message.reply('❌ Failed to send image. Make sure the URL is correct.');
        }
    }
};
// This command allows an admin or mod to send an image to a specific channel.
// It checks for permissions, validates the channel and image URL, and sends the image.
// The command can be used with a caption and handles both direct image URLs and links.
// The command is structured to be easily integrated into a Discord bot using discord.js.
// It uses the ChannelType enum to ensure the target channel is a text channel.
// The command also includes error handling for invalid channels and image URLs.