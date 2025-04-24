const User = require('../models/user.js');

module.exports = {
    name: 'userinfo',
    description: 'Shows or creates user profile from MongoDB',
    async execute(message) {
        const userId = message.author.id;
        let user = await User.findOne({ userId });

        if (!user) {
            user = await User.create({
                userId,
                username: message.author.tag
            });
        }

        message.reply(`📋 User: ${user.username}\n🗓 Joined: ${user.joinDate.toDateString()}\n⚠️ Warnings: ${user.warnings}`);
    }
};
// This command retrieves or creates a user profile in MongoDB when a user sends "!userinfo" in the chat
// It uses the User model to find or create a user document and then replies with the user's information