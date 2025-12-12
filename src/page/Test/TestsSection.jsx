import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tests = [
  { 
    id: "matematika", 
    title: "Matematika", 
    questions: 50, 
    gradient: ["#3b82f6", "#2563eb"], 
    difficulty: "O‘rta", 
    new: true, 
    progress: 40, 
    icon: "📘" 
  },
  { 
    id: "fizika", 
    title: "Fizika", 
    questions: 40, 
    gradient: ["#10b981", "#047857"], 
    difficulty: "Qiyin", 
    new: false, 
    progress: 70, 
    icon: "🧪" 
  },
  { 
    id: "ingliz", 
    title: "Ingliz tili", 
    questions: 30, 
    gradient: ["#a78bfa", "#7c3aed"], 
    difficulty: "Oson", 
    new: false, 
    progress: 20, 
    icon: "🌍" 
  },
  { 
    id: "biologiya", 
    title: "Biologiya", 
    questions: 20, 
    gradient: ["#f472b6", "#db2777"], 
    difficulty: "O‘rta", 
    new: true, 
    progress: 0, 
    icon: "🧬" 
  },
];

export default function TestsSection() {
  const navigate = useNavigate();

  const handleStartTest = (testId) => {
    navigate(`/test/${testId}`);
  };

  return (
    <section
      className="py-32 px-6 transition-colors duration-300"
      
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl dark:text-white font-extrabold text-gray-900 mb-4">
          Interaktiv testlar
        </h2>
        <p className="text-gray-600 text-lg md:text-xl dark:text-white/60">
          Har bir fan bo‘yicha bilimlaringizni sinab ko‘ring. Testlarni tugatgach, natijalarni darhol ko‘rishingiz mumkin.
        </p>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {tests.map((test, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer group"
            onClick={() => handleStartTest(test.id)}
          >
            <div
              className="absolute inset-0 rounded-xl transition-opacity duration-300 group-hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${test.gradient[0]}, ${test.gradient[1]})` }}
            ></div>

            <div className="relative p-6 flex flex-col items-start z-10">
              <div className="absolute top-4 right-4 text-4xl">{test.icon}</div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:underline">{test.title}</h3>
              <p className="text-white/80 mb-1">{test.questions}+ savollar</p>
              <p className="text-white/70 mb-2">
                Qiyinchilik: <span className="font-semibold">{test.difficulty}</span>
              </p>

              <div className="w-full bg-white/20 h-2 rounded-full mb-4">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${test.progress}%` }}
                ></div>
              </div>

              <button className="px-5 py-2 bg-white/20 text-white font-semibold rounded-lg shadow hover:bg-white/40 transition">
                Boshlash
              </button>
            </div>

            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
