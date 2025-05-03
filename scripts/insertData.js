const mongoose = require('mongoose');
const ServerContent = require('../models/ServerContent.js');
require('dotenv').config();

const contents = [
    {
        key: 'about',
        title: '👋 About Hack the Brain',
        description: 'Hack the Brain is an IT hackathon focused on creativity, learning, and community.',
        fields: [
            { name: '🎯 Goal', value: 'Solve real-world problems with tech-driven solutions.' },
            { name: '🎓 Audience', value: 'Students, hobbyists, and developers from all backgrounds.' },
        ],
        footer: 'Let’s innovate together!'
    },
    {
        key: 'faq',
        title: '❓ Frequently Asked Questions',
        description: 'Here are answers to common questions.',
        fields: [
            { name: 'Is there a fee?', value: 'Nope! It’s completely free.' },
            { name: 'Do I need a team?', value: 'You can join solo or team up with others in the server!' }
        ],
        footer: 'Still have questions? Ask in #help-desk!'
    },
    {
        key: 'registration',
        title: '📝 Registration Details',
        description: 'Here’s how to sign up and confirm your spot.',
        fields: [
            { name: 'Register at:', value: '[hackthebrain.dev/register](https://hackthebrain.dev/register)' },
            { name: 'Deadline:', value: 'May 15, 2025' },
        ],
        footer: 'Make sure to register before the deadline!'
    },
    {
        key: 'socials',
        title: '🌐 Stay Connected',
        description: 'Follow us online to get the latest updates!',
        fields: [
            { name: 'Instagram', value: '[instagram.com/hackthebrain](https://instagram.com/hackthebrain)' },
            { name: 'Twitter', value: '[twitter.com/hackbrain_dev](https://twitter.com/hackbrain_dev)' },
        ],
        footer: 'Tag us with your builds!'
    },
    {
        key: 'welcome',
        title: '🎉 Welcome to Hack the Brain!',
        description: 'We’re so excited to have you here! Here’s what to do next:',
        fields: [
            { name: '✅ Step 1', value: 'Check out `#rules` and accept them' },
            { name: '🛠️ Step 2', value: 'Introduce yourself in `#introductions`' },
            { name: '📢 Step 3', value: 'Join a team or start your own!' }
        ],
        footer: 'We’re here to help — reach out anytime!'
    },
    {
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
        footer: 'Let’s build cool stuff and make this hackathon unforgettable! – Hack the Brain Team 🧠'
    }
];

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await ServerContent.deleteMany({ key: { $in: contents.map(c => c.key) } });
        await ServerContent.insertMany(contents);
        console.log('✅ All content inserted successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
