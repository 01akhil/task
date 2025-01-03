// src/api/tasks.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${API_URL}/api/tasks`, task);
    return response.data.task;
  } catch (error) {
    console.error('Error creating task:', error);
  }
};

export const updateTask = async (id, task) => {
  try {
    await axios.put(`${API_URL}/api/tasks/${id}`, task);
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
