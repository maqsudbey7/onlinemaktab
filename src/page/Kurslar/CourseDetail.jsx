import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCalendar,
  FaBook,
  FaVideo,
  FaChevronDown,
  FaCheckCircle,
  FaLock,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCourses } from "../../context/CourseContext";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";
import toast from "react-hot-toast";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { courses, watched } = useCourses();
  const course = courses.find((c) => c.id === +id);

  const [openModule, setOpenModule] = useState(null);
  const [lessonSearch, setLessonSearch] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;

  const purchasedCourses = JSON.parse(
    localStorage.getItem("purchasedCourses") || "[]"
  );
  const purchased = purchasedCourses.includes(course?.id);

  if (!course) {
    return (
      <p className="text-center mt-20 text-xl text-gray-500 dark:text-gray-400">
        Kurs topilmadi
      </p>
    );
  }

  // Dynamic lessonsCount
  const totalLessons = course.modules.reduce(
    (sum, mod) => sum + (mod.lessons?.length || 0),
    0
  );

  const toggleModule = (i) => {
    setOpenModule(openModule === i ? null : i);
  };

  const handlePurchase = () => {
    if (!isLoggedIn) {
      toast.error("🔐 Avval tizimga kiring!");
      setTimeout(() => navigate("/login"), 1200);
      return;
    }

    toast.success("💳 To‘lov sahifasiga yo‘naltirilmoqda...");

    if (!purchasedCourses.includes(course.id)) {
      purchasedCourses.push(course.id);
      localStorage.setItem(
        "purchasedCourses",
        JSON.stringify(purchasedCourses)
      );
    }

    const paymeUrl = `https://payme.uz/checkout/6948165dace52621ee174434?back=${window.location.href}`;
    window.location.href = paymeUrl;
  };

  const handleLessonClick = (moduleIndex, lessonIndex) => {
    if (!purchased) {
      setShowPurchaseModal(true);
      return;
    }

    navigate(`/courses/${course.id}/lesson/${moduleIndex}-${lessonIndex}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-12 relative">
      <BackgroundLogos />

      <div className="max-w-7xl mx-auto space-y-10">
        {/* TOP */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {course.title}
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-5 mt-4 text-gray-600 dark:text-gray-300">
              <span className="flex items-center gap-2">
                <FaCalendar /> {course.date}
              </span>
              <span className="flex items-center gap-2">
                <FaBook /> {totalLessons}
              </span>
            </div>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Dars qidirish..."
              value={lessonSearch}
              onChange={(e) => setLessonSearch(e.target.value)}
              className="mt-4 w-full md:w-64 p-2 rounded border 
                bg-white dark:bg-gray-700 
                border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-white"
            />

            {/* BUY */}
            <button
              onClick={handlePurchase}
              disabled={purchased}
              className={`mt-4 px-6 py-3 rounded-lg ml-4 font-semibold text-white transition ${
                purchased
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {purchased ? "Sotib olingan" : "Kursni sotib olish"}
            </button>
          </div>

          <img
            src={course.image}
            alt={course.title}
            className="rounded-xl object-cover w-full h-48 md:h-full"
          />
        </div>

        {/* MODULES */}
        <div
          className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-all ${
            openModule !== null ? "bg-opacity-90 backdrop-blur-sm" : ""
          }`}
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Kurs dasturi
          </h2>

          {course.modules.map((mod, i) => {
            const lessons = mod.lessons.filter((l) =>
              l.title.toLowerCase().includes(lessonSearch.toLowerCase())
            );

            return (
              <div
                key={mod.id ?? i}
                className="mb-4 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
              >
                <div
                  onClick={() => toggleModule(i)}
                  className="flex justify-between p-4 cursor-pointer
                    bg-gray-100 dark:bg-gray-700"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {mod.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {mod.lessons.length} dars
                    </p>
                  </div>
                  <FaChevronDown
                    className={`transition ${
                      openModule === i ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {openModule === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 p-4"
                    >
                      {lessons.map((lesson, j) => {
                        const done = watched?.[course.id]?.[`${i}-${j}`];

                        return (
                          <div
                            key={`${course.id}-${i}-${j}`}
                            onClick={() => handleLessonClick(i, j)}
                            className="p-4 rounded-xl 
                              bg-gray-50 dark:bg-gray-700 
                              shadow cursor-pointer 
                              hover:scale-105 transition flex flex-col justify-center"
                          >
                            <div className="flex gap-2 items-center">
                              {done ? (
                                <FaCheckCircle className="text-green-500" />
                              ) : purchased ? (
                                <FaVideo className="text-blue-500" />
                              ) : (
                                <FaLock className="text-red-500" />
                              )}
                              <h4 className="font-semibold text-gray-900 dark:text-white text-center">
                                {lesson.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {lesson.time}
                            </p>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {showPurchaseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50
             bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPurchaseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Kurs sotib olinmagan
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                Bu mavzuga kirish uchun kursni sotib olishingiz kerak.
              </p>

              <div className="flex flex-col items-center mb-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-40 h-24 object-cover rounded-lg mb-2"
                />
                <p className="font-semibold text-gray-900 dark:text-white text-center">
                  {course.title}
                </p>
              </div>

              <button
                onClick={handlePurchase}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold mb-2"
              >
                Kursni sotib olish
              </button>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 dark:text-gray-900 py-2 rounded-lg font-medium"
              >
                Bekor qilish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
