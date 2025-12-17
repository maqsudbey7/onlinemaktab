import React, { useState, useEffect } from "react";
import { FiBook, FiUsers, FiFileText, FiSun, FiMoon } from "react-icons/fi";
import { useCourses } from "../../context/CourseContext";

export default function Dashboard() {
  const { courses } = useCourses();
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

  const totalCourses = courses.length;
  const totalModules = courses.reduce((sum, c) => sum + (c.modules?.length || 0), 0);

  return (
    <div className="space-y-8 ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold dark:text-white text-black  ">Dashboard</h1>
        <button
          onClick={toggleDark}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>

      {/* Statistik kartalar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 dark:text-white">
        <StatCard title="Courses" value={totalCourses} icon={<FiBook size={24} />} />
        <StatCard title="Modules" value={totalModules} icon={<FiFileText size={24} />} />
        <StatCard title="Users" value="—" icon={<FiUsers size={24} />} />
      </div>

      {/* Oxirgi kurslar */}
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">So‘nggi kurslar</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Hozircha kurslar yo‘q</p>
        ) : (
          <ul className="space-y-3">
            {courses.slice(-5).reverse().map(course => (
              <li
                key={course.id}
                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2"
              >
                <span className="font-medium">{course.title}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {course.modules?.length || 0} modul
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-6 flex items-center gap-4 transform hover:-translate-y-1 hover:shadow-lg transition">
      <div className="p-3 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white rounded">{icon}</div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
