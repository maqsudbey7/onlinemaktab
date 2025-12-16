// src/admin/tests/TestCardPage.jsx
import React from "react";
import { useCourses } from "../../../context/CourseContext";
import { useNavigate, useParams } from "react-router-dom";

export default function TestCardPage() {
  const { courseId } = useParams();
  const { courses, deleteTest } = useCourses();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === parseInt(courseId));
  if (!course) return <p>Fan topilmadi</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title} - Testlar</h1>

      <button
        onClick={() => navigate(`/admin/tests/${course.id}/new`)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mb-4"
      >
        Yangi test yaratish
      </button>

      {course.tests?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {course.tests.map(test => (
            <div key={test.id} className="bg-white p-4 rounded-xl shadow flex flex-col">
              <h2 className="text-lg font-semibold">{test.title}</h2>
              <p className="text-gray-500">Qiyinchilik: {test.difficulty}</p>
              <p className="text-gray-500">Davomiyligi: {test.duration} min</p>
              <div className="mt-auto flex gap-2">
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
          ))}
        </div>
      ) : (
        <p className="text-gray-400">Hozircha testlar mavjud emas</p>
      )}
    </div>
  );
}
