const routes = require('./routes')
const userModel = require('./model')

module.exports = {
    routes: routes,
    refs: {
        user: userModel.ref
    },
    roles: userModel.roles
};