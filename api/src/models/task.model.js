const mongoose = require("mongoose");

const taskModel = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    due_date: { type: Date, required: true },
    completed: { type: Boolean, default: false, required: false },
    priority: { type: String, enum : ["low", "medium", "high"], default : "low", required : true, },
    assigned_to: { type: String,  required : false, },
    task_type: { type: String,  required : true, },
    comments : [
        {
          comment : {type: String, required : true},
        }
    ]

  },
  {
    timestamps: true,
    versionKey: false,
  }
);
