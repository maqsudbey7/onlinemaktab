import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../../data/courses";
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaPlay } from "react-icons/fa";

export default function LessonDetail() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(courseId));

  if (!course)
    return (
      <p className="text-center mt-20 text-gray-500 dark:text-gray-400 text-xl">Kurs topilmadi!</p>
    );

  const [modIndex, lessonIndex] = lessonId.split("-").map(Number);
  const module = course.modules[modIndex];
  const lesson = module.lessons[lessonIndex];

  const watched = JSON.parse(localStorage.getItem("watchedLessons") || "{}");
  const markWatched = () => {
    if (!watched[course.id]) watched[course.id] = {};
    watched[course.id][`${modIndex}-${lessonIndex}`] = true;
    localStorage.setItem("watchedLessons", JSON.stringify(watched));
  };

  useEffect(() => {
    markWatched();
  }, []);

  const totalLessons = module.lessons.length;
  const isLastLessonOfModule = lessonIndex === totalLessons - 1;
  const isLastModule = modIndex === course.modules.length - 1;

  const goToNext = () => {
    if (lessonIndex < totalLessons - 1) {
      navigate(`/courses/${course.id}/lesson/${modIndex}-${lessonIndex + 1}`);
    } else if (!isLastModule) {
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

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 py-2 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl space-y-10 border border-gray-100 dark:border-gray-700 transition-colors duration-300">

        {/* Go Back */}
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition mb-3"
        >
          <FaArrowLeft /> Kursga qaytish
        </button>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
          <span
            onClick={() => navigate(`/courses/${course.id}`)}
            className="hover:text-gray-800 dark:hover:text-gray-200 hover:underline cursor-pointer"
          >
            {course.title}
          </span>
          <span>/</span>
          <span className="font-semibold text-gray-900 dark:text-white">{module.title}</span>
          <span>/</span>
          <span className="text-gray-700 dark:text-gray-300">{lesson.title}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight flex items-center gap-3">
          <FaBookOpen className="text-indigo-500" /> {lesson.title}
        </h1>

        {/* Progress */}
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
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <iframe
              src={lesson.video.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]}
              className="w-full h-72 md:h-96 rounded-xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Key Points */}
        {lesson.keyPoints && lesson.keyPoints.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Asosiy nuqtalar</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {lesson.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-base leading-relaxed">
                  <FaPlay className="text-indigo-500 mt-1" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-10 gap-4">
          <button
            onClick={goToPrev}
            className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition"
          >
            <FaArrowLeft /> Oldingi dars
          </button>

          <button
            onClick={goToNext}
            className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-500 font-medium transition"
          >
            {isLastLessonOfModule && !isLastModule ? "Keyingi modul" : "Keyingi dars"} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
  