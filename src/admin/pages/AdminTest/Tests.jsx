// src/admin/pages/AdminKurslar/Tests.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function Tests() {
  const { courseId } = useParams();
  const { courses, addTest, deleteTest } = useCourses();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === parseInt(courseId));
  const [newTestTitle, setNewTestTitle] = useState("");
  const [newTestTime, setNewTestTime] = useState(10); // default 10 daqiqa

  if (!course) return <p className="p-6">Course topilmadi</p>;

  const handleAddTest = () => {
    if (!newTestTitle) return;
    addTest(course.id, { title: newTestTitle, duration: newTestTime });
    setNewTestTitle("");
    setNewTestTime(10);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title} Testlari</h1>

      {/* Test qo'shish */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Test nomi"
          value={newTestTitle}
          onChange={(e) => setNewTestTitle(e.target.value)}
          className="border p-2 rounded flex-1 min-w-[200px]"
        />
        <input
          type="number"
          placeholder="Vaqt (daqiqa)"
          value={newTestTime}
          onChange={(e) => setNewTestTime(parseInt(e.target.value))}
          className="border p-2 rounded w-32"
        />
        <button
          onClick={handleAddTest}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Qo'shish
        </button>
      </div>

      {/* Testlar ro'yxati */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {course.tests?.map(test => (
          <div
            key={test.id}
            className="border rounded p-4 shadow hover:shadow-md transition relative"
          >
            <h2 className="font-bold text-lg">{test.title}</h2>
            <p>Vaqt: {test.duration} daqiqa</p>

            <div className="mt-2 flex gap-2 flex-wrap">
              <button
                onClick={() => navigate(`/admin/courses/${course.id}/tests/${test.id}`)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Savollar
              </button>
              <button
                onClick={() => deleteTest(course.id, test.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                O'chirish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
