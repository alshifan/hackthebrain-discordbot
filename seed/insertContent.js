const mongoose = require('mongoose');
const ServerContent = require('../models/ServerContent.js');
require('dotenv').config();

const contents = [
    {
        key: 'about',
        title: '👋 About Hack the Brain',
        description: 'HackTheBrain is a dynamic hackathon initiative launched as part of the Google Developer Group and ComUnity Canada, aimed at bringing together a diverse community of change makers who are driven by a passion for real-world innovation. Founded in 2025, this event is not just for coders—it is for anyone with ideas and the drive to make them happen. This year, we are proud to be an official feature of Toronto Tech Week 2025—a premier innovation festival that draws national and international attention.',
        fields: [
            { name: '🎯 Mission', value: 'Foster collaboration, spark innovation, and empower individuals from all backgrounds to use their skills for social and technological impact.' },
            { name: '🎓 Audience', value: 'Whether you are a developer, designer, entrepreneur, strategist, or simply someone with a bold vision, HackTheBrain offers an inclusive space to team up, solve problems, and create meaningful solutions that address today’s corporate challenges. Participants will have the opportunity to collaborate across disciplines, push the boundaries of creativity, and transform ideas into action—all within a supportive and high-energy environment.' },
        ],
        footer: 'Let’s innovate together!'
    },
    {
        key: 'faq',
        title: '❓ Frequently Asked Questions',
        description: 'Here are answers to common questions.',
        fields: [
            { name: 'WHAT DO I NEED TO BRING?', value: 'A laptop and charger.' },
            { name: 'DO I NEED AN IDEA & A TEAM?', value: 'No, You can create your own team (teams of 5 MAX and teams of 3 MINIMUM) during the hackathon, and generate some amazing creations along the way. If you don&rsquot have a team, we will guide you on getting the team ready. You also dont need to worry about food, weve got you covered.' }
        ],
        footer: 'Still have questions? Ask in #ask-us-anything'
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
            { name: 'LinkedIn', value: '[linkedin.com/company/hackthebrain](https://linkedin.com/company/hackthebrain)' },
            { name: 'Website', value: '[www.hackthebraon.ca]' },
            { name: 'YouTube', value: '[youtube.com/hackthebrain](https://youtube.com/hackthebrain)' },
        ],
        footer: 'Tag us with your builds!'
    },
    {
        key: 'welcome',
        title: '🎉 Welcome to Hack the Brain!',
        description: 'We’re so excited to have you here! Here’s what to do next:',
        fields: [
            { name: '✅ Step 1', value: 'Check out `#rules` and accept them' },
            { name: '🛠️ Step 2', value: 'Introduce yourself in `#introduce-yourself' },
            { name: '📢 Step 3', value: 'Join a team or start your own through #find-your-team' }
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