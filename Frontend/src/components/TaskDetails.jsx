import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import api from "../utils/api";

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    setLoading(true); // Start loading
    setError(null); // Clear previous errors
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      setError("Error fetching task details."); // Set error message
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/tasks/${id}`);
        navigate("/tasks"); // Navigate to tasks list after successful deletion
      } catch (error) {
        setError("Error deleting task."); // Set error message if deletion fails
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[50vh] text-lg text-gray-500">
        <div className="animate-spin h-8 w-8 border-t-4 border-blue-500 rounded-full"></div>
        <span className="ml-2">Loading task details...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-[50vh] text-lg text-red-500">
        <span>{error}</span>
      </div>
    );

  if (!task)
    return (
      <div className="flex items-center justify-center h-[50vh] text-lg text-gray-500">
        No task found.
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-gray-50 to-gray-200 rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        {task.title}
      </h2>
      <div className="space-y-3">
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Description:</span>{" "}
          {task.description || "No description provided."}
        </p>
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Due Date:</span>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-md text-sm font-medium ${
              task.status === "pending"
                ? "bg-red-100 text-red-500"
                : "bg-green-100 text-green-500"
            }`}
          >
            {task.status}
          </span>
        </p>
        <p className="text-gray-700">
          <span className="font-medium text-gray-900">Priority:</span>{" "}
          <span
            className={`px-2 py-1 rounded-md text-sm font-medium ${
              task.priority === "high"
                ? "bg-red-100 text-red-500"
                : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-500"
                : "bg-green-100 text-green-500"
            }`}
          >
            {task.priority}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center mt-6 space-x-4">
        <Link
          to={`/tasks/${id}/edit`}
          className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FaEdit className="mr-2" /> Edit Task
        </Link>
        <button
          onClick={handleDelete}
          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <FaTrash className="mr-2" /> Delete Task
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
