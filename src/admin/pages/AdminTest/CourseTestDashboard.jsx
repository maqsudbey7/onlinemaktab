// src/admin/tests/CourseTestDashboard.jsx
import React, { useState, useEffect } from "react";
import { useCourses } from "../../context/CourseContext";

export default function CourseTestDashboard() {
  const { courses, addCourse, addTest, updateTest, addQuestion, deleteQuestion } = useCourses();

  // ===== FAN STATE =====
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("O‘rta");
  const [editingCourseId, setEditingCourseId] = useState(null);

  // ===== TEST STATE =====
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [testTitle, setTestTitle] = useState("");
  const [difficulty, setDifficulty] = useState("O‘rta");
  const [duration, setDuration] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ question: "", options: ["", "", "", ""], answer: "", time: "1:00" });
  const [editingTestId, setEditingTestId] = useState(null);

  // ===== FAN FUNCTIONS =====
  const handleAddCourse = () => {
    if (!title) return;
    addCourse({ title, level });
    setTitle("");
    setLevel("O‘rta");
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course.id);
    setTitle(course.title);
    setLevel(course.level);
  };

  const handleSaveCourse = () => {
    if (editingCourseId) {
      const courseData = { title, level };
      const courseIndex = courses.findIndex(c => c.id === editingCourseId);
      if (courseIndex !== -1) {
        courses[courseIndex] = { ...courses[courseIndex], ...courseData };
      }
      setEditingCourseId(null);
    } else handleAddCourse();
    setTitle("");
    setLevel("O‘rta");
  };

  // ===== TEST FUNCTIONS =====
  const handleSelectCourse = (courseId) => {
    setCurrentCourseId(courseId);
    setTestTitle("");
    setDifficulty("O‘rta");
    setDuration(10);
    setQuestions([]);
    setEditingTestId(null);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    setNewQuestion({ question: "", options: ["", "", "", ""], answer: "", time: "1:00" });
  };

  const handleSaveTest = () => {
    if (!currentCourseId || !testTitle) return;
    const data = { title: testTitle, difficulty, duration, questions };
    if (editingTestId) updateTest(currentCourseId, editingTestId, data);
    else addTest(currentCourseId, data);

    setTestTitle("");
    setDifficulty("O‘rta");
    setDuration(10);
    setQuestions([]);
    setEditingTestId(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* ===== FAN YARATISH ===== */}
      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-xl font-bold">Fan qo‘shish / tahrirlash</h2>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Fan nomi" className="w-full border p-2 rounded" />
        <select value={level} onChange={e => setLevel(e.target.value)} className="w-full border p-2 rounded">
          <option>Boshlang'ich</option>
          <option>O‘rta</option>
          <option>Qiyin</option>
        </select>
        <button onClick={handleSaveCourse} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {editingCourseId ? "Fanni yangilash" : "Fan qo‘shish"}
        </button>
      </div>

      {/* ===== FANLAR RO‘YXATI ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-4 rounded shadow space-y-2">
            <h3 className="font-semibold text-lg">{course.title} ({course.level})</h3>
            <div className="flex gap-2">
              <button onClick={() => handleEditCourse(course)} className="text-blue-600 underline">Tahrirlash</button>
              <button onClick={() => handleSelectCourse(course.id)} className="text-green-600 underline">Testlar</button>
            </div>

            {/* TESTLAR */}
            {currentCourseId === course.id && (
              <div className="mt-2 border-t pt-2 space-y-2">
                <h4 className="font-semibold">Test qo‘shish / tahrirlash</h4>
                <input value={testTitle} onChange={e => setTestTitle(e.target.value)} placeholder="Test nomi" className="w-full border p-2 rounded" />
                <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} placeholder="Davomiyligi (minut)" className="w-full border p-2 rounded" />
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full border p-2 rounded">
                  <option>Oson</option>
                  <option>O‘rta</option>
                  <option>Qiyin</option>
                </select>

                {/* Savollar */}
                <div className="border p-2 rounded space-y-2">
                  <h5 className="font-bold">Savol qo‘shish</h5>
                  <input value={newQuestion.question} onChange={e => setNewQuestion({ ...newQuestion, question: e.target.value })} placeholder="Savol" className="w-full border p-2 rounded" />
                  {newQuestion.options.map((opt, i) => (
                    <input key={i} value={opt} onChange={e => { const o = [...newQuestion.options]; o[i] = e.target.value; setNewQuestion({ ...newQuestion, options: o }); }} placeholder={`Javob ${i+1}`} className="w-full border p-2 rounded" />
                  ))}
                  <input value={newQuestion.answer} onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })} placeholder="To‘g‘ri javob" className="w-full border p-2 rounded" />
                  <input value={newQuestion.time} onChange={e => setNewQuestion({ ...newQuestion, time: e.target.value })} placeholder="Savol vaqti mm:ss" className="w-full border p-2 rounded" />
                  <button type="button" onClick={handleAddQuestion} className="bg-green-500 text-white px-3 py-1 rounded">Savol qo‘shish</button>
                </div>

                {/* Savollar ro‘yxati */}
                {questions.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {questions.map(q => (
                      <div key={q.id} className="flex justify-between border p-2 rounded">
                        <div>
                          <p className="font-semibold">{q.question} ({q.time})</p>
                          <ul className="list-disc ml-5">
                            {q.options.map((o, i) => <li key={i}>{o} {o === q.answer && <span className="text-green-500">(To‘g‘ri)</span>}</li>)}
                          </ul>
                        </div>
                        <button onClick={() => { deleteQuestion(currentCourseId, editingTestId || Date.now(), q.id); setQuestions(questions.filter(qq => qq.id !== q.id)) }} className="text-red-500">X</button>
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={handleSaveTest} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-2">
                  {editingTestId ? "Yangilash" : "Testni saqlash"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
