// src/admin/layout/AdminLayout.jsx
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiBook, FiUsers, FiFileText } from "react-icons/fi";

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    // localStorage.removeItem('token') va boshqalar
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="space-y-2 text-sm">
          <Link to="/admin" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiHome /> Dashboard
          </Link>
          <Link to="/admin/courses" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiBook /> Courses
          </Link>
          <Link to="/admin/tests" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiFileText /> Tests
          </Link>
          <Link to="/admin/users" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100">
            <FiUsers /> Users
          </Link>
          <button onClick={logout} className="mt-4 w-full text-left p-2 rounded hover:bg-gray-100">Logout</button>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
