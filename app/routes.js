var express = require('express');
var router = express.Router();

var chat = require('./chat');
var auth = require('./auth');
var user = require('./user');

module.exports = function () {
    router.get('/', function (req, res) {
        res.send('Api is running');
    });
    router.any
    router.use('/', auth.routes());
    router.use('/', user.routes());
    router.use('/', chat.routes());
    return router;
};