const express = require('express');
const router = express.Router();

const auth = require('../auth');

const repository = require('./repository');

const routes = function() {
    router.get(
        '/chats',
        auth.middleware.verifyIsAuthenticated,
        getChats
    );
    router.post(
        '/chats',
        auth.middleware.verifyIsAuthenticated,
        addChat
    );
    router.post(
        '/chats/:chatId',
        auth.middleware.verifyIsAuthenticated,
        addChatMessage
    );
    router.get(
        '/chats/:chatId',
        auth.middleware.verifyIsAuthenticated,
        addChat
    );
    return router;
};

const addChat = async function (req, res) {
    const users = [];
    users.push(req.data.decodedToken.user._id);
    try {
        const result = await repository.createChat(users);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({error: e});
    }
};

const getChats = async function(req, res) {
    try{
        const result = await repository.readChats();
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).json({error: e});
    }
};

const addChatMessage = async function (req, res) {
    const chatId = req.params.chatId;
    const chatMessage = {
        text: req.body.text,
        author: req.data.decodedToken.user._id
    };
    try{
        const result = await repository.createChatMessage(chatId, chatMessage);
        return res.status(200).json(result);
    } catch (e) {
        return res.status(500).send(e);
    }
};

module.exports = routes;