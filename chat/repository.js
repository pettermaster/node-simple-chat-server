const ChatMessageModel = require ('./model').ChatMessageModel;

const createChatMessage = function(message, callback) {
    const chatMessage = new ChatMessageModel({
        author: message.author,
        content: message.content
    });
    chatMessage.save(
        function(err, savedMessage) {
            if(err) callback(500);
            callback(200, savedMessage);
        }
    );
};

const readChatMessages = function(callback) {
    ChatMessageModel.find({}, function(err, messages) {
        if(err) callback(500);
        callback(200, messages);
    })
};

const readChatMessage = function(id, callback) {
    ChatMessageModel.findOne({'_id': id}, function(err, message) {
        if(err) {
            callback(500);
            return;
        }
        if(message === null) {
            callback(404);
            return;
        }
        callback(200, message);
    })
}

module.exports = {
    createChatMessage: createChatMessage,
    readChatMessages: readChatMessages,
    readChatMessage: readChatMessage
}