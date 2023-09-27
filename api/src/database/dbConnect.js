const mongoose = require("mongoose");
require("dotenv").config();

const ConnectWithDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to MongoDB successfully")
    
  } catch (error) {
    console.log("Database connection failed");
    console.log(error.message);
  }
}
module.exports = { ConnectWithDataBase };
