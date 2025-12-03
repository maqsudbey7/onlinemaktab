import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const tests = [
  { id: "matematika", title: "Matematika", questions: 50, color: "from-blue-400 to-blue-600", difficulty: "O‘rta", new: true, progress: 40, icon: "📘" },
  { id: "fizika", title: "Fizika", questions: 40, color: "from-green-400 to-green-600", difficulty: "Qiyin", new: false, progress: 70, icon: "🧪" },
  { id: "ingliz", title: "Ingliz tili", questions: 30, color: "from-purple-400 to-purple-600", difficulty: "Oson", new: false, progress: 20, icon: "🌍" },
  { id: "biologiya", title: "Biologiya", questions: 20, color: "from-pink-400 to-pink-600", difficulty: "O‘rta", new: true, progress: 0, icon: "🧬" },
];

export default function TestsSection() {
  const navigate = useNavigate();

  const handleStartTest = (testId) => {
    navigate(`/test/${testId}`);
  };

  return (
    <section className="py-32 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Interaktiv testlar
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
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
            className={`relative rounded-xl shadow-2xl overflow-hidden cursor-pointer group`}
            onClick={() => handleStartTest(test.id)}
          >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${test.color} opacity-70 group-hover:opacity-90 transition-opacity duration-300`}></div>

            {/* NEW Badge */}
           

            {/* Icon */}
            <div className="absolute top-4 right-4 text-white/30 text-4xl z-10">{test.icon}</div>

            <div className="relative p-6 flex flex-col items-start justify-between h-full z-10">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:underline">{test.title}</h3>
              <p className="text-white/80 mb-1">{test.questions}+ savollar</p>
              <p className="text-white/70 mb-2">Qiyinchilik: <span className="font-semibold">{test.difficulty}</span></p>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 h-2 rounded-full mb-4">
                <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: `${test.progress}%` }}></div>
              </div>

              <button className="px-5 py-2 bg-white/20 text-white font-semibold rounded-lg shadow hover:bg-white/40 transition">
                Boshlash
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-6 left-6 text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {test.questions} savolni taxminan 30 daqiqada yechishingiz mumkin
              </div>
            </div>

            {/* Decorative shapes */}
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
