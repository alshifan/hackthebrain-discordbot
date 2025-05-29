const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    title: String,
    description: String,
    fields: [
        {
            name: String,
            value: String,
            
        },
    ],
    color: { type: String, default: '#1c949d' },
});

module.exports = mongoose.model('ServerContent', contentSchema);
