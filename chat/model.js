var mongoose = require('mongoose');

var ChatMessageSchema = new mongoose.Schema({
    author: {type: String},
    content: {type: String}
});

module.exports = {
    ChatMessageModel: mongoose.model('ChatMessage', ChatMessageSchema)
}