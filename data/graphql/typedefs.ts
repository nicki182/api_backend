'use strict'
const {gql }=require('apollo-server-hapi')
const typeDefs = gql`
type Query{
          getUser(name:String):User
     }
    type Mutation{
    deleteUser(name:String,token:String):String
    registerUser(name:String,country:String,email:String,password:String):String
    logInUser(name:String,password:String):String
    logOutUser(token:String):String
    }
    type User{
    name:String
    country:String
    email:String 
    password:String
    token:String
    } `
;

export default typeDefs;