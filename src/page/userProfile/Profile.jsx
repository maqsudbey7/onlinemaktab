// Profile.js
import React from "react";
import { getUser } from "../../utils/auth";
import { courses } from "../../data/courses";
import { FaBook } from "react-icons/fa";

// Online activity grid component
function OnlineDaysGrid({ onlineDates }) {
  const today = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - i);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD
  }).reverse();

  return (
    <div className="grid grid-cols-7 gap-1 mt-3">
      {last30Days.map((day) => {
        const isOnline = onlineDates.includes(day);
        return (
          <div
            key={day}
            className={`w-8 h-8 rounded-lg border transition-all duration-200 cursor-pointer
              ${isOnline ? "bg-green-500 shadow-md transform hover:scale-110" : "bg-red-300 dark:bg-red-700"}
            `}
            title={day}
          ></div>
        );
      })}
    </div>
  );
}

export default function Profile() {
  const user = getUser();

  if (!user || !user.name) {
    return (
      <p className="text-center mt-20 text-gray-500 dark:text-gray-400 text-lg">
        Profil topilmadi. Iltimos, login qiling.
      </p>
    );
  }

  const onlineDates = user.onlineDates || [];
  const watchedCourses = courses.filter((c) => user.watchedCourses?.includes(c.id));
  const purchasedCourses = courses.filter((c) => user.purchasedCourses?.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Profil info */}
      <div className="mb-12 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transition transform hover:scale-101">
        <h1 className="text-4xl font-bold mb-3">Salom, {user.name}!</h1>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
        <p className="mt-4 font-semibold text-lg">Online bo‘lgan kunlar: {onlineDates.length} kun</p>

        {/* Online activity calendar */}
        <OnlineDaysGrid onlineDates={onlineDates} />
        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          Yashil = saytga kirgan kun, Qizil = kirmagan kun
        </p>
      </div>

      {/* Ko‘rilgan kurslar */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Ko‘rilgan kurslar</h2>
        {watchedCourses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Hech qanday kurs ko‘rilmagan</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {watchedCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-3">
                  <FaBook /> {c.lessons} dars
                </div>
                {/* Gradient progress bar */}
                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                    style={{ width: `${c.progress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Progress: {c.progress}%</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sotib olingan kurslar */}
      {purchasedCourses.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Sotib olingan kurslar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {purchasedCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <FaBook /> {c.lessons} dars
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
