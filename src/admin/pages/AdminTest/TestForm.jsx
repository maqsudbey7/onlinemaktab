// src/admin/tests/TestForm.jsx
import React, { useState, useEffect } from "react";
import { useCourses } from "../../../context/CourseContext";
import { useNavigate, useParams } from "react-router-dom";

export default function TestForm({ edit }) {
  const { courses, addTest, updateTest, addQuestion, deleteQuestion } = useCourses();
  const { courseId, testId } = useParams();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === parseInt(courseId));
  if (!course) return <p>Fan topilmadi</p>;

  const existingTest = edit && testId ? course.tests?.find(t => t.id === parseInt(testId)) : null;

  // Form state
  const [title, setTitle] = useState(existingTest?.title || "");
  const [duration, setDuration] = useState(existingTest?.duration || 10);
  const [difficulty, setDifficulty] = useState(existingTest?.difficulty || "O‘rta");
  const [questions, setQuestions] = useState(existingTest?.questions || []);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
    time: "1:00",
  });

  useEffect(() => {
    if (edit && existingTest) {
      setTitle(existingTest.title);
      setDuration(existingTest.duration);
      setDifficulty(existingTest.difficulty);
      setQuestions(existingTest.questions || []);
    }
  }, [edit, existingTest]);

  const handleAddQuestion = () => {
    if (!edit) {
      // Yangi test hali saqlanmagan, faqat local state ga qo‘shamiz
      setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    } else {
      addQuestion(course.id, existingTest.id, { ...newQuestion });
      setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    }
    setNewQuestion({ question: "", options: ["", "", "", ""], answer: "", time: "1:00" });
  };

  const handleOptionChange = (i, value) => {
    const opts = [...newQuestion.options];
    opts[i] = value;
    setNewQuestion({ ...newQuestion, options: opts });
  };

  const handleSave = e => {
    e.preventDefault();
    const testData = { title, duration, difficulty, questions };

    if (edit) {
      updateTest(course.id, existingTest.id, testData);
    } else {
      // Yangi test qo‘shish
      const newTestId = Date.now();
      addTest(course.id, { ...testData, id: newTestId });
    }
    navigate(`/admin/tests/${course.id}`);
  };

  return (
    <form onSubmit={handleSave} className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">{edit ? "Testni tahrirlash" : "Yangi Test yaratish"}</h2>

      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Test nomi" className="w-full border p-2 rounded" />
      <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} placeholder="Davomiyligi (minut)" className="w-full border p-2 rounded" />
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full border p-2 rounded">
        <option>Oson</option>
        <option>O‘rta</option>
        <option>Qiyin</option>
      </select>

      {/* Savol qo‘shish */}
      <div className="border p-3 rounded space-y-2">
        <h3 className="font-bold mb-2">Savol qo‘shish</h3>
        <input value={newQuestion.question} onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })} placeholder="Savol" className="w-full border p-2 rounded mb-2" />
        {newQuestion.options.map((opt, i) => (
          <input key={i} value={opt} onChange={e => handleOptionChange(i, e.target.value)} placeholder={`Javob variant ${i + 1}`} className="w-full border p-2 rounded mb-1" />
        ))}
        <input value={newQuestion.answer} onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })} placeholder="To‘g‘ri javob" className="w-full border p-2 rounded mb-1" />
        <input value={newQuestion.time} onChange={e => setNewQuestion({ ...newQuestion, time: e.target.value })} placeholder="Savol vaqti (mm:ss)" className="w-full border p-2 rounded mb-2" />
        <button type="button" onClick={handleAddQuestion} className="bg-green-500 text-white px-3 py-1 rounded">Savol qo‘shish</button>
      </div>

      {/* Savollar ro‘yxati */}
      <div>
        <h3 className="font-bold mb-2">Savollar ro‘yxati</h3>
        {questions.map(q => (
          <div key={q.id} className="border p-2 rounded mb-1 flex justify-between items-start">
            <div>
              <p className="font-semibold">{q.question} ({q.time})</p>
              <ul className="list-disc ml-5">
                {q.options.map((opt, i) => (
                  <li key={i}>{opt} {opt === q.answer && <span className="text-green-500">(To‘g‘ri)</span>}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => { 
              if (edit) deleteQuestion(course.id, existingTest.id, q.id); 
              setQuestions(questions.filter(qq => qq.id !== q.id)); 
            }} className="text-red-500 font-bold">X</button>
          </div>
        ))}
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">{edit ? "Yangilash" : "Saqlash"}</button>
    </form>
  );
}
