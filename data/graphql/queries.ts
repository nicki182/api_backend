import {IResolvers} from "graphql-tools";
const monS=require('../mongodb/user_schema')
const auth=require('../../utils/authentication')
const query:IResolvers=
    {
        Query: {
            getUser:async (_,{name})=>{
                const User = await monS.findOne({name}).exec();
                User.password=await auth.decodeToken(User.password)
                return User;

            }
        }
    };
export default query;