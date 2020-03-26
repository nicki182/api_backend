import {IResolvers} from "graphql-tools";
import has = Reflect.has;
import {SessionDelete} from "../../utils/services";
const {UserServices,SessionUser,UserFind,UserDelete,SessionVerify,SessionOpen}=require('../../utils/services')
const encrypt=require('bcrypt-nodejs')

const mutations:IResolvers=
    {
        Mutation: {
            deleteUser: async (_, {name,token}) => {
                const Session=await SessionVerify(token)
                console.log(Session)
                if(Session) {
                    UserDelete(name);
                    return "Success"
                }
                else{
                    return "error";
                }
            },
            registerUser: async (_, {name,country,email, password}) => {
                return UserServices(name,country,email, password);
            },
            logInUser: async (_, {name,password}) => {
                return UserFind(name,password)
            },
            logOutUser: async (_, {token}) => {
             return SessionDelete(token)
            },
        }
    };
export default mutations;