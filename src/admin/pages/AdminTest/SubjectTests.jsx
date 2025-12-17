    import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTests } from "../../../context/TestContext";

export default function SubjectTests() {
  const { subjectId } = useParams();
  const { subjects, addTest } = useTests();

  const subject = subjects.find(s => s.id === +subjectId);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(10);

  if (!subject) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{subject.title}</h1>

      <div className="flex gap-2 my-4">
        <input
          placeholder="Test nomi"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="number"
          value={time}
          onChange={e => setTime(+e.target.value)}
          className="border p-2 rounded w-32"
        />
        <button
          onClick={() => {
            addTest(subject.id, { title, time });
            setTitle("");
            setTime(10);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Test
        </button>
      </div>
    </div>
  );
}
