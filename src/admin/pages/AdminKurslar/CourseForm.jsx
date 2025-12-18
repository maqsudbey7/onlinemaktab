// CourseForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function CourseForm({ edit }) {
  const { courses, addCourse, updateCourse } = useCourses();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Boshlang'ich");
  const [teacher, setTeacher] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [modules, setModules] = useState([]);

  useEffect(() => {
    if (edit && courseId) {
      const course = courses.find(c => c.id === parseInt(courseId));
      if (course) {
        setTitle(course.title || "");
        setDescription(course.description || "");
        setLevel(course.level || "Boshlang'ich");
        setTeacher(course.teacher || "");
        setImage(course.image || "");
        setPreview(course.image || "");
        setModules(course.modules || []);
      }
    }
  }, [edit, courseId, courses]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImage("");
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title) return;
    const courseData = { title, description, level, teacher, image: imageFile ? preview : image, modules };
    edit ? updateCourse(courseId, courseData) : addCourse(courseData);
    navigate("/admin/courses");
  };

  return (
    <form
      onSubmit={handleSave}
      className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow space-y-6"
    >
      <h1 className="text-2xl font-bold dark:text-white">
        {edit ? "Kursni tahrirlash" : "Yangi kurs qo‘shish"}
      </h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Kurs nomi"
        className="w-full border p-3 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Kurs tavsifi"
        className="w-full border p-3 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={teacher}
          onChange={e => setTeacher(e.target.value)}
          placeholder="O‘qituvchi"
          className="w-full border p-3 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <input
          value={level}
          onChange={e => setLevel(e.target.value)}
          placeholder="Daraja (Boshlang'ich, O‘rta...)"
          className="w-full border p-3 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* IMAGE SECTION */}
      <div className="space-y-3">
        <input
          value={image}
          onChange={e => { setImage(e.target.value); setPreview(e.target.value); setImageFile(null); }}
          placeholder="Rasm URL (ixtiyoriy)"
          className="w-full border p-3 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <div className="text-center text-gray-400 font-semibold dark:text-gray-300">YOKI</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-3 rounded bg-gray-50 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {preview && <img src={preview} alt="Preview" className="h-48 w-full object-cover rounded-lg border dark:border-gray-700" />}
      </div>

      {/* MODULES SECTION */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold dark:text-white">Modullar</h2>
        {modules.map((mod, i) => (
          <div key={i} className="border p-4 rounded-xl space-y-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <input
              value={mod.title}
              onChange={e => { const copy = [...modules]; copy[i].title = e.target.value; setModules(copy); }}
              placeholder={`Modul ${i + 1} nomi`}
              className="w-full border p-2 rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {mod.lessons?.map((lesson, j) => (
              <div key={j} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  value={lesson.title}
                  onChange={e => { const copy = [...modules]; copy[i].lessons[j].title = e.target.value; setModules(copy); }}
                  placeholder="Dars nomi"
                  className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  value={lesson.video}
                  onChange={e => { const copy = [...modules]; copy[i].lessons[j].video = e.target.value; setModules(copy); }}
                  placeholder="Video URL"
                  className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <input
                  value={lesson.pdf || ""}
                  onChange={e => { const copy = [...modules]; copy[i].lessons[j].pdf = e.target.value; setModules(copy); }}
                  placeholder="PDF URL (ixtiyoriy)"
                  className="border p-2 rounded bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const copy = [...modules];
                copy[i].lessons = copy[i].lessons || [];
                copy[i].lessons.push({ title: "", video: "", pdf: "", time: "5:00" });
                setModules(copy);
              }}
              className="text-green-600 underline text-sm"
            >
              ➕ Dars qo‘shish
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 rounded-lg transition"
      >
        {edit ? "Update Course" : "Create Course"}
      </button>
    </form>
  );
}
