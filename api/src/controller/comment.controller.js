const {Comment} = require("../models/task.model")
const authenticateSession = require("../middlewares/sessionAuthenticator");
const router = require("express").Router();

// UPDATE COMMENT
router.patch("/comment/update/:commentId", authenticateSession, async (req, res) => {
    try {
  
      const result = await Comment.findOneAndUpdate({ _id: req?.params?.commentId }, req.body);
      return res.status(200).json({
        ok : true,
        status : 200,
        message : 'Comment updated successfully'
      })
    } catch (error) {
      res.status(500).json({
        ok : false,
        status : 500,
        message : error
      });
    }
  });