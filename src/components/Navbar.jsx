import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import heroImg from "/online.jpg";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));

  const dropdownRef = useRef();

  /* ================= THEME ================= */
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  /* ================= REAL-TIME LOGIN UPDATE ================= */
  useEffect(() => {
    const handleUserChange = () => {
      setUser(JSON.parse(localStorage.getItem("user") || "null"));
    };

    // Event listener qo‘shish
    window.addEventListener("userChanged", handleUserChange);

    // Clean up
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  /* ================= CLICK OUTSIDE ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Quizs", path: "/test" },
    { name: "Contact", path: "/contactUs" },
  ];

  const displayName = user
    ? user.name.length > 9
      ? user.name.slice(0, 9) + "..."
      : user.name
    : "";

  return (
    <nav className="px-4 md:px-6 py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between
        bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl
        border border-white/30 dark:border-gray-700
        rounded-2xl p-3 shadow-lg transition-colors">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <img src={heroImg} className="w-10 h-10 rounded-lg" alt="Logo" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              A'loMaktab
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Har joyda taʼlim
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600"
            >
              {l.name}
            </Link>
          ))}

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <FaUserCircle size={24} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 flex flex-col gap-2">
                  <Link
                    to={user.role === "admin" ? "/admin" : "/profile"}
                    className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold"
                  >
                    {displayName}
                  </Link>

                  <button
                    onClick={toggleTheme}
                    className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                  >
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                  </button>

                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-lg bg-red-500 text-white"
                  >
                    Chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>

              <Link
                to="/login"
                className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black"
              >
                Kirish
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden p-2 rounded-xl bg-white/50 dark:bg-gray-700/50 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-screen mt-2" : "max-h-0"
          }`}
      >
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 shadow-lg flex flex-col gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className="py-2 text-gray-900 dark:text-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              {l.name}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="mt-2 px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/profile"}
                className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {displayName}
              </Link>
              <button
                onClick={handleLogout}
                className="mt-2 px-5 py-2 rounded-xl bg-red-500 text-white"
              >
                Chiqish
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mt-2 px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black"
            >
              Kirish
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
