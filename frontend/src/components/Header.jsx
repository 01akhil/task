import React from 'react'
import { useState } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
const Header = () => {

    //for search bar functionality,
const [searchQuery, setSearchQuery] = useState("");
const [filteredTasks, setFilteredTasks] = useState([]); // State for filtered tasks
const [selectedTask, setSelectedTask] = useState(null);

  // Open modal with selected task's details
  const openTaskModal = (task) => {
    setSelectedTask(task);
  };

  // Close the modal
  const closeTaskModal = () => {
    setSelectedTask(null);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);

    try {
      const response = await axios.get('http://localhost:5000/api/tasks/search', {
        params: { query: event.target.value },
      });

      // Ensure the response is an array
      if (Array.isArray(response.data)) {
        setFilteredTasks(response.data);
      } else {
        setFilteredTasks([]); // If the response is not an array, set to an empty array
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setFilteredTasks([]); // In case of error, clear the tasks
    }
  };

 


  return (
    <>
         <div className="relative text-sm">
        {/* Search Bar */}
        <div className="flex relative">
          <input
            type="text"
            placeholder="Search tasks..."
            className="h-10 w-[300px] px-4 rounded-md bg-white text-black outline-none"
            value={searchQuery}
            onChange={handleSearch}
          />
          <Search className="absolute top-2 right-3 w-5 h-5 text-gray-500" />
        </div>

        {/* Render filtered tasks */}
        <div className="absolute mt-2 w-[300px] bg-white shadow-lg rounded-md z-10 max-h-[300px] overflow-y-auto">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className="px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-300 text-gray-600"
                onClick={() => openTaskModal(task)} // Open modal on task click
              >
                <h3 className="text-sm font-semibold">{task.title}</h3>
              </div>
            ))
          ) : (
            <div className="px-4 py-2">
              <p className="text-sm text-gray-500">No tasks found</p>
            </div>
          )}
        </div>

        {/* Modal for Task Details */}
        {selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black rounded-lg shadow-lg w-[90%] max-w-md p-5">
              <h2 className="text-xl font-bold mb-3">{selectedTask.title}</h2>
              <p><strong>Status:</strong> {selectedTask.status}</p>
              <p><strong>Priority:</strong> {selectedTask.priority}</p>
              <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
              <p><strong>Description:</strong> {selectedTask.description}</p>
              <p><strong>Category:</strong> {selectedTask.category}</p>
              <p><strong>Created At:</strong> {selectedTask.createdAt}</p>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={closeTaskModal} // Close modal
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Header


