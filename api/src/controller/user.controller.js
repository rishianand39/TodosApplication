const User = require("../models/user.model");
const mongoose = require("mongoose");
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
      return res.status(400).json({
        ok: false,
        status : 400,
        message : "User Already exist with this email Id"
      });
    }
    await newUser.save();
    res.status(200).json({
      ok : true,
      status : 200,
      message : "Account created successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ----------SIGNIN USER--------------//
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        status : 401,
        ok: false,
        message : "Wrong credential"
      });
    }
    if (req.body.password !== user.password) {
      return res.status(401).json({
        status : 401,
        ok: false,
        message : "Wrong credential"
      });
    }

    req.session.user=user;
    req.session.authorized = true;
    return res.status(200).json({
      user,
      status:200,
      ok : true,
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
      return res.status(401).json({
        status: 401,
        ok : false,
        message : "Email doesn't exist in our database"
      });
    }

    return res.status(200).json({
      status : 200,
      ok : true,
      message : "Password reset successful"
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// ------------ UPDATE PROFILE------------//
router.patch("/update/:userid", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userid)) {
      return res.status(400).json({
        ok : false, 
        status : 404,
        message : "Invalid User Id"
      });
    }
    const existingUser = await User.findById(req.params.userid);
    if (!existingUser) {
      return res.status(404).json({
        ok : false, 
        status : 404,
        message : "User not found"
      });
    }

    const result = await User.updateOne({ _id: req.params.userid }, req.body);

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        ok : true,
        status: 200,
        message : "User updated successfully"
      });
    } else {
      return res.status(400).json({
        ok : false,
        status : 400,
        message : "User update failed"
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// -------------- DELETE ACCOUNT--------------//
router.delete("/delete/:userId", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({
        ok : false,
        status: 400,
        message : "Invalid user ID"
      });
    }
    const result = await User.findOneAndDelete(req.params.userId);

    if (result.deletedCount === 1) {
      return res.status(200).json({
        status: 200,
        ok : true,
        message : "Account Deletion successful"
      });
    } else {
      return res.status(400).json({
        status : 400,
        ok : false,
        message : "Email doesn't exist"
      });
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

// --------------LOGOUT--------------//
router.post("/logout", authenticateToken, (req, res) => {
  if(req.session.authorized){
    req?.session?.destroy()
  }
  return res.status(200).json({
    ok : true,
    status : 200,
    messge : "Logged out successfully"
  });
});

// --------------FIND USERS--------------//
const call = {};

router.get("/search", authenticateToken, async (req, res) => {
  try {
    clearTimeout(call.timeout);

    call.timeout = setTimeout(async () => {
      const keyword = req.query?.name; 

      if (!keyword) {
        return res.status(400).json({
          status : 400,
          ok : false,
          message : "Keyword is required"
        });
      }

      const regexPattern = new RegExp(keyword, "i");

      const users = await User.find({ name: { $regex: regexPattern } });

      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({
            ok : false,
            status : 404,
            message : "No users found with matching name"
          });
      }

      return res.status(200).json(users);
    }, 300);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});




module.exports = router;
