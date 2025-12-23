import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function Modules() {
  const { courseId } = useParams();
  const { courses, addModule, addLesson, deleteModule, deleteLesson } = useCourses();
  const course = courses.find(c => c.id === parseInt(courseId));

  const [moduleTitle, setModuleTitle] = useState("");
  const [lessonInputs, setLessonInputs] = useState({});

  if (!course) return <p className="text-red-500 dark:text-red-400">Kurs topilmadi!</p>;

  const handleAddModule = () => {
    if (!moduleTitle) return;
    addModule(course.id, { title: moduleTitle });
    setModuleTitle("");
  };

  const handleDeleteModule = (modId) => {
    if (window.confirm("Bu modulni o‘chirmoqchimisiz?")) {
      deleteModule(course.id, modId);
    }
  };

  const handleLessonChange = (modId, field, value) => {
    setLessonInputs(prev => ({
      ...prev,
      [modId]: { ...prev[modId], [field]: value }
    }));
  };

  const handleAddLesson = (modId) => {
    const lesson = lessonInputs[modId];
    if (!lesson?.title || !lesson?.video) return;
    // Qo‘shimcha maydonlar bilan
    addLesson(course.id, modId, {
      title: lesson.title,
      video: lesson.video,
      pdf: lesson.pdf || "",
      time: lesson.time || "5:00",
    });
    setLessonInputs(prev => ({ ...prev, [modId]: { title: "", video: "", pdf: "", time: "5:00" } }));
  };

  const handleDeleteLesson = (modId, lessonId) => {
    if (window.confirm("Bu darsni o‘chirmoqchimisiz?")) {
      deleteLesson(course.id, modId, lessonId);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold dark:text-white">{course.title} – Modules</h1>

      {/* MODULE QO‘SHISH */}
      <div className="flex gap-2 mb-6">
        <input
          value={moduleTitle}
          onChange={e => setModuleTitle(e.target.value)}
          placeholder="Module Title"
          className="flex-1 border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleAddModule}
          className="bg-green-600 hover:bg-green-700 text-white px-3 rounded transition"
        >
          Add Module
        </button>
      </div>

      {/* MODULE LIST */}
      {course.modules.map(mod => (
        <div
          key={mod.id}
          className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-blue-600">{mod.title}</h2>
            <button
              onClick={() => handleDeleteModule(mod.id)}
              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition font-medium"
            >
              🗑 Delete Module
            </button>
          </div>

          {/* LESSON INPUT */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <input
              value={lessonInputs[mod.id]?.title || ""}
              onChange={e => handleLessonChange(mod.id, "title", e.target.value)}
              placeholder="Lesson Title"
              className="flex-1 border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              value={lessonInputs[mod.id]?.video || ""}
              onChange={e => handleLessonChange(mod.id, "video", e.target.value)}
              placeholder="Video URL"
              className="flex-1 border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              value={lessonInputs[mod.id]?.pdf || ""}
              onChange={e => handleLessonChange(mod.id, "pdf", e.target.value)}
              placeholder="PDF URL (ixtiyoriy)"
              className="flex-1 border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              value={lessonInputs[mod.id]?.time || "5:00"}
              onChange={e => handleLessonChange(mod.id, "time", e.target.value)}
              placeholder="Time"
              className="flex-1 border p-2 rounded bg-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              onClick={() => handleAddLesson(mod.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 rounded transition"
            >
              Add Lesson
            </button>
          </div>

          {/* LESSON LIST */}
          <ul className="list-disc ml-5 dark:text-gray-200 space-y-1">
            {mod.lessons.map(l => (
              <li key={l.id} className="flex justify-between items-center">
                <span>
                  {l.title} —{" "}
                  <a
                    href={l.video}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 dark:text-blue-400 underline"
                  >
                    Video
                  </a>{" "}
                  {l.pdf && (
                    <>
                      |{" "}
                      <a
                        href={l.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-500 dark:text-green-400 underline"
                      >
                        PDF
                      </a>
                    </>
                  )}{" "}
                  | {l.time}
                </span>
                <button
                  onClick={() => handleDeleteLesson(mod.id, l.id)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition text-sm"
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
