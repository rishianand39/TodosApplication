const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name : {type : String , reqired : true,},
    avatar : {type : String, required : false},
    avatarColor : {type : String, required : false},
    coverImage : {type : String, required : false},
    coverColor : {type : String, required : false},
    country : {type : String, required : false},
    city : {type : String, required : false},
    phone : {type : Number, required : false, maxLength:10},
    email : {type : String, required : true,},
    password  : {type  : String, required :true, minLength : 6, maxLength : 20}
},{
    timestamps : true,
    versionKey : false
})
const User = mongoose.model('user', UserSchema)
module.exports = User