const express=require('express')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User')
const Task=require('../models/Task')
const router=express.Router();
const JWT_SECRET=process.env.JWT_SECRET

router.post(
    
    '/signup',
    [
      body('email').isEmail().withMessage('Enter a valid email'),
      body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],

    
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
      const { email, password } = req.body;

      console.log("email is",email);
      console.log("password is",password);
  
      try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'User created successfully', userId: user._id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  );
  
  // User Login
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password); // Compare passwords
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

//to save a task

router.post('/', async (req, res) => {
    console.log("saving the task in backend")
    const { title, description, status, priority,dueDate,category,user } = req.body;

    // Validate required fields
    if (!title || !description || !status ) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create a new task
        const newTask = new Task({ title, description, status, priority,dueDate,category,user });

        // Save the task to the database
        await newTask.save();
        console.log(newTask);
        res.status(201).json({ message: 'Task saved successfully', task: newTask });
    } catch (error) {
        console.error('Error saving task:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
 
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority,category,dueDate, } = req.body;
  
    if (!title || !description || !status ) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.title = title;
      task.description = description;
      task.status = status;
      task.priority=priority;
      task.dueDate=dueDate;
      task.category=category;
  
      await task.save();
      res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  
  router.delete('/:id', async (req, res) => {
    
    const taskId = req.params.id;  
    console.log(taskId)
    try {
      const task = await Task.findByIdAndDelete(taskId);  
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });  
      }
  
      res.status(200).json({ message: 'Task deleted successfully' }); 
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Internal server error' });  
    }
  });
  


  router.get('/task-stats', async (req, res) => {
    try {
     
      const statusCount = await Task.aggregate([
        {
          $group: {
            _id: "$status", 
            count: { $sum: 1 },
          },
        },
      ]);
  
   
      const priorityCount = await Task.aggregate([
        {
          $group: {
            _id: "$priority",
            count: { $sum: 1 }, 
          },
        },
      ]);
  
     
      res.json({
        statusCount,
        priorityCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.get('/search', async (req, res) => {
    const { query } = req.query; 
    console.log("Reached here");
    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }
  
    try {
   
      const tasks = await Task.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
         
        ],
      });
      
      console.log(tasks)
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

  router.get('/categories', async (req, res) => {
    console.log("Getting categories");
  
    try {
     
      const categories = await Task.distinct('category');
      console.log(categories);
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  });

  module.exports = router;












