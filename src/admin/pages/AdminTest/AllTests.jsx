// src/admin/pages/AdminTest/AllTests.jsx
import React, { useState } from "react";
import { useCourses } from "../../../context/CourseContext";
import { useNavigate } from "react-router-dom";

export default function AllTests() {
  const { courses, deleteTest } = useCourses();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");

  const tests = courses.flatMap(course =>
    course.tests?.map(test => ({
      ...test,
      courseId: course.id,
      courseTitle: course.title,
    })) || []
  );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold">Barcha Testlar</h1>

        {/* TEST YARATISH */}
        <div className="flex gap-2">
          <select
            className="border p-2 rounded"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Kurs tanlang</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <button
            disabled={!selectedCourse}
            onClick={() =>
              navigate(`/admin/courses/${selectedCourse}/tests`)
            }
            className={`px-4 py-2 rounded text-white ${
              selectedCourse
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            + Test yaratish
          </button>
        </div>
      </div>

      {/* TESTLAR */}
      {tests.length === 0 && <p>Hozircha testlar yo‘q</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map(test => (
          <div key={test.id} className="border rounded p-4 shadow">
            <h2 className="font-bold text-lg">{test.title}</h2>
            <p className="text-sm">Kurs: {test.courseTitle}</p>
            <p className="text-sm">Vaqt: {test.duration} daqiqa</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() =>
                  navigate(`/admin/courses/${test.courseId}/tests/${test.id}`)
                }
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Savollar
              </button>

              <button
                onClick={() => deleteTest(test.courseId, test.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                O‘chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
