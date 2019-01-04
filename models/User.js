const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User',UserSchema);//user model ar userSchema ta pathalam User obj e

module.exports = User;