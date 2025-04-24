// events/ready.js
module.exports = {
    name: 'ready',
    execute(client) {
        console.log(`✅ Bot is online as ${client.user.tag}`);
        client.user.setActivity('Hack the Brain 🚀', { type: 'WATCHING' });
    }
};
// This event runs when the bot is ready (after login)
// It sets the bot's activity to "Watching Hack the Brain 🚀"