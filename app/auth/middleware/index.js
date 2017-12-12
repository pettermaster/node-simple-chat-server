const jwt = require('jsonwebtoken');
const roles = require('../../user').roles;

const authenticateRequest = function (req, res, next) {
    let token = req.get('Authorization');
    if(!token) {
        return res.status(401).json({message: 'No token provided'})
    }
    jwt.verify(token, 'secret', function (err, decoded) {
        if(err) {
            console.log(err);
            return res.status(401).json({message: 'Error decoding token'});
        }
        if(!req.data) req.data = {};
        req.data.decodedToken = decoded;
        next();
    });
};

const verifyAdmin = function (req, res, next) {
    if(req.data.decodedToken.role !== roles.ADMIN) {
        return res.status(403).send();
    }
    next();
};

module.exports = {
    verifyIsAuthenticated: authenticateRequest,
    verifyIsAdmin: verifyAdmin
};