import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaBookOpen } from "react-icons/fa";
import { useCourses } from "../../context/CourseContext";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";
import YouTube from "react-youtube";

export default function LessonDetail() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { courses } = useCourses();
  const course = courses.find(c => c.id === parseInt(courseId));

  const [watched, setWatched] = useState({});
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchedLessons") || "{}");
    setWatched(saved);
  }, []);

  if (!course)
    return <p className="text-center mt-20 text-gray-500 dark:text-gray-400 text-xl">Kurs topilmadi!</p>;

  const [modIndex, lessonIndex] = lessonId.split("-").map(Number);
  const module = course.modules[modIndex];
  const lesson = module.lessons[lessonIndex];

  const markWatched = () => {
    const updated = { ...watched };
    if (!updated[course.id]) updated[course.id] = {};
    if (!updated[course.id][`${modIndex}-${lessonIndex}`]) {
      updated[course.id][`${modIndex}-${lessonIndex}`] = true;
      localStorage.setItem("watchedLessons", JSON.stringify(updated));
      setWatched(updated);
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
    }
  };

  const allLessonsWatchedInModule = module.lessons.every((_, idx) =>
    watched[course.id]?.[`${modIndex}-${idx}`]
  );

  const totalLessons = module.lessons.length;
  const isLastLessonOfModule = lessonIndex === totalLessons - 1;
  const isLastModule = modIndex === course.modules.length - 1;

  const goToNext = () => {
    if (lessonIndex < totalLessons - 1) {
      navigate(`/courses/${course.id}/lesson/${modIndex}-${lessonIndex + 1}`);
    } else if (!isLastModule && allLessonsWatchedInModule) {
      navigate(`/courses/${course.id}/lesson/${modIndex + 1}-0`);
    }
  };

  const goToPrev = () => {
    if (lessonIndex > 0) {
      navigate(`/courses/${course.id}/lesson/${modIndex}-${lessonIndex - 1}`);
    } else if (modIndex > 0) {
      const prevModule = course.modules[modIndex - 1];
      navigate(`/courses/${course.id}/lesson/${modIndex - 1}-${prevModule.lessons.length - 1}`);
    }
  };

  const progress = ((lessonIndex + 1) / totalLessons) * 100;

  // YouTube videoId olish uchun helper
  const getVideoId = (url) => {
    if (!url) return "";
    if (url.includes("v=")) return url.split("v=")[1].split("&")[0];
    return url.split("/").pop().split("?")[0];
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-2 px-4 transition-colors duration-300 relative">
      <BackgroundLogos />

      {showCongrats && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-bounce">
          Siz darsni ko‘rib bo‘ldingiz!
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl space-y-10 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition mb-3"
        >
          <FaArrowLeft /> Kursga qaytish
        </button>

        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span onClick={() => navigate(`/courses/${course.id}`)} className="hover:text-gray-800 dark:hover:text-gray-200 hover:underline cursor-pointer">
            {course.title}
          </span>
          <span>/</span>
          <span className="font-semibold text-gray-900 dark:text-white">{module.title}</span>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-3">
          <FaBookOpen className="text-indigo-500" /> {lesson.title}
        </h1>

        <div>
          <div className="flex justify-between mb-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">Dars Progressi</span>
            <span className="text-gray-600 dark:text-gray-400">{lessonIndex + 1} / {totalLessons}</span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div className="h-3 bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Video */}
        {lesson.video && (
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mt-5">
            <YouTube
              videoId={getVideoId(lesson.video)}
              className="w-full h-72 md:h-96 rounded-xl"
              opts={{ width: "100%", height: "100%" }}
              onEnd={markWatched}
            />
          </div>
        )}

        {/* PDF link har doim ko‘rinadi */}
      {/* PDF link har doim video ostida */}
<div className="mt-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm text-center">
  {lesson.pdf && lesson.pdf.trim() !== "" ? (
    <a
      href={lesson.pdf}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 dark:text-indigo-400 underline font-medium text-lg"
    >
      Dars materialini PDF ko‘rish / yuklab olish
    </a>
  ) : (
    <span className="text-gray-400 font-medium">PDF mavjud emas</span>
  )}
</div>


        <div className="flex justify-between mt-10 gap-4">
          <button
            onClick={goToPrev}
            className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition"
          >
            <FaArrowLeft /> Oldingi dars
          </button>

          <button
            onClick={goToNext}
            disabled={isLastLessonOfModule && !allLessonsWatchedInModule && !isLastModule}
            className={`flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-xl font-medium transition ${
              allLessonsWatchedInModule ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:hover:bg-indigo-500" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLastLessonOfModule && !isLastModule ? "Keyingi modul" : "Keyingi dars"} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
