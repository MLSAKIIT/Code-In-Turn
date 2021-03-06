const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, //conform Password.
    email: {
        type: String,
        unique: true,
        lowercase: true,
        require: true
    }
}, { timestamps: true }, { collection: 'users' });

const User = new mongoose.model('User', userSchema);
module.exports = User;