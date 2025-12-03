import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../../data/courses";
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaPlay } from "react-icons/fa";

export default function LessonDetail() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === parseInt(courseId));
  if (!course)
    return (
      <p className="text-center mt-20 text-gray-500 text-xl">Kurs topilmadi!</p>
    );

  // lessonId format: "modIndex-lessonIndex"
  const [modIndex, lessonIndex] = lessonId.split("-").map(Number);

  if (!course.modules[modIndex]) {
    return (
      <p className="text-center mt-20 text-gray-500 text-xl">Modul topilmadi!</p>
    );
  }

  const module = course.modules[modIndex];

  if (!module.lessons[lessonIndex]) {
    return (
      <p className="text-center mt-20 text-gray-500 text-xl">Dars topilmadi!</p>
    );
  }

  const lesson = module.lessons[lessonIndex];

  const totalLessons = module.lessons.length;
  const isLastLessonOfModule = lessonIndex === totalLessons - 1;
  const isLastModule = modIndex === course.modules.length - 1;

  const goToNext = () => {
    if (lessonIndex < totalLessons - 1) {
      // Modul ichidagi keyingi dars
      navigate(`/courses/${course.id}/lesson/${modIndex}-${lessonIndex + 1}`);
    } else if (!isLastModule) {
      // Keyingi modulning birinchi darsi
      navigate(`/courses/${course.id}/lesson/${modIndex + 1}-0`);
    }
  };

  const goToPrev = () => {
    if (lessonIndex > 0) {
      // Oldingi dars
      navigate(`/courses/${course.id}/lesson/${modIndex}-${lessonIndex - 1}`);
    } else if (modIndex > 0) {
      // Oldingi modulning oxirgi darsi
      const prevModule = course.modules[modIndex - 1];
      navigate(
        `/courses/${course.id}/lesson/${modIndex - 1}-${prevModule.lessons.length - 1}`
      );
    }
  };

  const progress = ((lessonIndex + 1) / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-28 px-4">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-xl space-y-10 border border-gray-100">

        {/* Go Back */}
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-3"
        >
          <FaArrowLeft /> Kursga qaytish
        </button>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span
            onClick={() => navigate(`/courses/${course.id}`)}
            className="hover:text-gray-800 hover:underline cursor-pointer"
          >
            {course.title}
          </span>
          <span>/</span>
          <span className="font-semibold">{module.title}</span>
          <span>/</span>
          <span className="text-gray-700">{lesson.title}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight flex items-center gap-3">
          <FaBookOpen className="text-indigo-500" /> {lesson.title}
        </h1>

        {/* Progress */}
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-700 font-medium">Dars Progressi</span>
            <span className="text-gray-600">{lessonIndex + 1} / {totalLessons}</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
            <div className="h-3 bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Video */}
        {lesson.video && (
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg border">
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
          <div className="bg-gray-50 p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Asosiy nuqtalar</h2>
            <ul className="space-y-2 text-gray-700">
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
            className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300 text-gray-700 font-medium transition"
          >
            <FaArrowLeft /> Oldingi dars
          </button>

          <button
            onClick={goToNext}
            className="flex items-center justify-center gap-2 flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-medium transition"
          >
            {isLastLessonOfModule && !isLastModule ? "Keyingi modul" : "Keyingi dars"} <FaArrowRight />
          </button>
        </div>

        {/* Next Module Notification */}
        {isLastLessonOfModule && !isLastModule && (
          <div className="mt-10 p-6 bg-green-50 border-l-4 border-green-500 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-green-800">Tabrigingiz! 🎉</h3>
              <p className="text-green-700">Siz moduldagi barcha darslarni ko‘rdingiz. Keyingi modulga o‘tishni xohlaysizmi?</p>
            </div>
            <button
              onClick={() => navigate(`/courses/${course.id}/lesson/${modIndex + 1}-0`)}
              className="mt-3 md:mt-0 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition font-medium"
            >
              Keyingi modulga o‘tish →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
