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
    }
];

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await ServerContent.deleteMany({ key: { $in: contents.map(c => c.key) } });
        await ServerContent.insertMany(contents);
        console.log('✅ Content inserted!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
// This script connects to MongoDB, deletes existing content with the same keys, and inserts new content into the ServerContent collection. It uses async/await for better readability and error handling.
// The contents array contains the new content to be inserted, each with a unique key, title, description, fields, and footer. The script uses Mongoose for database operations and dotenv for environment variable management.