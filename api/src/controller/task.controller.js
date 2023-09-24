const authenticateToken = require("../middlewares/tokenAuthenticator");
const Task = require("../models/task.model");
const mongoose = require("mongoose")

const router = require("express").Router();

// ------------CREATED TASK-------------//
router.post("/create", authenticateToken, async (req, res) => {
  try {
    let task = new Task({
      title: req.body.title,
      createdBy: req.user.user._id,
      description: req.body.description,
      dueDate: req.body.dueDate,
      completed: req.body.completed,
      priority: req.body.priority,
      people: [],
      taskType: req.body.taskType,
      comments: [],
    });
    let createdTask = await task.save();
    res.status(200).json("task created successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// ------------UPDATE TASK-------------//
router.patch("/update/:taskId", authenticateToken, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
      return res.status(400).json("Invalid task ID");
    }
    let task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json("Task does'nt exist");
    }

    const updatedTask = await Task.updateOne(
      { _id: req.params.taskId },
      req.body
    );
    if (updatedTask.modifiedCount === 1) {
      return res.status(200).json("Task updated successfully");
    } else {
      return res.status(400).json("Task update failed");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// ------------DELETE TASK-------------//
router.delete("/delete/:taskId", authenticateToken, async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
        return res.status(400).json("Invalid task ID");
      }
      let result = await Task.findByIdAndDelete(req.params.taskId);
      if (!result) {
        return res.status(404).json("Task doesn't exist");
      }
      
      return res.status(200).json('Task deleted successfully')
   
    } catch (error) {
      res.status(500).json(error.message);
    }
});


// --------------ADD PEOPLE------------//
router.patch("/invite/:taskId", authenticateToken, async(req,res)=>{
  try {
    if(!mongoose.Schema.Types.ObjectId.isValid(req.params.taskId)){
      return res.status(400).json('userId is not present in our database')
    }

    const task= await Task.findById(req.params.taskId)
    
    if(!task){
      return res.status(404).json('Task not found')
    }

    const {peopleToAdd} = req.body

    if(!Array.isArray(peopleToAdd)){
      return res.status(400).json('Invalid peopleToAdd format')
    }
    task.people.push(...peopleToAdd)

    await task.save()
    res.status(200).json(`${peopleToAdd} added successfully`)
    
  } catch (error) {
    return res.status(500).json(error.message)
  }
})

module.exports = router;
