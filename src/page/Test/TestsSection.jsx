import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300">
      <BackgroundLogos />

      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Interaktiv testlar
        </h2>
        <p className="text-gray-600 dark:text-white/60 text-base sm:text-lg md:text-xl">
          Har bir fan bo‘yicha bilimlaringizni sinab ko‘ring. Testlarni tugatgach, natijalarni darhol ko‘rishingiz mumkin.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {tests.map((test, index) => (
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
            onClick={() => handleStartTest(test.id)}
          >
            {/* Gradient background */}
            <div
              className="absolute inset-0 rounded-2xl transition-opacity duration-300 group-hover:opacity-95"
              style={{ background: `linear-gradient(135deg, ${test.gradient[0]}, ${test.gradient[1]})` }}
            ></div>

            {/* Content */}
            <div className="relative p-5 sm:p-6 z-10 flex flex-col">
              <div className="absolute top-4 right-4 text-3xl sm:text-4xl">{test.icon}</div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:underline">
                {test.title}
              </h3>

              <p className="text-white/80 text-sm sm:text-base mb-1">{test.questions}+ savollar</p>
              <p className="text-white/70 text-sm sm:text-base mb-3">
                Qiyinchilik: <span className="font-semibold">{test.difficulty}</span>
              </p>

              {/* Progress bar */}
              <div className="w-full bg-white/20 h-2 rounded-full mb-4">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${test.progress}%` }}
                ></div>
              </div>

              {/* Button */}
              <button className="mt-auto px-4 py-2 sm:px-5 sm:py-2 bg-white/20 text-white font-semibold rounded-lg shadow hover:bg-white/40 transition">
                Boshlash
              </button>
            </div>

            {/* Decorative blurred shapes */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -left-4 w-28 h-28 bg-white/5 rounded-full blur-3xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
