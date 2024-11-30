import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskDetails from "./components/TaskDetails";
import Header from "./components/Header";
import EditTask from "./components/TaskEdit";
import { Navigate } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div className="app bg-[#f7fafc] min-h-screen flex flex-col">
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="container mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/tasks" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/tasks"
              element={
                isAuthenticated ? <TaskList /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/tasks/new"
              element={
                isAuthenticated ? <TaskForm /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/tasks/:id"
              element={
                isAuthenticated ? <TaskDetails /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/tasks/:id/edit"
              element={
                isAuthenticated ? <EditTask /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
