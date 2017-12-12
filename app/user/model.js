const mongoose = require('mongoose');

const ref = 'User';

const roles = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

const UserSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    role: {
        type: String,
        enum: [roles.ADMIN, roles.USER],
        default: roles.USER
    },
    chats: [{type: mongoose.Schema.Types.ObjectId, ref: 'Chat'}]
});

module.exports = {
    model: mongoose.model(ref, UserSchema),
    ref: ref,
    roles: roles
}
