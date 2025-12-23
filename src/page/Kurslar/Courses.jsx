import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBook, FaSignal, FaUser, FaHeart, FaRegHeart } from "react-icons/fa";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";
import { courses } from "../../data/courses"; // sizning yangi courses.js faylingiz

export default function Courses() {
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Filter
  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  // Helper function: modul ichidagi lessonlarni jamlash
  const getTotalLessons = (course) => {
    if (!course.modules) return 0;
    return course.modules.reduce((sum, mod) => sum + (mod.lessons?.length || 0), 0);
  };

  return (
    <div className="py-12 px-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 transition-colors duration-300">
      <BackgroundLogos />
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-900 dark:text-white"
        >
          Bizning <span className="text-blue-600 dark:text-blue-400">Kurslar</span>
        </motion.h1>

        {/* Search input */}
        <div className="mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Fan nomi bo‘yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-5 py-3 rounded-xl border border-gray-300 shadow
                       focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        {/* Courses grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
            ❌ Hech qanday kurs topilmadi...
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((c) => {
              const isFavorite = favorites.includes(c.id);
              const totalLessons = getTotalLessons(c);

              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer group"
                >
                  {/* Favorite heart */}
                  <div
                    className="absolute top-3 right-3 text-xl z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(c.id);
                    }}
                  >
                    {isFavorite ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-300 dark:text-gray-400" />
                    )}
                  </div>

                  {/* Image */}
                  <div className="h-50 overflow-hidden relative">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    {/* <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white p-4 text-center text-sm">
                      {c.description}
                    </div> */}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2">
                      {c.title}
                    </h3>

                    {/* Info */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                      <FaBook className="text-blue-500" /> Darslar soni:{" "}
                      <span className="text-gray-700 dark:text-gray-100">{totalLessons}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <FaSignal className="text-green-500" /> Reyting:{" "}
                      <span className="text-gray-700 dark:text-gray-100">{c.reviews} reviews</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                      <FaUser className="text-purple-500" /> O'qituvchi:{" "}
                      <span className="text-gray-700 dark:text-gray-100">{c.teacher || "N/A"}</span>
                    </p>

                    {/* Button */}
                    <button
                      onClick={() => navigate(`/courses/${c.id}`)}
                      className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition"
                    >
                      Kursga kirish
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
