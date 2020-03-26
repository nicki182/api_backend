"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const monS = require('../mongodb/user_schema');
const auth = require('../../utils/authentication');
const query = {
    Query: {
        getUser: async (_, { name }) => {
            const User = await monS.findOne({ name }).exec();
            User.password = await auth.decodeToken(User.password);
            return User;
        }
    }
};
exports.default = query;
