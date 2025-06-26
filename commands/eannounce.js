const { SlashCommandBuilder, EmbedBuilder, ChannelType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eannounce')
        .setDescription('Send an embedded announcement to a channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the embed to')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Embed title')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Embed description')
                .setRequired(false)),


    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const title = interaction.options.getString('title');
        let description = interaction.options.getString('description');

        if (description) {
            description = description.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(description)
                .setColor(0x1c949d)
                .setTimestamp();
            await channel.send({ embeds: [embed] });
            return interaction.reply({ content: '✅ Embedded announcement sent!' });
        }

        const modalId = `eannounceModal-${interaction.id}`;
        const modal = new ModalBuilder()
            .setCustomId(modalId)
            .setTitle('Embedded Announcement');

        const descInput = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Description')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        modal.addComponents(new ActionRowBuilder().addComponents(descInput));

        interaction.client.modals.set(modalId, { channelId: channel.id, title });

        await interaction.showModal(modal);
    }
};
