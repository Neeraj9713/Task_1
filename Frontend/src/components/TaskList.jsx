import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaTrash, FaEdit, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import api from "../utils/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [currentPage]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?page=${currentPage}&limit=10`);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-300 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Task Manager
      </h2>
      <Link
        to="/tasks/new"
        className="flex items-center justify-center mb-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition w-fit"
      >
        <FaPlus className="mr-2" /> Create New Task
      </Link>
      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`p-4 bg-white border-l-4 rounded-lg shadow-sm hover:shadow-md transition ${
                task.priority === "high"
                  ? "border-red-500"
                  : task.priority === "medium"
                  ? "border-yellow-500"
                  : "border-green-500"
              }`}
            >
              <div className="flex justify-between items-center">
                <Link
                  to={`/tasks/${task._id}`}
                  className="text-lg font-semibold text-gray-800 hover:text-blue-600"
                >
                  {task.title}
                </Link>
                <span
                  className={`text-sm px-3 py-1 rounded-md font-medium ${
                    task.status === "pending"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 mt-2">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                  className="px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">No tasks available. Start by creating one!</p>
      )}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <FaArrowLeft /> Previous
        </button>
        <span className="text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TaskList;
