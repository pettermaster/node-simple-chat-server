var express = require('express');
var router = express.Router();
var chat = require('./chat');

module.exports = function () {
    router.get('/', function (req, res) {
        res.send('Api is running');
    });
    router.use('/', chat.routes());
    return router;
};