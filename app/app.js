const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const router = require('./routes');

const mongoDB = 'mongodb://localhost/petterMaster';
mongoose.connect(mongoDB);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, colorize: true}));
app.use(morgan('combined'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const initRoutes = function () {
    app.use('/api', router());
};

initRoutes();

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
});

