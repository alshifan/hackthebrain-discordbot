const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Discord bot is running.');
});

app.listen(port, () => {
    console.log(`Web server running on port ${port}`);
});

// ------------------------------------

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Load events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(console.error);

// Login bot
client.login(process.env.DISCORD_TOKEN);

// Handle commands
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    for (const command of client.commands.values()) {
        if (message.content.startsWith(`!${command.name}`)) {
            await command.execute(message);
        }
    }
});
