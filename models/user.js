const mongoose = require('mongoose');

//create the schema for users and export it 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String,
    },
    verified: {
        type: Number,
        default: 0
    },
    verificationCode: {
        type: String
    },
    resetCode: {
        type: String
    }
}, { timestamps: true });

var User = mongoose.model('User', userSchema);
module.exports.User = User;