// src/admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiBook, FiUsers, FiFileText, FiSun, FiMoon } from "react-icons/fi";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored === "true") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
    localStorage.setItem("darkMode", !dark);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <aside className="w-72 bg-white dark:bg-gray-800 border-r dark:border-gray-700 dark:text-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>
          <nav className="space-y-2 text-sm">
            <Link to="/admin" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors">
              <FiHome /> Dashboard
            </Link>
            <Link to="/admin/courses" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors">
              <FiBook /> Courses
            </Link>
            <Link to="/admin/tests" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors">
              <FiFileText /> Tests
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors">
              <FiUsers /> Users
            </Link>
            <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 dark:hover:bg-blue-700 transition-colors">
              <FiUsers /> Home
            </Link>
          </nav>
        </div>

        {/* Sidebar bottom: Dark Mode & Logout */}
        <div className="space-y-4">
          <button
            onClick={toggleDark}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {dark ? <FiSun size={18} /> : <FiMoon size={18} />}
            {dark ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
