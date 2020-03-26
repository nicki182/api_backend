"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer } = require('apollo-server-hapi');
const typeDefs = require('../data/graphql/typedefs').default;
const resolvers = require('../data/graphql/resolvers').default;
const auth = require('../utils/authentication');
class Plugins {
    static async graphql(app) {
        try {
            const server = new ApolloServer({
                typeDefs,
                resolvers,
                debug: true,
                serverWillStart() {
                    console.log('Server starting up!');
                },
            });
            await server.applyMiddleware({ app });
            await server.installSubscriptionHandlers(app.listener);
        }
        catch (error) {
            console.log(`Plugins - Ups, something went wrong when registering graphql plugin: ${error.message}`);
        }
    }
}
exports.default = Plugins;
