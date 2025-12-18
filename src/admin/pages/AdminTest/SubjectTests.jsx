import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function SubjectTests() {
  const { subjectId } = useParams();
  const { testSubjects, deleteTestQuestion } = useCourses();
  const nav = useNavigate();

  const subject = testSubjects.find((s) => s.id === +subjectId);
  if (!subject)
    return <p className="text-center text-red-500 mt-8 text-lg">Fan topilmadi</p>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Orqaga tugma */}
      <button
        onClick={() => nav(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition font-semibold"
      >
        ← Orqaga
      </button>

      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        {subject.name}
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {subject.tests.map((t) => (
          <div
            key={t.id}
            className="relative bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 p-5 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <p className="text-gray-800 dark:text-gray-100 font-semibold mb-3 text-lg">
              {t.question}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {["A","B","C","D"].map((v) => (
                <div
                  key={v}
                  className={`p-2 rounded-lg text-sm font-medium border ${
                    t.correct === v
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                  }`}
                >
                  {v}: {t[v]}
                </div>
              ))}
            </div>

            <div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm mb-3">
              <span>⏱ {t.time}s</span>
              <span>⭐ {t.score}</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm("Rostdan o‘chirmoqchimisiz?"))
                  deleteTestQuestion(+subjectId, +t.id);
              }}
              className="w-full py-2 mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <Link
        to={`/admin/tests/${subjectId}/create`}
        className="block w-full text-center py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg transition"
      >
        + Test qo‘shish
      </Link>
    </div>
  );
}
