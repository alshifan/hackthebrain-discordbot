const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: String,
    joinDate: { type: Date, default: Date.now },
    warnings: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a user in a Discord bot
// It includes fields for userId, username, joinDate, and warnings