import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";

// Savollar misoli kategoriya bo‘yicha
const questionsByCategory = {
  ildizlar: [
    { id: 1, question: "√16 = ?", options: ["2","3","4","5"], answer: "4" },
    { id: 2, question: "√81 = ?", options: ["7","8","9","10"], answer: "9" },
  ],
  butun_sonlar: [
    { id: 1, question: "5 + 3 = ?", options: ["7","8","9","10"], answer: "8" },
    { id: 2, question: "7 - 2 = ?", options: ["4","5","6","7"], answer: "5" },
  ],
};

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const questions = questionsByCategory[category] || [];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [time, setTime] = useState(600); // 10 minut

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/result", { state: { answers, time: 0, username: "Maqsudbek", category } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answers, navigate, category]);

  const handleNext = () => {
    const updated = [...answers];
    updated[current] = selected;
    setAnswers(updated);
    setSelected("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/result", { state: { answers: updated, time, username: "Maqsudbek", category } });
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!questions.length) {
    return <div className="text-center py-20 text-red-500">Savollar topilmadi</div>;
  }

  return (
    <div className="max-w-2xl mx-auto my-6 p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <BackgroundLogos/>
      <h1 className="text-2xl font-semibold mb-4 text-center">{category}</h1>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
        <motion.div
          className="h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
          animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

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
            {questions[current].options.map(opt => (
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
              selected ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300 cursor-not-allowed dark:bg-gray-600"
            } transition-colors duration-300`}
          >
            {current === questions.length - 1 ? "Tugatish" : "Keyingi →"}
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between text-gray-600 dark:text-gray-400 mb-4">
        <div>Joriy savol: {current + 1}</div>
        <div>Jami savollar: {questions.length}</div>
        <div>Qolgan vaqt: {formatTime(time)}</div>
      </div>
    </div>
  );
}
