"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWT = require("jsonwebtoken");
//TODOS LAS FUNCIONES QUE SE REALIZAN CON WEB TOKENS
function createTokenSession(name, password, email, country) {
    const data = {
        name: name,
        password: password,
        email: email,
        country: country,
    };
    return JWT.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.WEB_TOKEN_DURATION });
}
exports.createTokenSession = createTokenSession;
function decodeToken(token) {
    return JWT.decode(token);
}
exports.decodeToken = decodeToken;
function verifyToken(token) {
    return JWT.verify(token, process.env.JWT_SECRET);
}
exports.verifyToken = verifyToken;
