// src/admin/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiFileText,
  FiSun,
  FiMoon,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static z-50 inset-y-0
          ${collapsed ? "w-20" : "w-72"}
          h-screen
          bg-white dark:bg-gray-800
          border-r dark:border-gray-700
          transition-all duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col justify-between
        `}
      >
        {/* Top */}
        <div className="p-4 flex flex-col h-full dark:text-white">
          <div className="flex items-center justify-between mb-6">
            {!collapsed && (
              <h2 className="text-xl font-bold text-blue-600">
                Admin Panel
              </h2>
            )}

            {/* Collapse button (desktop) */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center
                 text-gray-600 dark:text-gray-300
                 hover:text-blue-600 dark:hover:text-blue-400
                 transition text-2xl pl-3"
            >
              {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
            </button>

            {/* Close mobile */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-gray-600 dark:text-gray-300 text-2xl"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            <SidebarItem
              to="/admin"
              icon={<FiHome />}
              text="Dashboard"
              collapsed={collapsed}
              onClick={() => mobileOpen && setMobileOpen(false)}
            />
            <SidebarItem
              to="/admin/courses"
              icon={<FiBook />}
              text="Courses"
              collapsed={collapsed}
              onClick={() => mobileOpen && setMobileOpen(false)}
            />
            <SidebarItem
              to="/admin/tests"
              icon={<FiFileText />}
              text="Tests"
              collapsed={collapsed}
              onClick={() => mobileOpen && setMobileOpen(false)}
            />
            <SidebarItem
              to="/admin/users"
              icon={<FiUsers />}
              text="Users"
              collapsed={collapsed}
              onClick={() => mobileOpen && setMobileOpen(false)}
            />
            <SidebarItem
              to="/"
              icon={<FiHome />}
              text="Home"
              collapsed={collapsed}
              onClick={() => mobileOpen && setMobileOpen(false)}
            />
          </nav>
        </div>

        {/* Bottom */}
        <div className="space-y-3 m-3 dark:text-white">
          <button
            onClick={toggleDark}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl
            bg-gray-200 dark:bg-gray-700"
          >
            {dark ? <FiSun /> : <FiMoon />}
            {!collapsed && (dark ? "Light" : "Dark")}
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl
            bg-red-500 text-white"
          >
            <FiLogOut />
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center gap-4 p-4 bg-white dark:bg-gray-800 shadow dark:text-white">
          <button onClick={() => setMobileOpen(true)}>
            <FiMenu size={22} />
          </button>
          <h1 className="font-semibold dark:text-white">Admin Panel</h1>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* ===== Sidebar Item ===== */
function SidebarItem({ to, icon, text, collapsed, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick} // 🔹 mobilda sidebar yopish
      className="flex items-center gap-3 p-3 rounded-lg
        hover:bg-blue-100 dark:hover:bg-blue-700 transition"
    >
      <span className="text-xl">{icon}</span>
      {!collapsed && <span>{text}</span>}
    </Link>
  );
}
