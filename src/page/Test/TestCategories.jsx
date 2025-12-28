import React from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";
import { FaCalculator, FaFlask } from "react-icons/fa";

const categoriesBySubject = {
  matematika: [
    { id: "ildizlar", title: "Ildizlar", questions: 10, icon: <FaCalculator size={40} />, gradient: ["#3b82f6", "#2563eb"], difficulty: "O‘rta"},
    { id: "butun_sonlar", title: "Butun sonlar", questions: 15, icon: <FaCalculator size={40} />, gradient: ["#3b82f6", "#2563eb"], difficulty: "Oson" },
  ],
  fizika: [
    { id: "mekanika", title: "Mekanika", questions: 12, icon: <FaFlask size={40} />, gradient: ["#10b981", "#047857"], difficulty: "Qiyin"},
    { id: "optika", title: "Optika", questions: 8, icon: <FaFlask size={40} />, gradient: ["#10b981", "#047857"], difficulty: "O‘rta"},
  ],
};

export default function TestCategories() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const categories = categoriesBySubject[subject] || [];

  if (!categories.length) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-500">Kategoriya topilmadi</p>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <BackgroundLogos />

      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          {subject.charAt(0).toUpperCase() + subject.slice(1)} kategoriyalari
        </h2>
        <p className="text-gray-600 dark:text-white/60 text-base sm:text-lg md:text-xl">
          O'zingizga kerakli kategoriyani tanlang va testni boshlang.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative rounded-3xl overflow-hidden cursor-pointer shadow-xl group hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            onClick={() => navigate(`/test/${subject}/${cat.id}`)}
          >
            {/* Gradient background */}
            <div
              className="absolute inset-0 rounded-3xl transition-all duration-500 group-hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})`,
              }}
            ></div>

            {/* Card content */}
            <div className="relative z-10 p-6 flex flex-col items-center text-center text-white">
              {/* Icon */}
              <div className="mb-4">{cat.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2 group-hover:underline">{cat.title}</h3>

              {/* Questions & Difficulty */}
              <p className="text-white/80 mb-1">{cat.questions}+ savollar</p>
              <p className="text-white/70 mb-4">
                Qiyinchilik: <span className="font-semibold">{cat.difficulty}</span>
              </p>

              {/* Progress bar */}
              

              {/* Start button */}
              <button className="px-6 py-2 bg-white/20 text-white font-semibold rounded-2xl shadow-lg hover:bg-white/40 transition">
                Boshlash
              </button>
            </div>

            {/* Decorative shapes */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-4xl"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
