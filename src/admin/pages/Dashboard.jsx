// src/admin/Dashboard.jsx
import React from "react";
import { FiBook, FiUsers, FiFileText } from "react-icons/fi";
import { useCourses } from "../../context/CourseContext";

export default function Dashboard() {
  const { courses } = useCourses();

  const totalCourses = courses.length;
  const totalModules = courses.reduce((sum, c) => sum + (c.modules?.length || 0), 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white text-black mb-6">Dashboard</h1>

      {/* Statistik cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <StatCard title="Courses" value={totalCourses} icon={<FiBook size={24} />} />
        <StatCard title="Modules" value={totalModules} icon={<FiFileText size={24} />} />
        <StatCard title="Users" value="—" icon={<FiUsers size={24} />} />
      </div>

      {/* Latest courses */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">So‘nggi kurslar</h2>
        {courses.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Hozircha kurslar yo‘q</p>
        ) : (
          <ul className="space-y-3">
            {courses.slice(-5).reverse().map(course => (
              <li
                key={course.id}
                className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 dark:text-white"
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
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex items-center gap-4 transform hover:-translate-y-1 hover:shadow-xl transition">
      <div className="p-3 bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white rounded-xl">{icon}</div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold dark:text-white">{value}</p>
      </div>
    </div>
  );
}
