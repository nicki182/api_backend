'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const User_schema = mongoose.Schema;
const userSchema = new User_schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('User', userSchema);
exports.default = userSchema.methods;
