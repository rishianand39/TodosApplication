const express = require("express");
const bodyParser = require("body-parser");
const { ConnectWithDataBase } = require("./database/dbConnect");
const cors = require("cors");
const app = express();
const session = require("express-session");
ConnectWithDataBase();
require("dotenv").config();
var MongoDBStore = require("connect-mongodb-session")(session);
var store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

const userController = require("./controller/user.controller");
const taskController = require("./controller/task.controller");
const commentController = require("./controller/comment.controller");

//MIDDLEWARES
app.use(
  cors({
    credentials: true,
    origin: ['https://task-manager-rishi-anand.vercel.app', "http://localhost:3000"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
     
    },
    store: store,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json("Welcome to API Gateway");
});

app.use("/user", userController);
app.use("/task", taskController);
app.use("/comment", commentController);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port 8080`);
});

module.exports = app;
