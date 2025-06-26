const { SlashCommandBuilder, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Send a plain text announcement to a channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the announcement to')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message content')
                .setRequired(false)),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        let message = interaction.options.getString('message');

        if (message) {
            message = message.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
            message = message.replace(/^>>>?\s*/, '');
            await channel.send(message);
            return interaction.reply({ content: '✅ Announcement sent to channel!' });
        }

        const modalId = `announceModal-${interaction.id}`;
        const modal = new ModalBuilder()
            .setCustomId(modalId)
            .setTitle('Announcement Message');

        const input = new TextInputBuilder()
            .setCustomId('message')
            .setLabel('Message')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(input));

        interaction.client.modals.set(modalId, { channelId: channel.id });

        await interaction.showModal(modal);
    }

};
