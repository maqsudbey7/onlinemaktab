import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function VideoForm() {
  const { topicId } = useParams();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const save = async e => {
    e.preventDefault();
    await adminApi.post(`/topics/${topicId}/videos`, { title, url });
    navigate(-1);
  };

  return (
    <form onSubmit={save} className="max-w-lg space-y-4">
      <div>
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)}
          className="w-full border p-2 rounded" />
      </div>
      <div>
        <label>Video URL</label>
        <input value={url} onChange={e=>setUrl(e.target.value)}
          className="w-full border p-2 rounded" />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
    </form>
  );
}
