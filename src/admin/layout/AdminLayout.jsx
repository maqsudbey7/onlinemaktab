import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FiHome, FiBook, FiUsers, FiFileText } from "react-icons/fi";

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8 text-blue-600">Admin Panel</h2>
          <nav className="space-y-2 text-sm">
            <Link to="/admin" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 transition-colors">
              <FiHome /> Dashboard
            </Link>
            <Link to="/admin/courses" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 transition-colors">
              <FiBook /> Courses
            </Link>
            <Link to="/admin/tests" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 transition-colors">
              <FiFileText /> Tests
            </Link>
            <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded hover:bg-blue-100 transition-colors">
              <FiUsers /> Users
            </Link>
          </nav>
        </div>
        <button onClick={logout} className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors">
          Logout
        </button>
      </aside>

      <main className="flex-1 bg-gray-50 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
