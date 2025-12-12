// src/admin/pages/CourseForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function CourseForm({ edit }) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (edit && courseId) {
      // fetch course
      adminApi.get(`/courses/${courseId}`).then(res => {
        setTitle(res.data.title);
      }).catch(()=>{});
    }
  }, [edit, courseId]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        await adminApi.put(`/courses/${courseId}`, { title });
      } else {
        await adminApi.post("/courses", { title });
      }
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">{edit ? "Edit Course" : "New Course"}</h1>
      <form onSubmit={handleSave} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-sm">Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border rounded p-2" />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">{edit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
