const {Comment, Task} = require("../models/task.model")
const authenticateSession = require("../middlewares/sessionAuthenticator");
const router = require("express").Router();
const mongoose = require("mongoose");

// -------------ADD COMMENT IN TASK---------//
router.post("/add/:taskId", authenticateSession, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
      return res.status(400).json({
        ok: true,
        status: 400,
        message: `taskId is not present in our database`,
      });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({
        ok: true,
        status: 404,
        message: `Invalid task Id`,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(req.session.user._id)) {
      return res.status(400).json({
        ok: true,
        status: 400,
        message: `userId is not present in our database`,
      });
    }

    const newComment = new Comment({
      userId: req.session.user._id,
      comment: req.body.comment,
    });

    await newComment.save();
    task.comments.push(newComment._id);

    await task.save();

    return res.status(201).json({
      ok: true,
      status: 200,
      message: "Comment added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      ok: true,
      status: 500,
      message: error,
    });
  }
});

// FETCH ALL COMMENTS OF A TASK
router.get("/:taskId", authenticateSession, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Invalid Task Id",
      });
    }

    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Invalid Task Id",
      });
    }
    let query = { _id: { $in: task.comments } };

    const result = await Comment.find(query);

    return res.status(200).json({ ok: true, status: true, data: result });
  } catch (error) {
    return res.status(500).json({
      ok : false,
      status : false,
      message : error
    });
  }
});

// UPDATE COMMENT
router.patch('/update/:commentId', authenticateSession, async (req, res) => {
    try {
  
      await Comment.findOneAndUpdate({ _id: req?.params?.commentId }, req.body);
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

// DELETE COMMENT
router.delete('/delete/:commentId', authenticateSession, async (req, res) => {
  try {

    await Comment.findByIdAndDelete(req?.params?.commentId);
    return res.status(200).json({
      ok : true,
      status : 200,
      message : 'Comment deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      ok : false,
      status : 500,
      message : error
    });
  }
});

module.exports = router