const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('replymessage')
        .setDescription('Reply to a specific message by message ID in a channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel containing the message')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message_id')
                .setDescription('ID of the message to reply to')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reply')
                .setDescription('The reply content')
                .setRequired(true)),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const messageId = interaction.options.getString('message_id');
        const replyContent = interaction.options.getString('reply');

        try {
            // Fetch the target message
            const targetMessage = await channel.messages.fetch(messageId);

            if (!targetMessage) {
                return interaction.reply({ content: '❌ Could not find that message.', ephemeral: true });
            }

            // Send the reply
            await targetMessage.reply(replyContent);

            await interaction.reply({ content: '✅ Replied to the message successfully!' });
        } catch (err) {
            console.error('❌ /replymessage error:', err);
            await interaction.reply({ content: '❌ Failed to reply to the message.', ephemeral: true });
        }
    }
};
