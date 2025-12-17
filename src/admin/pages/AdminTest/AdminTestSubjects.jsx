import React, { useState } from "react";
import { useTests } from "../../../context/TestContext";
import { useNavigate } from "react-router-dom";

export default function AdminTestSubjects() {
  const { subjects, addSubject } = useTests();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [level, setLevel] = useState("oson");

  const createSubject = () => {
    if (!title) return;
    addSubject({ title, desc, level });
    setTitle("");
    setDesc("");
    setLevel("oson");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Fanlari</h1>

      {/* FAN YARATISH */}
      <div className="border p-4 rounded mb-6 space-y-2">
        <input
          placeholder="Fan nomi"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Tavsif"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option value="oson">Oson</option>
          <option value="ortacha">O‘rtacha</option>
          <option value="qiyin">Qiyin</option>
        </select>

        <button
          onClick={createSubject}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Fan yaratish
        </button>
      </div>

      {/* FANLAR */}
      <div className="grid md:grid-cols-3 gap-4">
        {subjects.map(s => (
          <div
            key={s.id}
            onClick={() => navigate(`/admin/tests/${s.id}`)}
            className="border p-4 rounded shadow cursor-pointer hover:shadow-md"
          >
            <h2 className="font-bold text-lg">{s.title}</h2>
            <p className="text-sm">{s.desc}</p>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {s.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
