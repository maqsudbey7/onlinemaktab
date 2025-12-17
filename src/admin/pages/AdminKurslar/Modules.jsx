import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function Modules() {
  const { courseId } = useParams();
  const { courses, addModule, addLesson } = useCourses();
  const course = courses.find(c => c.id === parseInt(courseId));

  const [moduleTitle, setModuleTitle] = useState("");

  // 🔥 MUHIM: har bir modul uchun alohida lesson input
  const [lessonInputs, setLessonInputs] = useState({});

  if (!course) return <p>Kurs topilmadi!</p>;

  const handleAddModule = () => {
    if (!moduleTitle) return;
    addModule(course.id, { title: moduleTitle });
    setModuleTitle("");
  };

  const handleLessonChange = (modId, field, value) => {
    setLessonInputs(prev => ({
      ...prev,
      [modId]: {
        ...prev[modId],
        [field]: value
      }
    }));
  };

  const handleAddLesson = (modId) => {
    const lesson = lessonInputs[modId];
    if (!lesson?.title || !lesson?.video) return;

    addLesson(course.id, modId, lesson);

    // tozalash
    setLessonInputs(prev => ({
      ...prev,
      [modId]: { title: "", video: "" }
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {course.title} – Modules
      </h1>

      {/* MODULE QO‘SHISH */}
      <div className="flex gap-2 mb-6">
        <input
          value={moduleTitle}
          onChange={e => setModuleTitle(e.target.value)}
          placeholder="Module Title"
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={handleAddModule}
          className="bg-green-600 text-white px-3 rounded"
        >
          Add Module
        </button>
      </div>

      {/* MODULE LIST */}
      {course.modules.map(mod => (
        <div key={mod.id} className="bg-white p-4 mb-4 rounded shadow">
          <h2 className="font-bold text-blue-600 mb-2">{mod.title}</h2>

          {/* LESSON INPUT */}
          <div className="flex gap-2 mb-3">
            <input
              value={lessonInputs[mod.id]?.title || ""}
              onChange={e =>
                handleLessonChange(mod.id, "title", e.target.value)
              }
              placeholder="Lesson Title"
              className="border p-2 rounded flex-1"
            />
            <input
              value={lessonInputs[mod.id]?.video || ""}
              onChange={e =>
                handleLessonChange(mod.id, "video", e.target.value)
              }
              placeholder="Video URL"
              className="border p-2 rounded flex-1"
            />
            <button
              onClick={() => handleAddLesson(mod.id)}
              className="bg-green-500 text-white px-3 rounded"
            >
              Add Lesson
            </button>
          </div>

          {/* LESSON LIST */}
          <ul className="list-disc ml-5">
            {mod.lessons.map(l => (
              <li key={l.id}>
                {l.title} —{" "}
                <a
                  href={l.video}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  Video
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
