// AddCourseForm.jsx
import React, { useState } from "react";
import { useCourses } from "../../context/CourseContext";

export default function AddCourseForm() {
  const { addCourse } = useCourses();
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title) return;
    addCourse({ title });
    setTitle("");
  };

  return (
    <div className="space-y-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Course Title"
        className="border p-2 rounded w-full"
      />
      <button onClick={handleAdd} className="bg-green-600 text-white px-3 py-1 rounded">
        Add Course
      </button>
    </div>
  );
}
