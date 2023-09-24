const authenticateToken = require("../middlewares/tokenAuthenticator")
const Task = require("../models/task.model")

const router = require("express").Router()


router.post('/createtask',authenticateToken, async(req,res)=>{
    try {
    
        let task = new Task({
            title : req.body.title,
            createdBy : req.user.user._id,
            description : req.body.description,
            dueDate : req.body.dueDate,
            completed : req.body.completed,
            priority : req.body.priority,
            people : [],
            taskType : req.body.taskType,
            comments : []
        })
        let createdTask = await task.save()


        res.status(200).json('task created successfully')
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = router