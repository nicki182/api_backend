'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const session_schema = mongoose.Schema;
const sessionSchema = new session_schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Session', sessionSchema);
exports.default = sessionSchema.methods;
