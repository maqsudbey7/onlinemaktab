import React, { useState } from "react";
import { useCourses } from "../../../context/CourseContext";
import { useNavigate } from "react-router-dom";

export default function CreateSubject() {
  const { addTestSubject } = useCourses();
  const nav = useNavigate();

  const defaultImage = "data:image/jpeg;base64,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"; // truncated

  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    imageFile: null,
    level: "Easy"
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, imageFile: file });
    }
  };

  const submit = () => {
    let finalImage = form.imageUrl;

    if (!finalImage && form.imageFile) {
      // FileReader yordamida base64 ga o‘tkazamiz
      const reader = new FileReader();
      reader.onloadend = () => {
        addTestSubject({ ...form, image: reader.result });
        nav("/admin/tests");
      };
      reader.readAsDataURL(form.imageFile);
      return;
    }

    if (!finalImage && !form.imageFile) {
      finalImage = defaultImage;
    }

    addTestSubject({ ...form, image: finalImage });
    nav("/admin/tests");
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Yangi Fan Qo‘shish
      </h1>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Fan nomi"
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Rasm URL"
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-gray-900 dark:text-gray-100"
        />

        <select
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>

      <button
        onClick={submit}
        className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
      >
        Create
      </button>
    </div>
  );
}
