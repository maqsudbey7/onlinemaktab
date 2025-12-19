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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold dark:text-white">Courses</h1>

        <Link
          to="/admin/courses/new"
          className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow transition font-medium"
        >
          ➕ Add Course
        </Link>
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition flex flex-col overflow-hidden"
          >
            {/* Image */}
            {c.image ? (
              <img
                src={c.image}
                alt={c.title}
                className="h-44 sm:h-48 w-full object-cover"
              />
            ) : (
              <div className="h-44 sm:h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-lg font-semibold dark:text-white mb-1">
                {c.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                {c.description}
              </p>

              {/* Buttons */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Link
                  to={`/admin/courses/${c.id}/edit`}
                  className="text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium"
                >
                  ✏️ Edit
                </Link>

                <Link
                  to={`/admin/courses/${c.id}/modules`}
                  className="text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium"
                >
                  📦 Modules
                </Link>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state */}
        {courses.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-16 text-lg">
            Hozircha kurslar mavjud emas
          </p>
        )}
      </div>
    </div>
  );
}
