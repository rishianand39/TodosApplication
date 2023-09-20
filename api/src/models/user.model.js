const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name : {type : String , reqired : true,},
    email : {type : String, required : true,},
    password  : {type  : String, required :true, minLength : 6, maxLength : 20}
},{
    timestamps : true,
    versionKey : false
})
const User = mongoose.model('user', UserSchema)
module.exports = User