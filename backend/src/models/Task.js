const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in progress", "completed"], 
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'], 
},
  dueDate: {
    type: Date,
    required: true,
  },
  category:{
    type:String,
    required:true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);
