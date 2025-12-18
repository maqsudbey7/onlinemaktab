import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function CreateTest() {
  const { subjectId } = useParams();
  const { addTestQuestion } = useCourses();
  const nav = useNavigate();

  const [t, setT] = useState({
    question: "", A:"",B:"",C:"",D:"",
    correct:"A", time:30, score:1
  });

  const submit = () => {
    addTestQuestion(+subjectId, t);
    nav(`/admin/tests/${subjectId}`);
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl space-y-4 mt-8">
      <button
        onClick={() => nav(-1)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Orqaga
      </button>

      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Savol Qo‘shish</h1>

      <input
        placeholder="Savol"
        className="input w-full bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        value={t.question}
        onChange={(e) => setT({ ...t, question: e.target.value })}
      />

      {["A","B","C","D"].map((v) => (
        <input
          key={v}
          placeholder={`${v} variant`}
          className="input w-full bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          value={t[v]}
          onChange={(e) => setT({ ...t, [v]: e.target.value })}
        />
      ))}

      <select
        className="input w-full bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        value={t.correct}
        onChange={(e) => setT({ ...t, correct: e.target.value })}
      >
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
      </select>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="number"
          placeholder="Vaqt (sek)"
          className="input w-full bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          value={t.time}
          onChange={(e) => setT({ ...t, time: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Ball"
          className="input w-full bg-gray-100 dark:bg-gray-700 rounded-xl p-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          value={t.score}
          onChange={(e) => setT({ ...t, score: +e.target.value })}
        />
      </div>

      <button
        onClick={submit}
        className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg transition"
      >
        Save
      </button>
    </div>
  );
}
