const User = require ('./model');

const userModel = User.model;
const roles = User.roles;

const createUser = function(user, callback) {
    const newUser = new userModel({
        username: user.username,
        password: user.password,
        role: user.isAdmin
            ? roles.ADMIN
            : roles.USER
    });
    newUser.save(
        function(err, savedUser) {
            if(err) callback(500);
            callback(200, savedUser);
        }
    );
};

/***
 * @param username Unique username for user
 * @param callback
 */
const readUser = function(username, callback) {
    userModel.findOne({'username': username}, function(err, user) {
        if(err) callback(err, null);
        callback(null, user);
    })
};

module.exports = {
    createUser: createUser,
    readUser: readUser
}