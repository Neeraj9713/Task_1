import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">
          <Link to="/" className="hover:text-blue-400 transition">
            Task<span className="text-blue-500">Manager</span>
          </Link>
        </h1>
        <div className="flex gap-6 items-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/tasks"
                className={`text-sm font-medium ${
                  location.pathname === "/tasks"
                    ? "text-blue-400"
                    : "text-gray-300"
                } hover:text-white transition`}
              >
                Tasks
              </Link>
              <Link
                to="/tasks/new"
                className={`text-sm font-medium ${
                  location.pathname === "/tasks/new"
                    ? "text-blue-400"
                    : "text-gray-300"
                } hover:text-white transition`}
              >
                Create Task
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
