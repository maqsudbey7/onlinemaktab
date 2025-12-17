import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function CourseForm({ edit }) {
  const { courses, addCourse, updateCourse } = useCourses();
  const { courseId } = useParams();
  const navigate = useNavigate();

  // COURSE STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Boshlang'ich");
  const [teacher, setTeacher] = useState("");

  // IMAGE STATE
  const [image, setImage] = useState("");        // URL
  const [imageFile, setImageFile] = useState(null); // FILE
  const [preview, setPreview] = useState("");    // PREVIEW

  // MODULES
  const [modules, setModules] = useState([]);

  // EDIT MODE LOAD
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

  // FILE → BASE64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setImage(""); // URL ni tozalaymiz

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // SAVE
  const handleSave = (e) => {
    e.preventDefault();
    if (!title) return;

    const courseData = {
      title,
      description,
      level,
      teacher,
      image: imageFile ? preview : image,
      modules,
    };

    if (edit) updateCourse(courseId, courseData);
    else addCourse(courseData);

    navigate("/admin/courses");
  };

  return (
    <form
      onSubmit={handleSave}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow space-y-6"
    >
      <h1 className="text-2xl font-bold">
        {edit ? "Kursni tahrirlash" : "Yangi kurs qo‘shish"}
      </h1>

      {/* BASIC INFO */}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Kurs nomi"
        className="w-full border p-3 rounded"
      />

      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Kurs tavsifi"
        className="w-full border p-3 rounded"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={teacher}
          onChange={e => setTeacher(e.target.value)}
          placeholder="O‘qituvchi"
          className="w-full border p-3 rounded"
        />
        <input
          value={level}
          onChange={e => setLevel(e.target.value)}
          placeholder="Daraja (Boshlang'ich, O‘rta...)"
          className="w-full border p-3 rounded"
        />
      </div>

      {/* IMAGE SECTION */}
      <div className="space-y-3">
        <input
          value={image}
          onChange={e => {
            setImage(e.target.value);
            setPreview(e.target.value);
            setImageFile(null);
          }}
          placeholder="Rasm URL (ixtiyoriy)"
          className="w-full border p-3 rounded"
        />

        <div className="text-center text-gray-400 font-semibold">YOKI</div>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-3 rounded"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-48 w-full object-cover rounded-lg border"
          />
        )}
      </div>

      {/* MODULES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Modullar</h2>

        {modules.map((mod, i) => (
          <div key={i} className="border p-4 rounded space-y-3">
            <input
              value={mod.title}
              onChange={e => {
                const copy = [...modules];
                copy[i].title = e.target.value;
                setModules(copy);
              }}
              placeholder={`Modul ${i + 1} nomi`}
              className="w-full border p-2 rounded"
            />

            {/* LESSONS */}
            {mod.lessons?.map((lesson, j) => (
              <div key={j} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  value={lesson.title}
                  onChange={e => {
                    const copy = [...modules];
                    copy[i].lessons[j].title = e.target.value;
                    setModules(copy);
                  }}
                  placeholder="Dars nomi"
                  className="border p-2 rounded"
                />
                <input
                  value={lesson.video}
                  onChange={e => {
                    const copy = [...modules];
                    copy[i].lessons[j].video = e.target.value;
                    setModules(copy);
                  }}
                  placeholder="Video URL"
                  className="border p-2 rounded"
                />
                <input
                  value={lesson.pdf || ""}
                  onChange={e => {
                    const copy = [...modules];
                    copy[i].lessons[j].pdf = e.target.value;
                    setModules(copy);
                  }}
                  placeholder="PDF URL (ixtiyoriy)"
                  className="border p-2 rounded"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                const copy = [...modules];
                copy[i].lessons = copy[i].lessons || [];
                copy[i].lessons.push({
                  title: "",
                  video: "",
                  pdf: "",
                  time: "5:00",
                });
                setModules(copy);
              }}
              className="text-green-600 underline text-sm"
            >
              ➕ Dars qo‘shish
            </button>
          </div>
        ))}
{/* 
        <button
          type="button"
          onClick={() =>
            setModules([...modules, { title: "", lessons: [] }])
          }
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ➕ Modul qo‘shish
        </button> */}
      </div>

      {/* SAVE */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {edit ? "Update Course" : "Create Course"}
      </button>
    </form>
  );
}
