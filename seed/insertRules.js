// run.js or a one-time script
const mongoose = require('mongoose');
const ServerContent = require('./models/ServerContent');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
    await ServerContent.deleteOne({ key: 'rules' });

    await ServerContent.create({
        key: 'rules',
        title: '📜 Server Rules – Hack the Brain',
        description: 'Welcome to the official Hack the Brain Discord server!',
        fields: [
            { name: '👤 Be Respectful', value: 'No harassment, hate speech, or discrimination.' },
            { name: '💬 Use Appropriate Channels', value: 'Stay on topic and use the correct channels.' },
            { name: '📢 No Spamming or Self-Promotion', value: 'Avoid repeated messages and unrelated promos.' },
            { name: '👮 Follow Moderation Instructions', value: 'Mods and organizers keep things fair and safe.' },
            { name: '🛡️ Stay Safe & Professional', value: 'Don’t share personal or sensitive info.' },
            { name: '🤝 Collaborate, Don’t Compete', value: 'Encourage learning and helping each other.' },
            { name: '📆 Follow Event Instructions', value: 'Watch #announcements for schedules and updates.' }
        ],
        footer: 'Let’s build cool stuff and make this hackathon unforgettable! – Hack the Brain Team 🧠',
    });

    console.log('✅ Rules inserted to DB');
    process.exit();
});
