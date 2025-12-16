import React, { useState } from "react";

export default function QuestionForm({ addQuestion }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState("1:00"); // default 1 daqiqa

  const handleOptionChange = (index, value) => {
    const copy = [...options];
    copy[index] = value;
    setOptions(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || !answer) return;

    addQuestion({
      question,
      options,
      answer,
      time,
    });

    // Reset
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setTime("1:00");
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded space-y-3 mb-4">
      <input
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Savol"
        className="w-full border p-2 rounded"
      />
      {options.map((opt, i) => (
        <input
          key={i}
          value={opt}
          onChange={e => handleOptionChange(i, e.target.value)}
          placeholder={`Variant ${i + 1}`}
          className="w-full border p-2 rounded"
        />
      ))}
      <input
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="To‘g‘ri javob"
        className="w-full border p-2 rounded"
      />
      <input
        value={time}
        onChange={e => setTime(e.target.value)}
        placeholder="Savol vaqti (mm:ss)"
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
        Savol qo‘shish
      </button>
    </form>
  );
}
