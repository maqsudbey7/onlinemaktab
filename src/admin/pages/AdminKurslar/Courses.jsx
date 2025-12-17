import React from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function Courses() {
  const { courses } = useCourses();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <Link to="/admin/courses/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
          Add Course
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col"
          >
            <img
              src={c.image}
              alt={c.title}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />

            <h3 className="text-lg font-semibold text-gray-900">{c.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{c.description}</p>

            {/* BUTTONLAR */}
            <div className="mt-auto flex gap-3">
              <Link
                to={`/admin/courses/${c.id}/edit`}
                className ="flex-1 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                ✏️ Edit
              </Link>

              <Link
                to={`/admin/courses/${c.id}/modules`}
                className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                📦 Modules
              </Link>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}
