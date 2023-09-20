const express = require('express');
const { ConnectWithDataBase } = require('./database/dbConnect');
const app = express();
require('dotenv').config()

app.get("/", (req,res)=>{
    res.json("Welcome to API Gateway")
})

app.listen(process.env.PORT, async()=>{
    try {
        await ConnectWithDataBase()
        console.log(`Listening on port 8080`)
    } catch (error) {
        console.log("Database connection failed")
        console.log(error.message) 
    }
})