import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function TopicForm() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const save = async e => {
    e.preventDefault();
    await adminApi.post(`/modules/${moduleId}/topics`, { title });
    navigate(-1);
  };

  return (
    <form onSubmit={save} className="max-w-lg">
      <h2 className="text-xl mb-4">New Topic</h2>
      <input className="w-full border p-2 rounded" value={title}
        onChange={e => setTitle(e.target.value)} />
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
