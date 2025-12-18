import React from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function TestSubjects() {
  const { testSubjects, deleteTestSubject } = useCourses();

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {testSubjects.map((s) => (
        <div
          key={s.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <div className="h-48 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <img
              src={s.image || "https://via.placeholder.com/150"}
              alt={s.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-5 flex flex-col justify-between h-56">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{s.name}</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Qiyinlik: <span className="font-medium">{s.level}</span></p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Testlar: <span className="font-medium">{s.tests.length}</span></p>
            </div>

            <div className="mt-4 flex gap-3">
              <Link
                to={`/admin/tests/${s.id}`}
                className="flex-1 py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
              >
                View Tests
              </Link>
              <button
                onClick={() => {
                  if (window.confirm("Rostdan o‘chirmoqchimisiz?")) deleteTestSubject(+s.id);
                }}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}

      <Link
        to="/admin/tests/create"
        className="flex items-center justify-center col-span-full border-2 border-dashed rounded-xl text-xl p-6 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        + Fan qo‘shish
      </Link>
    </div>
  );
}
