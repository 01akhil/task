import React from "react";

const TaskInput = ({
  description,
  setDescription,
  title,
  setTitle,
  status,
  setStatus,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  category,
  setCategory,
}) => {

  

  return (
    <>
      <div className="text-black h-[70vh] overflow-y-auto scrollbar-none task-list-container ">
        <p>Title</p>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white"
        />

        <p>Description</p>
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white"
        />

        <p className="-mt-[3vh]">Status</p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <p>Priority</p>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white "
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <p>Due date</p>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white"
        />

        <p>Category</p>
        <textarea
          placeholder="Task Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg bg-white"
        />
      </div>
    </>
  );
};

export default TaskInput;
