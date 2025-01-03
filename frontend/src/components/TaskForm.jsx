import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import { Plus } from "lucide-react";
import useTasks from "../hooks/useTasks";
import Graph from "./Graph";
import Header from "./Header";
import axios from "axios";

const TaskForm = () => {
  const {
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
    resetForm,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    category,
    setCategory,
    user,
    setUser,
    tasks,
    handleDeleteTask
  } = useTasks();

  const [categories, setCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Filter tasks based on category
  useEffect(() => {
    if (category === "all") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.category === category);
      setFilteredTasks(filtered);
    }
  }, [tasks, category]); // Only rerun when tasks or category change

  // Filter tasks based on category
  useEffect(() => {
    if (priority === "all") {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.priority === priority);
      setFilteredTasks(filtered);
    }
  }, [tasks, priority]); // Only rerun when tasks or category change

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks/categories", {
        params: { userId: user },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

 

  return (
    <div className="w-[100vw] h-screen text-black">
      <div className="h-[8vh] w-[100vw] bg-gradient-to-r from-[#6b44ad] to-[#e851b4] flex items-center justify-between px-4 text-lg text-white">
        <h2>Task Manager</h2>
        <Header />
      </div>

      <div className="w-full min-h-[92vh] absolute sm:w-[60vw] md:w-[50vw] lg:w-[100vw] mx-auto p-6 border-2 border-gray-500 bg-[#fffffd] rounded-lg flex flex-col items-center justify-center">
        <Graph />

        <div className="mt-[10vh] w-full">
          <div className="w-full mt-[10vh] flex space-x-6">
            {/* Category Dropdown */}
            <div>
              <h2
                className="text-lg font-semibold text-gray-500 cursor-pointer"
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  fetchCategories();
                }}
              >
                Category
              </h2>
              {showCategoryDropdown && (
                <ul className="bg-white border border-gray-300 rounded-lg w-[10vw] shadow-md mt-2 z-5 absolute">

                  <li onClick={() => {
                          setCategory("all");
                          setShowCategoryDropdown(false);
                        }} className="p-2 hover:bg-gray-100 cursor-pointer">
                    All
                  </li>

                  {categories.length > 0 ? (
                    categories.map((cat, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setCategory(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {cat}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">No categories found</li>
                  )}
                </ul>
              )}
            </div>

            {/* Priority Dropdown */}
            <div>
              <h2
                className="text-lg font-semibold text-gray-500 cursor-pointer"
                onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              >
                Priority
              </h2>
              {showPriorityDropdown && (
                <ul className="bg-white border border-gray-300 rounded-lg w-[10vw] shadow-md mt-2 z-5 absolute">
                  {["High", "Medium", "Low"].map((priority) => (
                    <li
                      key={priority}
                      onClick={() => {
                        setPriority(priority.toLowerCase());
                        setShowPriorityDropdown(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {priority}
                    </li>
                  ))}
                </ul>
              )}
            </div>

          
          </div>

          <TaskList handleEditTask={handleEditTask} tasks={filteredTasks} handleDeleteTask={handleDeleteTask}/>

          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="w-[100vw] fixed right-1 bottom-1 flex items-center justify-center gap-2 p-3 bg-[#e2eafb] text-[#0049fb] rounded-lg"
          >
            {showCreateForm ? (
              "Cancel"
            ) : (
              <>
                <Plus className="h-5 w-5" /> New Task
              </>
            )}
          </button>

          {showCreateForm && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
                <button
                  onClick={resetForm}
                  className="absolute top-2 text-red-500 right-4 hover:text-red-500 transition-colors bg-[#ffffff] border-2 border-gray-100"
                >
                  &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">
                  {editingTask
                    ? `Edit Task: ${editingTask.title}`
                    : "Create Task"}
                </h2>
                <TaskInput
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  status={status}
                  setStatus={setStatus}
                  priority={priority}
                  setPriority={setPriority}
                  dueDate={dueDate}
                  setDueDate={setDueDate}
                  category={category}
                  setCategory={setCategory}
                  user={user}
                  setUser={setUser}
                />
                <div className="flex justify-between gap-4 mt-6">
                  <button
                    onClick={editingTask ? handleUpdateTask : handleCreateTask}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg"
                  >
                    {editingTask ? "Update Task" : "Create Task"}
                  </button>
                  <button
                    onClick={resetForm}
                    className="w-full bg-gray-500 text-white p-3 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
