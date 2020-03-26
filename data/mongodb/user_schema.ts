'use strict';
const mongoose=require('mongoose');
const User_schema=mongoose.Schema;
const userSchema = new User_schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    country: String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }
})
module.exports = mongoose.model('User', userSchema)
export default userSchema.methods;
