import React, { useEffect, useState } from "react";
import { useCourses } from "../../context/CourseContext";
import { FiUsers, FiUserPlus, FiShoppingCart } from "react-icons/fi";

export default function Dashboard() {
  const { courses } = useCourses();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  const totalUsers = users.length;

  // Kurslar bo'yicha stats
  const courseStats = courses.map(course => {
    const buyers = users.filter(
      u => u.purchasedCourses?.includes(course.id) || u.purchasedCourses?.includes(String(course.id))
    );
    const registered = users.filter(
      u => u.registeredCourses?.includes(course.id) || u.registeredCourses?.includes(String(course.id))
    );
    return {
      ...course,
      buyersCount: buyers.length,
      registeredCount: registered.length,
    };
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold dark:text-white text-black mb-6">Dashboard</h1>

      {/* Umumiy statistikalar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Users"
          value={totalUsers}
          icon={<FiUsers size={28} />}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Total Courses"
          value={courses.length}
          icon={<FiUserPlus size={28} />}
          color="bg-yellow-500"
        />
      </div>

      {/* Kurslar statistikasi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {courseStats.map(course => {
          const registeredPercent = totalUsers ? Math.round((course.registeredCount / totalUsers) * 100) : 0;
          const boughtPercent = totalUsers ? Math.round((course.buyersCount / totalUsers) * 100) : 0;

          return (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg hover:scale-105 transition transform"
            >
              <h3 className="text-xl font-bold mb-4 dark:text-white">{course.title}</h3>

              {/* Registered */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <FiUserPlus className="text-yellow-500" />
                  <span className="font-medium dark:text-white">{course.registeredCount} registered</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{registeredPercent}%</span>
              </div>
              <div className="w-full h-3 bg-yellow-100 dark:bg-yellow-700 rounded-full mb-4">
                <div
                  className="h-3 bg-yellow-500 rounded-full transition-all"
                  style={{ width: `${registeredPercent}%` }}
                />
              </div>

              {/* Bought */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <FiShoppingCart className="text-green-500" />
                  <span className="font-medium dark:text-white">{course.buyersCount} bought</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{boughtPercent}%</span>
              </div>
              <div className="w-full h-3 bg-green-100 dark:bg-green-700 rounded-full">
                <div
                  className="h-3 bg-green-500 rounded-full transition-all"
                  style={{ width: `${boughtPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, color }) {
  return (
    <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md transform hover:-translate-y-1 hover:shadow-xl transition">
      <div className={`p-4 rounded-xl text-white ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold dark:text-white">{value}</p>
      </div>
    </div>
  );
}
