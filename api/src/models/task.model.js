const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const taskSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    description: { type: String, required: false },
    dueDate: { type: Date, required: false },
    completed: { type: Boolean, default: false, required: false },
    progress : {type : Number, default : 0, required : false},
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
      required: true,
    },
    people: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, required: false },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Comment = mongoose.model("Comment", commentSchema);
const Task = mongoose.model("task", taskSchema);
module.exports = { Task, Comment };
