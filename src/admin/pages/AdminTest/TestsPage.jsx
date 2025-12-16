import React from "react";
import { useCourses } from "../../../context/CourseContext";
import { useNavigate } from "react-router-dom";

export default function TestPage() {
  const { courses, deleteTest } = useCourses();
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Testlar</h1>
        <button
          onClick={() => navigate("/admin/tests/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Yangi test yaratish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-xl shadow p-4 flex flex-col hover:shadow-lg transition">
            <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
            <p className="text-sm text-gray-500 mb-4">Qiyinchilik: {course.difficulty || "O‘rta"}</p>

            {course.tests?.length > 0 ? (
              course.tests.map(test => (
                <div key={test.id} className="flex justify-between items-center border p-2 rounded mb-2">
                  <div>
                    <p className="font-semibold">{test.title}</p>
                    <p className="text-sm text-gray-500">{test.duration} minut</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/tests/${course.id}/${test.id}`)}
                      className="text-blue-600 underline"
                    >
                      Tahrirlash
                    </button>
                    <button
                      onClick={() => deleteTest(course.id, test.id)}
                      className="text-red-500 underline"
                    >
                      X
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">Testlar mavjud emas</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
