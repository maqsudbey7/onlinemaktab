import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { BsMoon, BsSun } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import heroImg from "/online.jpg";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false); // Mobile & Desktop dropdown
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [language, setLanguage] = useState(localStorage.getItem("lang") || "UZ");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const dropdownRef = useRef();

  // Theme
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Language
  const toggleLanguage = () => {
    const newLang = language === "UZ" ? "RU" : "UZ";
    setLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Kurslar", path: "/courses" },
    { name: "Testlar", path: "/test" },
    { name: "FAQ", path: "/FAQ" },
    { name: "Aloqa", path: "/contact" },
  ];

  // Function to shorten user name
  const displayName = user ? (user.name.length > 9 ? user.name.slice(0, 9) + "..." : user.name) : "";

  return (
    <nav className="px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between
        bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl
        border border-white/30 dark:border-gray-700
        rounded-2xl p-3 shadow-lg transition-colors duration-300">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow">
            <img src={heroImg} className="w-10 h-10 rounded-lg" alt="Logo" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">OnlaynMaktabim</h1>
            <p className="text-xs text-gray-500 dark:text-gray-300">Har joyda taʼlim</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 relative">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600"
            >
              {l.name}
            </Link>
          ))}

          {/* User / Dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 relative z-2 text-gray-900 dark:text-white flex items-center gap-1"
              >
                <FaUserCircle size={24} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 p-3 flex flex-col gap-2 transition">
                  <Link to={"/profile"} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white">
                    {displayName} Profil
                  </Link>
                
                  <button
                    onClick={toggleTheme}
                    className="w-full px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    {theme === "light" ? "🌙" : "☀️"}
                  </button>
                  <button
                    onClick={toggleLanguage}
                    className="w-full mt-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md"
                  >
                    {language}
                  </button>
                    <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 rounded-lg bg-red-500 text-white dark:bg-red-600 dark:text-white hover:bg-red-600 transition"
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
                className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
               {language}
              </button>
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-md"
              >
                Kirish
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl bg-white/50 dark:bg-gray-700/50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl p-4 shadow-lg flex flex-col gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className="block py-2 text-gray-900 dark:text-gray-200"
              onClick={() => setMenuOpen(false)}
            >
              {l.name}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className="w-full mt-2 px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            onClick={toggleLanguage}
            className="w-full mt-2 px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-md"
          >
             {language}
          </button>

          {user ? (
            <>
              <Link to={"/profil"} className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 font-semibold text-gray-900 dark:text-white">
                {displayName} Profil
              </Link>
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-5 py-2 rounded-xl bg-red-500 text-white dark:bg-red-600 dark:text-white shadow-md"
              >
                Chiqish
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="w-full mt-2 px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-md"
            >
              Kirish
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
