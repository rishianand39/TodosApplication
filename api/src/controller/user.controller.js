const User = require("../models/user.model");
const router = require("express").Router();
const jwt = require('jsonwebtoken');

require("dotenv").config();

// ----------CREATE USER--------------//
router.post("/signup", async (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.status(200).json('Account created successfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

// ----------SIGNIN USER--------------//
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong credential");
    }
    if (req.body.password !== user.password) {
      return res.status(401).json("Wrong credentail");
    }

    const token = jwt?.sign({ userId: user._id }, process.env.JSON_SECRET_KEY); 
    return res.status(200).json({
        token: token,
        message : "Logged In successfully"
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
