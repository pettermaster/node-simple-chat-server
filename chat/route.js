const express = require('express');
const router = express.Router();

const repository = require('./repository');

const routes = function() {
    router.post('/chat', addChatMessage);
    router.get('/chat', getChatMessages);
    router.get('/chat/:id', getChatMessage);
    router.get('/safeChat/:id', getSanitizedChatMessage)
    return router;
};

const addChatMessage = function(req, res) {
    const chatMessage = {
        author: req.body.author,
        content: req.body.content
    };
    repository.createChatMessage(chatMessage, function(statusCode, message) {
        if(statusCode === 200) {
            return res.status(200).json(message)
        }
        return res.status(statusCode).send();
    });
};

const getChatMessages = function(req, res) {
    repository.readChatMessages(function(statusCode, messages) {
        if(statusCode === 200) {
            return res.status(200).json(messages)
        }
        return res.status(statusCode).send();
    })
};


const getChatMessage = function(req, res) {
    repository.readChatMessage(req.params.id, function(statusCode, message) {
        if(statusCode === 200) {
            return res.status(200).json(message)
        }
        return res.status(statusCode).send();
    });
};

const getSanitizedChatMessage = function(req, res) {
    repository.readChatMessage(req.params.id, function(statusCode, message) {
        if(statusCode === 200) {
            const sanitizedMessage = sanitizeMessage(message);
            return res.status(200).json(sanitizedMessage);
        }
        return res.status(statusCode).send();
    });
};

const sanitizeMessage = function(message) {
    if(message.content.search(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/) !== -1){
        message.content = message.content.replace(/([^.@\s]+)(\.[^.@\s]+)*@([^.@\s]+\.)+([^.@\s]+)/, "");
    }
    return message;
};

module.exports = routes;