import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiMoon, FiSun } from "react-icons/fi";
import heroImg from "/online.jpg";

export default function Navbar({ isDark, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Bosh sahifa", path: "/" },
    { name: "Kurslar", path: "/courses" },
    { name: "Testlar", path: "/test" },
    { name: "FAQ", path: "/FAQ" },
    { name: "Aloqa", path: "/contact" }, // Yangi qo'shilgan
  ];


  return (
    <nav className="px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between
                      backdrop-blur-xl bg-white/60 dark:bg-gray-900/60
                      border border-white/30 dark:border-gray-700
                      rounded-2xl p-3 shadow-lg">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 
                          flex items-center justify-center shadow">
            <img src={heroImg} className="w-10 h-10 rounded-lg" alt="Logo" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">OnlaynMaktabim</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Har joyda taʼlim</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}

          <Link to={"/login"} className="px-5 py-2 rounded-xl bg-black dark:bg-white
                             text-white dark:text-black shadow-md">
            Kirish
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-xl p-4 shadow-lg transition-all">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block py-2 text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <button className="w-full mt-3 px-5 py-2 rounded-xl bg-black dark:bg-white
                             text-white dark:text-black shadow-md">
            Kirish
          </button>

          <button
            onClick={toggleDarkMode}
            className="w-full mt-3 p-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      )}
    </nav>
  );
}
