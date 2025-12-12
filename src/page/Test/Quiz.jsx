import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const questions = [
  { id: 1, question: "1 + 13 = ?", options: ["14", "17", "15", "16"], answer: "14" },
  { id: 2, question: "5 + 7 = ?", options: ["11", "12", "13", "14"], answer: "12" },
  { id: 3, question: "8 x 2 = ?", options: ["16", "14", "12", "18"], answer: "16" },
  { id: 4, question: "9 - 4 = ?", options: ["4", "5", "6", "7"], answer: "5" },
  { id: 5, question: "6 / 2 = ?", options: ["2", "3", "4", "5"], answer: "3" },
  { id: 6, question: "7 + 6 = ?", options: ["12", "13", "14", "15"], answer: "13" },
  { id: 7, question: "3 x 3 = ?", options: ["6", "8", "9", "12"], answer: "9" },
  { id: 8, question: "10 - 7 = ?", options: ["2", "3", "4", "5"], answer: "3" },
  { id: 9, question: "4 + 5 = ?", options: ["8", "9", "10", "11"], answer: "9" },
  { id: 10, question: "12 / 4 = ?", options: ["2", "3", "4", "6"], answer: "3" },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [time, setTime] = useState(600); // 10 minut
  const navigate = useNavigate();

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/result", { state: { answers, time: 0, username: "Maqsudbek" } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, navigate]);

  const handleNext = () => {
    const updated = [...answers];
    updated[current] = selected;
    setAnswers(updated);
    setSelected("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/result", { state: { answers: updated, time, username: "Maqsudbek" } });
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="max-w-2xl mx-auto my-6 p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-semibold mb-4 text-center">Matematika</h1>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
        <motion.div
          className="h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
          animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Savol */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="p-6 rounded shadow mb-4 bg-white dark:bg-gray-800 transition-colors duration-300"
        >
          <div className="mb-2 font-medium text-gray-700 dark:text-gray-200">
            Savol {current + 1}: {questions[current].question}
          </div>
          <div className="flex flex-col gap-2">
            {questions[current].options.map((opt) => (
              <label
                key={opt}
                className={`border p-2 rounded cursor-pointer transition-colors
                  ${selected === opt 
                    ? "border-blue-500 bg-blue-100 dark:bg-blue-600 dark:text-white" 
                    : "border-gray-300 dark:border-gray-600 dark:text-gray-200"}`}
              >
                <input
                  type="radio"
                  className="mr-2"
                  name="option"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                />
                {opt}
              </label>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!selected}
            className={`mt-4 px-4 py-2 rounded text-white ${
              selected
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed dark:bg-gray-600"
            } transition-colors duration-300`}
          >
            {current === questions.length - 1 ? "Tugatish" : "Keyingi →"}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Test info */}
      <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-4">
        <div>Joriy savol: {current + 1}</div>
        <div>Jami savollar: {questions.length}</div>
        <div>Qolgan vaqt: {formatTime(time)}</div>
      </div>

      {/* Savollar navigatsiyasi */}
      <div className="flex gap-2 justify-center flex-wrap">
        {questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300
              ${current === idx 
                ? "bg-blue-500 text-white border-blue-500" 
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
