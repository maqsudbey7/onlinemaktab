import React from "react";
import { FaBook } from "react-icons/fa";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";
import { getUser } from "../../utils/auth";
import { useCourses } from "../../context/CourseContext";

// Oy nomlari
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function GitHubTimeline({ activity }) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);

  const weeks = [];
  let current = new Date(startDate);

  for (let w = 0; w < 52; w++) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().slice(0, 10);
      week.push({ date: dateStr, count: activity[dateStr] || 0 });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }

  const getColor = (count) => {
    if (!count) return "#ebedf0";
    if (count === 1) return "#c6f6d5";
    if (count === 2) return "#68d391";
    if (count === 3) return "#38a169";
    return "#22543d";
  };

  const monthLabels = {};
  weeks.forEach((week, wIdx) => {
    const firstDay = new Date(week[0].date);
    const month = firstDay.getMonth();
    if (!monthLabels[month]) monthLabels[month] = wIdx;
  });

  return (
    <div className="overflow-x-auto py-4">
      <div className="flex gap-1 ml-10 mb-1">
        {weeks.map((week, wIdx) => {
          const firstDay = new Date(week[0].date);
          const month = firstDay.getMonth();
          return monthLabels[month] === wIdx ? (
            <span key={wIdx} className="text-xs text-gray-600 dark:text-gray-300">
              {MONTHS[month]}
            </span>
          ) : (
            <span key={wIdx} className="w-3"></span>
          );
        })}
      </div>

      <div className="flex">
        <div className="flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 mr-2 h-28">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        <div className="flex gap-1">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col-reverse gap-1">
              {week.map((day) => (
                <div
                  key={day.date}
                  className="w-3 h-3 rounded-sm cursor-pointer"
                  title={`${day.date}: ${day.count} contribution`}
                  style={{ backgroundColor: getColor(day.count) }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const user = getUser();
  const { courses, getCourseProgress } = useCourses();

  if (!user || !user.name) {
    return (
      <p className="text-center mt-20 text-gray-500 dark:text-gray-400 text-lg">
        Profil topilmadi. Iltimos, login qiling.
      </p>
    );
  }

  const activity = user.githubActivity || {};

  // purchasedCourses filter (string/number ID farqini hisobga olgan)
  const purchasedCourses = courses.filter((c) =>
    user.purchasedCourses?.includes(c.id) || user.purchasedCourses?.includes(String(c.id))
  );

  return (
    <div className="relative max-w-7xl mx-auto py-12 px-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <BackgroundLogos />

      <div className="mb-12 p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl transition transform">
        <h1 className="text-4xl font-bold mb-2">Salom, {user.name}!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{user.email}</p>

        <p className="mt-2 font-semibold text-lg">
          Online activity: {Object.values(activity).reduce((a, b) => a + b, 0)} kun
        </p>

        <GitHubTimeline activity={activity} />
        <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
          Katakchalar rangi sizning online faoliyatingizni ko‘rsatadi.
          Yorqin yashil = kamroq faol, quyuq yashil = ko‘p faol.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Sotib olingan kurslar</h2>
        {purchasedCourses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Hech qanday kurs sotib olinmagan</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {purchasedCourses.map((c) => {
              const progress = getCourseProgress(c.id);
              return (
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
                    <FaBook /> {c.lessonsCount} dars
                  </div>
                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Progress: {progress}%
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
