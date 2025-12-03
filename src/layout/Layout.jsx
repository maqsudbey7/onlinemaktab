// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout({ isDark, toggleDarkMode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        <Outlet /> {/* Bu yerga Route’lardagi componentlar keladi */}
      </main>
      <Footer />
    </div>
  );
}
