import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { BsMoon, BsSun } from "react-icons/bs";
import heroImg from "/online.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme to HTML tag
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const navLinks = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Kurslar", path: "/courses" },
    { name: "Testlar", path: "/test" },
    { name: "FAQ", path: "/FAQ" },
    { name: "Aloqa", path: "/contact" },
  ];

  return (
    <nav className="px-6 py-4">
  <div
    className="max-w-7xl mx-auto flex items-center justify-between
    bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl
    border border-white/30 dark:border-gray-700
    rounded-2xl p-3 shadow-lg transition-colors duration-300"
  >

        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow">
            <img src={heroImg} className="w-10 h-10 rounded-lg" alt="Logo" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              OnlaynMaktabim
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Har joyda taʼlim
            </p>
          </div>
        </Link>

        {/* Desktop menu */}
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

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
          </button>

          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-md"
          >
            Kirish
          </Link>
        </div>

        {/* Mobile btn */}
        <button
          className="md:hidden p-2 rounded-xl bg-white/50 dark:bg-gray-700/50"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-xl p-4 shadow-lg">
          {navLinks.map((l) => (
            <Link
              key={l.name}
              to={l.path}
              className="block py-2 text-gray-900 dark:text-gray-200"
              onClick={() => setOpen(false)}
            >
              {l.name}
            </Link>
          ))}

          {/* THEME MOBILE BUTTON */}
          <button
            onClick={toggleTheme}
            className="w-full mt-3 px-5 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          <Link
            to="/login"
            className="w-full mt-3 px-5 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black shadow-md"
          >
            Kirish
          </Link>
        </div>
      )}
    </nav>
  );
}
