import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../../data/courses";
import { FaUsers, FaCalendar, FaBook, FaVideo, FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(id));
  const [lessonSearch, setLessonSearch] = useState("");
  const [openModule, setOpenModule] = useState(null); // Hozirgi ochiq modul
  const watched = JSON.parse(localStorage.getItem("watchedLessons") || "{}");

  if (!course)
    return (
      <p className="text-center mt-20 text-gray-500 dark:text-gray-400 text-xl">
        Kurs topilmadi!
      </p>
    );

  const toggleModule = (index) =>
    setOpenModule(openModule === index ? null : index);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-6 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* =================== TOP INFO BLOCK =================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md transition-colors duration-300">
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{course.title}</h1>
            <p className="text-gray-700 dark:text-gray-300 leading-7 mb-6">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-700 dark:text-gray-300 text-[15px] md:text-[17px] mb-2">
              <div className="flex items-center gap-2">
                <FaUsers /> {course.students} o'quvchilar
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar /> {course.date}
              </div>
              <div className="flex items-center gap-2">
                <FaBook /> {course.lessonsCount} darslar soni
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-[15px] md:text-[17px]">
              <input
                type="text"
                placeholder="Dars nomi bo‘yicha qidirish..."
                value={lessonSearch}
                onChange={(e) => setLessonSearch(e.target.value)}
                className="w-full md:w-64 p-2 rounded border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-500 focus:border-blue-600 dark:focus:border-blue-400 outline-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-300"
              />
            </div>
          </div>

          <div className="w-full h-48 md:h-56 rounded-xl overflow-hidden">
            <img
              src={course.image}
              alt="Course preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* =================== MODULES BLOCK =================== */}
        <div className="mt-8 md:mt-12 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-md transition-colors duration-300">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Kurs dasturi</h2>

          <div className="space-y-4">
            {course.modules.map((mod, i) => {
              const filteredLessons = mod.lessons.filter((lesson) =>
                lesson.title.toLowerCase().includes(lessonSearch.toLowerCase())
              );

              return (
                <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-colors duration-300">
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => toggleModule(i)}
                  >
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{mod.title}</h3>
                      <p className="text-gray-500 dark:text-gray-300 text-sm">{mod.lessons.length} darslik | {mod.duration}</p>
                    </div>
                    <FaChevronDown
                      className={`transition-transform duration-300 text-gray-500 dark:text-gray-300 ${openModule === i ? "rotate-180" : ""}`}
                    />
                  </div>

                  <AnimatePresence initial={false}>
                    {openModule === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden"
                      >
                        {filteredLessons.length > 0 ? (
                          filteredLessons.map((lesson, j) => {
                            const isWatched = watched[course.id]?.[`${i}-${j}`];

                            return (
                              <div
                                key={j}
                                className="bg-white dark:bg-gray-700 rounded-xl shadow-md mt-4 hover:shadow-xl p-4 cursor-pointer transition transform hover:-translate-y-1"
                                onClick={() => navigate(`/courses/${course.id}/lesson/${i}-${j}`)}
                              >
                                <div className="flex items-center gap-3 mb-2">
                                  {isWatched ? (
                                    <FaCheckCircle className="text-green-500 text-lg" />
                                  ) : (
                                    <FaVideo className="text-blue-500 text-lg" />
                                  )}
                                  <h4 className="font-semibold text-gray-900 dark:text-white">{lesson.title}</h4>
                                </div>

                                <p className="text-gray-500 dark:text-gray-300 text-sm">{lesson.time}</p>
                                <span className="mt-2 inline-block text-xs text-gray-400 dark:text-gray-400">Video dars</span>
                              </div>
                            );
                          })
                        ) : (
                          <p className="col-span-full text-gray-400 dark:text-gray-400 text-center">Hech qanday dars topilmadi</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
