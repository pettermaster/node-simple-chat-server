const mongoose = require('mongoose');

const userModule = require('../user');

const ChatMessageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModule.refs.user,
        required: [true, "Author must be provided"]
    },
    text: {
        type: String,
        required: [true, "Text must be provided"]
    }
});

const ChatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: userModule.refs.user
        }
    ],
    messages: {
        type: [ChatMessageSchema],
        default: []
    },
});

module.exports = {
    chatMessageModel: mongoose.model('ChatMessage', ChatMessageSchema),
    chatModel: mongoose.model('Chat', ChatSchema)
};