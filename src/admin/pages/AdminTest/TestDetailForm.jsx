import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function TestDetailForm({ edit }) {
  const { courses, addTest, updateTest } = useCourses();
  const { courseId, testId } = useParams();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === parseInt(courseId));

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(10);
  const [difficulty, setDifficulty] = useState("O‘rta");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: "", options: ["", "", "", ""], answer: "" });

  useEffect(() => {
    if (edit && course && testId) {
      const test = course.tests.find(t => t.id === parseInt(testId));
      if (test) {
        setTitle(test.title);
        setDuration(test.duration);
        setDifficulty(test.difficulty);
        setQuestions(test.questions || []);
      }
    }
  }, [edit, course, testId]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    setNewQuestion({ question: "", options: ["", "", "", ""], answer: "" });
  };

  const handleOptionChange = (index, value) => {
    const opts = [...newQuestion.options];
    opts[index] = value;
    setNewQuestion({ ...newQuestion, options: opts });
  };

  const handleSave = e => {
    e.preventDefault();
    const testData = { title, duration, difficulty, questions };

    if (edit) updateTest(courseId, testId, testData);
    else addTest(courseId, testData);

    navigate("/admin/tests");
  };

  return (
    <form onSubmit={handleSave} className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h1 className="text-2xl font-bold">{edit ? "Testni tahrirlash" : "Yangi test qo‘shish"}</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Test nomi"
        className="w-full border p-3 rounded"
      />

      <input
        type="number"
        value={duration}
        onChange={e => setDuration(Number(e.target.value))}
        placeholder="Davomiyligi (minut)"
        className="w-full border p-3 rounded"
      />

      <select
        value={difficulty}
        onChange={e => setDifficulty(e.target.value)}
        className="w-full border p-3 rounded"
      >
        <option>Oson</option>
        <option>O‘rta</option>
        <option>Qiyin</option>
      </select>

      {/* Yangi savol */}
      <div className="border p-3 rounded space-y-2">
        <h3 className="font-bold mb-2">Yangi savol qo‘shish</h3>
        <input
          value={newQuestion.question}
          onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })}
          placeholder="Savol"
          className="w-full border p-2 rounded mb-2"
        />
        {newQuestion.options.map((opt, i) => (
          <input
            key={i}
            value={opt}
            onChange={e => handleOptionChange(i, e.target.value)}
            placeholder={`Javob variant ${i + 1}`}
            className="w-full border p-2 rounded mb-1"
          />
        ))}
        <input
          value={newQuestion.answer}
          onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })}
          placeholder="To‘g‘ri javob"
          className="w-full border p-2 rounded mb-2"
        />
        <button type="button" onClick={handleAddQuestion} className="bg-green-500 text-white px-3 py-1 rounded">
          Savol qo‘shish
        </button>
      </div>

      {/* Savollar ro‘yxati */}
      <div>
        <h3 className="font-bold mb-2">Savollar ro‘yxati</h3>
        {questions.map((q, idx) => (
          <div key={q.id} className="border p-2 rounded mb-1">
            <p className="font-semibold">{idx + 1}. {q.question}</p>
            <ul className="list-disc ml-5">
              {q.options.map((opt, i) => (
                <li key={i}>{opt} {opt === q.answer && <span className="text-green-500">(To‘g‘ri)</span>}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        {edit ? "Yangilash" : "Saqlash"}
      </button>
    </form>
  );
}
