const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    nickname: String,
    username: String,
    avatar: String,
    roles: [String],
    joinDate: { type: Date, default: Date.now },
    joinedServerAt: Date,
    warnings: { type: Number, default: 0 },
    activityScore: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
    lastMessage: String,
    lastMessageChannel: String,
    lastMessageTimestamp: Date,
    lastCommand: String,

});

module.exports = mongoose.model('User', userSchema);