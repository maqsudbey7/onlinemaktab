// src/admin/pages/AdminKurslar/TestQuestions.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function TestQuestions() {
  const { courseId, testId } = useParams();
  const { courses, addQuestion, deleteQuestion } = useCourses();

  const course = courses.find(c => c.id === parseInt(courseId));
  const test = course?.tests?.find(t => t.id === parseInt(testId));

  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  if (!course || !test) return <p className="p-6">Test yoki Course topilmadi</p>;

  const handleAddQuestion = () => {
    if (!questionText) return;
    addQuestion(course.id, test.id, {
      text: questionText,
      options,
      correct: correctIndex,
    });
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{test.title} Savollar</h1>

      {/* Savol qo'shish */}
      <div className="border p-4 rounded mb-6">
        <input
          type="text"
          placeholder="Savol matni"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />

        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder={`Variant ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[i] = e.target.value;
                setOptions(newOpts);
              }}
              className="border p-2 rounded flex-1"
            />
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="correct"
                checked={correctIndex === i}
                onChange={() => setCorrectIndex(i)}
              />
              To'g'ri
            </label>
          </div>
        ))}

        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
        >
          Savol qo'shish
        </button>
      </div>

      {/* Savollar ro'yxati */}
      <div className="space-y-4">
        {test.questions?.map(q => (
          <div key={q.id} className="border rounded p-3 shadow relative">
            <p className="font-bold">{q.text}</p>
            <ul className="list-disc list-inside mt-1">
              {q.options.map((o, idx) => (
                <li
                  key={idx}
                  className={idx === q.correct ? "text-green-600 font-bold" : ""}
                >
                  {o || "—"}
                </li>
              ))}
            </ul>
            <button
              onClick={() => deleteQuestion(course.id, test.id, q.id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              O'chirish
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
