const { REST, Routes, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.warn(`[WARNING] The command at ${file} is missing "data" or "execute".`);
    }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`🔄 Refreshing ${commands.length} global slash commands...`);

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, 1363931696696791190),
            { body: commands },
        );

        console.log('✅ Successfully registered global commands.');
    } catch (error) {
        console.error(error);
    }
})();
