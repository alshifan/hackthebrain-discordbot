// commands/ping.js
module.exports = {
    name: 'ping',
    description: 'Replies with Pong!',
    async execute(message) {
        if (message.content === '!ping') {
            await message.reply('🏓 Pong!');
        }
    }
};
// This command replies with "Pong!" when a user sends "!ping" in the chat
// It uses the message object to check the content of the message and reply accordingly  