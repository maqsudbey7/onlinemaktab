import React from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function Courses() {
  const { courses, deleteCourse } = useCourses();

  const handleDelete = (id) => {
    if (window.confirm("Bu kursni o‘chirmoqchimisiz?")) {
      deleteCourse(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Courses</h1>
        <Link
          to="/admin/courses/new"
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition font-medium"
        >
          Add Course
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <div
            key={c.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all flex flex-col overflow-hidden"
          >
            {c.image && (
              <img
                src={c.image}
                alt={c.title}
                className="h-48 w-full object-cover rounded-t-2xl"
              />
            )}

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{c.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-1">{c.description}</p>

              {/* BUTTONS */}
              <div className="mt-auto flex gap-3">
                <Link
                  to={`/admin/courses/${c.id}/edit`}
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 rounded-lg transition font-medium"
                >
                  ✏️ Edit
                </Link>
                <Link
                  to={`/admin/courses/${c.id}/modules`}
                  className="flex-1 text-center bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white py-2 rounded-lg transition font-medium"
                >
                  📦 Modules
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex-1 text-center bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white py-2 rounded-lg transition font-medium"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12 text-lg">
            Hozircha kurslar mavjud emas
          </p>
        )}
      </div>
    </div>
  );
}
