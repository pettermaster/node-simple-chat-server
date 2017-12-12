const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userRepository = require('./../user/repository');

const routes = function() {
    router.post('/login', login);
    return router;
};

const login = function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if(username == null) {
        return res.status(422).json({message: 'Missing required field username'})
    }

    if(password == null) {
        return res.status(422).json({message: 'Missing required field password'})
    }

    userRepository.readUser(username, function(err, user) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }
        if (user === null) {
            return res.status(404).json({message: 'Wrong username or password'});
        }
        if(user.password !== password) {
            return res.status(404).json({message: 'Wrong username or password'});
        }
        return res.status(200).json(signJwt(user));
    });
};

const JWTSecret = 'secret';

const signJwt = function (user) {

    const refreshToken = jwt.sign({
        user: user
    }, JWTSecret, { expiresIn: 365 * 24 * 60 * 60 }); //DAYS HOURS MINUTES SECONDS

    const accessToken = jwt.sign(
        {
            user: user,
            role: user.role
        },
        JWTSecret,
        {
            algorithm: 'HS256',
            expiresIn: 10 * 24 * 60 * 60
        }
    );

    return {
        refresh_token: refreshToken,
        access_token: accessToken
    }
};



module.exports = routes;