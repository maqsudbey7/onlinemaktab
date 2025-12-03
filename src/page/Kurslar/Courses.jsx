import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img1 from "../../../public/js.webp";
import img2 from "../../../public/img2.webp";



const courses = [
  {
    id: 1,
    title: "JavaScript",
    lessons: 42,
    level: "Boshlang'ich",
    teacher: "Samar",
    image: img1,
  },
  {
    id: 2,
    title: "TypeScript",
    lessons: 38,
    level: "O'rta",
    teacher: "Ulugbek",
    image: img2,
  },


];

export default function Courses() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // ← useNavigate hook

  const filtered = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.level.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-900"
        >
          Bizning <span className="">Kurslar</span>
        </motion.h1>

        <div className="mb-12 flex justify-center">
          <input
            type="text"
            placeholder="Fan nomi bo‘yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-5 py-3 rounded-xl border border-gray-300 shadow
                       focus:border-green-600 focus:ring-2 focus:ring-green-300 outline-none transition bg-white"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-10">
            ❌ Hech qanday kurs topilmadi...
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((c) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer"
                onClick={() => navigate(`/courses/${c.id}`)}
              >
                <div className="h-50 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Darslar soni: <span className="text-gray-700">{c.lessons}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Daraja: <span className="text-gray-700">{c.level}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    O'qituvchi: <span className="text-gray-700">{c.teacher}</span>
                  </p>
                </div>
              </motion.div>

            ))}
          </div>
        )}
      </div>
    </div>
  );
}
