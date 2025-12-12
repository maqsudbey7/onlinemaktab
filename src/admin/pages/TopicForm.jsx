import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function TopicForm() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const save = async e => {
    e.preventDefault();
    try {
      await adminApi.post(`/modules/${moduleId}/topics`, { title });
      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={save} className="max-w-lg p-4 bg-white rounded shadow">
      <h2 className="text-xl mb-4 font-bold">New Topic</h2>

      <label className="block mb-2 font-medium">Title</label>
      <input
        className="w-full border p-2 rounded mb-4"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
