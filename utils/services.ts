import * as authToken from "./authentication"
const encrypt=require('bcrypt-nodejs')
const mongoUser=require('../data/mongodb/user_schema')
const {verifyToken,createTokenSession,decodeToken}=require('./authentication')
const mongoSession=require('../data/mongodb/session_schema')
import * as date from "moment"
import * as ts from "typescript/lib/tsserverlibrary";
import nullCancellationToken = ts.server.nullCancellationToken;
import {unix} from "moment";
    export async function UserServices(name: string, password: string, email: string, country: string){
            const salt =await encrypt.genSaltSync(10)
            const enc=await encrypt.hashSync(password, salt)
        const token=await createTokenSession(name,country,email,enc)
        const User_schema = new mongoUser({
            name: name,
            country: country,
            email: email,
            password: enc,
        })
        const Session_schema = new mongoSession({
            token: token,
            name: name

        })
       await Session_schema.save(Session_schema)
       await User_schema.save(User_schema);
        return token;
    };

    export async function  UserFind(name: string,password:string) {

        let user = await mongoUser.findOne({name: name}).exec()
        const pass=await encrypt.compareSync(password, user.password)
        if (user != null && pass) {
            const token = await createTokenSession(name,user.country,user.email,user.password)
            const Session_schema = new mongoSession({
                token: token,
                name: name

            })
            Session_schema.save(Session_schema)
            return token
        } else {
            return "verification error";
        }
    }
    export async function  UserDelete(name: string) {
       await mongoSession.deleteOne({name:name}).exec()
        await mongoUser.deleteOne({name:name}).exec()
    }
    export async function SessionDelete(token:string){
      await  mongoSession.deleteOne({token:token}).exec()
        return "sucess";
    }
    export async function SessionVerify(token: string):Promise<boolean>{
        const tok=await mongoSession.findOne({token},token).exec()
        const decode=await verifyToken(token)
        const current_time =await date().format();
        const exp=await date.unix(decode.exp).format()
        if(exp>current_time){
            return true;
        }
        else{
            return false;
        }
}