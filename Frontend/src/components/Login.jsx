import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = ({ setIsAuthenticated, setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/users/login", { username, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      navigate("/tasks");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-[28rem] p-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 font-sans">
          Welcome Back
        </h2>
        <hr className="h-px mb-6 bg-gray-700 border-0" />
        {error && <p className="text-red-500 text-center mb-4 font-medium">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-400 mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-full py-3 px-5 border-2 border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-light"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-400 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-full py-3 px-5 border-2 border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-light"
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="remember_me" className="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                name="remember"
                className="rounded border-gray-600 text-blue-500 shadow-sm focus:ring-blue-500"
              />
              <span className="ms-2 text-sm text-gray-400">Remember Me</span>
            </label>

            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg hover:shadow-lg hover:scale-105 transform transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
