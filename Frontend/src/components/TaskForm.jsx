import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTasks, FaCalendarAlt, FaListAlt } from "react-icons/fa";
import api from "../utils/api";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      const task = response.data;
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate.split("T")[0]);
      setPriority(task.priority);
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { title, description, dueDate, priority };
    try {
      if (id) {
        await api.patch(`/tasks/${id}`, taskData);
      } else {
        await api.post("/tasks", taskData);
      }
      navigate("/tasks");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8">
        {id ? "Edit Task" : "Create New Task"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-semibold flex items-center gap-2"
          >
            <FaTasks className="text-lg" /> Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold flex items-center gap-2"
          >
            <FaListAlt className="text-lg" /> Description
          </label>
          <textarea
            id="description"
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400"
          ></textarea>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="dueDate"
            className="text-sm font-semibold flex items-center gap-2"
          >
            <FaCalendarAlt className="text-lg" /> Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="w-full px-4 py-2 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="priority"
            className="text-sm font-semibold"
          >
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full px-4 py-2 bg-white text-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-white text-blue-700 font-semibold text-lg rounded-md hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
        >
          {id ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
