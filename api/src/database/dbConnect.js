const mongoose = require('mongoose')
require('dotenv').config()

const ConnectWithDataBase = ()=>{
  return  mongoose.connect(process.env.MONGO_URI)
}
module.exports = {ConnectWithDataBase}