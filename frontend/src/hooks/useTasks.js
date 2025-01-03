// src/hooks/useTasks.js

import { useState, useEffect } from 'react';
import { fetchTasks,createTask, updateTask, deleteTask} from '../api/tasks'


const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

 
  const [editingTask, setEditingTask] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const[priority,setPriority]=useState('low');
  const [dueDate, setDueDate] = useState('');
  const[category,setCategory] = useState('');
  const [user,setUser]=useState('');


  useEffect(() => {
    const getTasks = async () => {
      const tasksData = await fetchTasks();
      setTasks(tasksData);
    };

    getTasks();
  }, []);

  const handleCreateTask = async () => {
    if (!title || !description ) {
      alert('Please fill in all fields');
      return;
    }

    const newTask = { title, description, status, priority,category,dueDate,user:user._id };
    console.log("category at frontend",category)
    const savedTask = await createTask(newTask);

    if (savedTask) {
      setTasks([...tasks, savedTask]);
      resetForm();
    }
  };

  const handleEditTask = (task) => {
    console.log("reached here")
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setCategory(task.category)
    setPriority(task.priority)
    setDueDate(task.dueDate)
    setEditingTask(task);
    setShowCreateForm(true);
  };

  const handleUpdateTask = async () => {
    if (!title || !description ) {
      alert('Please fill in all fields');
      return;
    }

    const updatedTask = { ...editingTask, title, description, status,priority,category,dueDate,  };
    await updateTask(editingTask._id, updatedTask);

    setTasks(tasks.map((task) => (task._id === editingTask._id ? updatedTask : task)));
    resetForm();
  };

  const handleDeleteTask = async (id) => {
    try{
      await deleteTask(id);
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task._id !== id);
      });
   
    }catch (error) {
      console.error("Error deleting task:", error);
    }
    return {
      tasks,
      setTasks,
      handleDeleteTask,
    };
    
  };



  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
    
    
    setEditingTask(null);
    setShowCreateForm(false);
    
    setPriority('low');
    setDueDate('')
    setCategory('');

  };

  return {
    tasks,
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
   
   
    editingTask,
    showCreateForm,
    setShowCreateForm,
    handleCreateTask,
    handleEditTask,
    handleUpdateTask,
    handleDeleteTask,
    
    resetForm,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    category,
    setCategory,
    user,
    setUser
  };
};

export default useTasks;
