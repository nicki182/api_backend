"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../utils/services");
const { UserServices, SessionUser, UserFind, UserDelete, SessionVerify, SessionOpen } = require('../../utils/services');
const encrypt = require('bcrypt-nodejs');
const mutations = {
    Mutation: {
        deleteUser: async (_, { name, token }) => {
            const Session = await SessionVerify(token);
            console.log(Session);
            if (Session) {
                UserDelete(name);
                return "Success";
            }
            else {
                return "error";
            }
        },
        registerUser: async (_, { name, country, email, password }) => {
            return UserServices(name, country, email, password);
        },
        logInUser: async (_, { name, password }) => {
            return UserFind(name, password);
        },
        logOutUser: async (_, { token }) => {
            return services_1.SessionDelete(token);
        },
    }
};
exports.default = mutations;
