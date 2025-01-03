
import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import useTasks from "../hooks/useTasks";

const TaskList = ({handleEditTask,tasks}) => {

  const{
    
    handleDeleteTask
  }=useTasks()
  const [selectedTask, setSelectedTask] = useState(null);

  const openTaskModal = (task) => {
    setSelectedTask(task);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="task-list-container rounded-lg text-black  ">
      <div className="">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks are here</p>
        ) : (
          <ul className="grid grid-cols-4 h-auto  gap-1 shadow-md p-1 mb-[5vh]">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="border border-gray-300 rounded-lg shadow-md flex justify-between items-center p-3 h-[30vh] w-[20vw] cursor-pointer"
                onClick={() => openTaskModal(task)}
              >
                {/* Compact view */}
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-sm">Status: {task.status}</p>
                  <p className="text-sm">Priority: {task.priority}</p>
                  <p className="text-sm">Due Date: {task.dueDate}</p>
                </div>
                <div className="flex space-x-3 items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering the parent click event
                      handleEditTask(task);
                    }}
                    className="p-2 bg-blue-500 text-white rounded-full"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering the parent click event
                      handleDeleteTask(task._id);
                    }}
                    className="p-2 bg-red-500 text-white rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-5">
            <h2 className="text-xl font-bold mb-3">{selectedTask.title}</h2>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Category:</strong> {selectedTask.category}</p>
            <p><strong>Created At:</strong> {selectedTask.createdAt}</p>

            <div className="mt-4 flex justify-end">
              <button
                onClick={closeTaskModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
