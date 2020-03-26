 'use strict'
const Plugins = require('./connections/plugins').default;
const Hapi=require('@hapi/hapi');
require('dotenv').config();
const {ApolloServer}=require('apollo-server')
class Server {
    public static async init(): Promise<any> {
        try {
            //conecto con mongodb
            const uri = 'mongodb://127.0.0.1:27017/first';
            const moongose = require("mongoose");
            moongose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex:true
            });
            //conecto con el servidor hapi
            const app = await new Hapi.server({
                host: 'localhost',
                port: 4001
            });
            //empiezo aplicacion
            await Plugins.graphql(app);

            const route=require('./connections/route')
            await app.route(route)
            await app.start();
            console.log('Server running on %s', app.info.uri);
        } catch (error) {
            console.error('here was something wrong:', error);
        }
    }
}
Server.init();