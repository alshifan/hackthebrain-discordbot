const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB connection error:', err));


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();
client.modals = new Map();

// Load all slash commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`[WARNING] Slash command in ${file} is missing required "data" or "execute".`);
    }
}

// Listen for interactions (slash commands and modals)
client.on('interactionCreate', async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ There was an error executing this command.', ephemeral: true });
        }
    } else if (interaction.isModalSubmit()) {
        const data = client.modals.get(interaction.customId);
        if (!data) return;

        try {
            if (interaction.customId.startsWith('announceModal-')) {
                const channel = await interaction.guild.channels.fetch(data.channelId);
                let message = interaction.fields.getTextInputValue('message');
                message = message.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
                message = message.replace(/^>>>?\s*/, '');
                await channel.send(message);
                await interaction.reply({ content: '✅ Announcement sent to channel!' });
            } else if (interaction.customId.startsWith('eannounceModal-')) {
                const { channelId, title } = data;
                const channel = await interaction.guild.channels.fetch(channelId);
                let description = interaction.fields.getTextInputValue('description');
                description = description.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
                const embed = new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(description)
                    .setColor(0x1c949d)
                    .setTimestamp();
                await channel.send({ embeds: [embed] });
                await interaction.reply({ content: '✅ Embedded announcement sent!' });
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: '❌ There was an error executing this command.', ephemeral: true });
        } finally {
            client.modals.delete(interaction.customId);
        }
    }
});

// Bot is ready
client.once('ready', () => {
    console.log(`✅ Bot is online as ${client.user.tag}`);
    client.user.setActivity('Hack the Brain 🚀', { type: 'WATCHING' });
});

client.login(process.env.DISCORD_TOKEN);
