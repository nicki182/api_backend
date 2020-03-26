'use strict';
const user = require('../data/mongodb/user_schema');
module.exports = [
    {
        method: 'GET',
        path: '/untitled/collection',
        handler: async (request, h) => {
            try {
                const User = await user.find().exec();
                return h.response(User);
            }
            catch (error) {
                return h.response(error).code(500);
            }
        }
    }
];
