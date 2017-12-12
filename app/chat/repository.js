const Models = require ('./model');
const mongoose = require('mongoose');


const createChat = function(users) {
    users.map(userId => mongoose.Types.ObjectId(userId))
    const chat = new Models.chatModel({
        users: users
    });
    return chat.save();
};

const readChats = function() {
    return Models.chatModel.find({});
};

const createChatMessage = async function(chatId, chatMessage) {
    console.log(chatMessage)
    const newMessage = new Models.chatMessageModel({
        author: chatMessage.author,
        text: chatMessage.text
    });

    try {
        const chat = await Models.chatModel.findById(chatId);
        chat.messages.push(newMessage);
        return chat.save();
    } catch (e) {
        throw e;
    }

};

module.exports = {
    createChat: createChat,
    readChats: readChats,
    createChatMessage: createChatMessage
}
