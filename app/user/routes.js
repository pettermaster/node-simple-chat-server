const express = require('express');
const router = express.Router();

const repository = require('./repository');

const routes = function() {
    router.post('/users', addUser);
    return router;
};

const addUser = function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    if(!username) {
        return res.status(422).json({message: 'Missing required property username'});
    }
    if(!password) {
        return res.status(422).json({message: 'Missing required property password'});
    }

    const user = {
        username: req.body.username,
        password: req.body.password,
        isAdmin: isAdmin
    };
    repository.createUser(user, function(statusCode, user) {
        if(statusCode === 200) {
            return res.status(200).json(user)
        }
        return res.status(statusCode).send();
    });
};

module.exports = routes;