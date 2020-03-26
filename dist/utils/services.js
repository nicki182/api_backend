"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encrypt = require('bcrypt-nodejs');
const mongoUser = require('../data/mongodb/user_schema');
const { verifyToken, createTokenSession, decodeToken } = require('./authentication');
const mongoSession = require('../data/mongodb/session_schema');
const date = require("moment");
async function UserServices(name, password, email, country) {
    const salt = await encrypt.genSaltSync(10);
    const enc = await encrypt.hashSync(password, salt);
    const token = await createTokenSession(name, country, email, enc);
    const User_schema = new mongoUser({
        name: name,
        country: country,
        email: email,
        password: enc,
    });
    const Session_schema = new mongoSession({
        token: token,
        name: name
    });
    await Session_schema.save(Session_schema);
    await User_schema.save(User_schema);
    return token;
}
exports.UserServices = UserServices;
;
async function UserFind(name, password) {
    let user = await mongoUser.findOne({ name: name }).exec();
    const pass = await encrypt.compareSync(password, user.password);
    if (user != null && pass) {
        const token = await createTokenSession(name, user.country, user.email, user.password);
        const Session_schema = new mongoSession({
            token: token,
            name: name
        });
        Session_schema.save(Session_schema);
        return token;
    }
    else {
        return "verification error";
    }
}
exports.UserFind = UserFind;
async function UserDelete(name) {
    await mongoSession.deleteOne({ name: name }).exec();
    await mongoUser.deleteOne({ name: name }).exec();
}
exports.UserDelete = UserDelete;
async function SessionDelete(token) {
    await mongoSession.deleteOne({ token }, token).exec();
    return "sucess";
}
exports.SessionDelete = SessionDelete;
async function SessionVerify(token) {
    const tok = await mongoSession.findOne({ token }, token).exec();
    const decode = await verifyToken(token);
    const current_time = await date().format();
    const exp = await date.unix(decode.exp).format();
    if (exp > current_time) {
        return true;
    }
    else {
        return false;
    }
}
exports.SessionVerify = SessionVerify;
