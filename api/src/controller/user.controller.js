const User = require("../models/user.model");
const mongoose = require("mongoose")
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const authenticateToken = require("../middlewares/tokenAuthenticator");

require("dotenv").config();

// ----------CREATE USER--------------//
router.post("/signup", async (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    let userExistWithComingEmail = await User.findOne({
      email: req.body.email,
    });
    if (userExistWithComingEmail) {
      return res.status(400).json("User Already exist with this email Id");
    }
    const savedUser = await newUser.save();
    res.status(200).json("Account created successfully");
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

    const token = jwt?.sign({ userId: user._id }, process.env.JSON_SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    return res.status(200).json({
      user,  
      token: token,
      message: "Logged In successfully",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ------------ RESET PASSWORD------------//
router.patch("/resetpassword", async (req, res) => {
  try {
    const user = await User.updateOne(
      { email: req.body.email },
      { $set: { password: req.body.password } }
    );
    if (user.modifiedCount === 0) {
      return res.status(401).json("Email doesn't exist in our database");
    }

    return res.status(200).json("Password reset successful");
  } catch (error) {
    res.status(400).json(error);
  }
});

// ------------ UPDATE PROFILE------------//
router.patch("/update/:userid", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userid)) {
        return res.status(400).json("Invalid user ID");
      }
    const existingUser = await User.findById(req.params.userid);
    if (!existingUser) {
      return res.status(404).json("User not found");
    }

    const result = await User.updateOne({ _id: req.params.userid }, req.body);

    if(result.modifiedCount === 1){
        return res.status(200).json("User updated successfully")
    }else{
        return res.status(400).json('User update failed')
    }

  } catch (error) {
    res.status(400).json(error);
  }
});

// -------------- DELETE ACCOUNT--------------//
router.delete("/delete", async (req, res) => {
  try {
    const result = await User.deleteOne({ email: req.body.email });

    if (result.deletedCount === 1) {
      return res.status(200).json("Account Deletion successful");
    } else {
      return res.status(400).json("Email doesn't exist");
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

// --------------LOGOUT--------------//

router.post("/logout", authenticateToken, (req, res) => {

    return res.status(200).json('Logged out successfully');
  });

  // // app.get('/protected-resource', authenticateToken, (req, res) => {
  //   // The authenticated user's information is available in req.user
  //   const userId = req.user.userId;
  //   res.json({ message: `Protected resource accessed by user ${userId}` });
  // });
  
module.exports = router;

