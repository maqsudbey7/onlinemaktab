import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className=" flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow bg-white dark:bg-gray-900 transition-colors duration-300">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

