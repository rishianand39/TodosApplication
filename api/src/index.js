const express = require("express");
const bodyParser = require("body-parser")
const { ConnectWithDataBase } = require("./database/dbConnect");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
ConnectWithDataBase()
require("dotenv").config();

const userController = require("./controller/user.controller")
const taskController = require("./controller/task.controller")



const allowedOrigins = [
  'http://localhost:3000',
  'https://task-manager-ra.vercel.app',
];

//MIDDLEWARES
app.use(cors({
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("Welcome to API Gateway");
});

app.use("/user", userController)
app.use('/task', taskController)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port 8080`);
  
});

module.exports = app