import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";

const questions = [
  { id: 1, answer: "14" },
  { id: 2, answer: "12" },
  { id: 3, answer: "16" },
  { id: 4, answer: "5" },
  { id: 5, answer: "3" },
  { id: 6, answer: "13" },
  { id: 7, answer: "9" },
  { id: 8, answer: "3" },
  { id: 9, answer: "9" },
  { id: 10, answer: "3" },
];

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { answers, time, username } = state || {};

  if (!answers) {
    navigate("/"); 
    return null;
  }

  const correct = answers.filter((a, i) => a === questions[i].answer).length;
  const wrong = answers.filter((a, i) => a && a !== questions[i].answer).length;
  const unanswered = answers.filter((a) => !a).length;
  const percent = Math.round((correct / questions.length) * 100);
  const passed = percent >= 50;

  return (
    <div className=" flex items-center justify-center dark:from-gray-800 dark:to-gray-900 p-4 transition-colors duration-300">
      <BackgroundLogos/>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 transition-colors duration-300"
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">
          Oson Matematika
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">{new Date().toLocaleString()}</p>

        {/* Progress Circle */}
        <div className="flex justify-center mb-6">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full">
              <circle
                cx="72"
                cy="72"
                r="60"
                className="stroke-gray-200 dark:stroke-gray-700 fill-transparent stroke-8"
              />
              <motion.circle
                cx="72"
                cy="72"
                r="60"
                className={`${passed ? "stroke-green-500" : "stroke-red-500"} fill-transparent stroke-8`}
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={2 * Math.PI * 60 * (1 - percent / 100)}
                initial={{ strokeDashoffset: 2 * Math.PI * 60 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 60 * (1 - percent / 100) }}
                transition={{ duration: 1 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{percent}%</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">{passed ? "A" : "F"}</span>
            </div>
          </div>
        </div>

        <p className={`text-center text-xl font-semibold mb-4 ${passed ? "text-green-500" : "text-red-500"}`}>
          {passed ? "Muvaffaqiyatli" : "Muvaffaqiyatsiz"}
        </p>

        {/* Answer Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg shadow bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200">
            <p className="text-lg font-semibold">To‘g‘ri javoblar</p>
            <p className="text-2xl font-bold">{correct}</p>
          </div>
          <div className="p-4 rounded-lg shadow bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200">
            <p className="text-lg font-semibold">Noto‘g‘ri javoblar</p>
            <p className="text-2xl font-bold">{wrong}</p>
          </div>
          <div className="p-4 rounded-lg shadow bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
            <p className="text-lg font-semibold">Javobsiz savollar</p>
            <p className="text-2xl font-bold">{unanswered}</p>
          </div>
          <div className="p-4 rounded-lg shadow bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200">
            <p className="text-lg font-semibold">Jami savollar</p>
            <p className="text-2xl font-bold">{questions.length}</p>
          </div>
        </div>

        <p className="text-center mb-6 font-medium text-gray-700 dark:text-gray-200">
          Ismingiz: <span className="font-bold">{username}</span>
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/test")}
            className="bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors duration-300"
          >
            Qayta boshlash
          </button>
        </div>
      </motion.div>
    </div>
  );
}
