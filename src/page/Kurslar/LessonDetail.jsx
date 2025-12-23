// LessonDetail.js
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaFilePdf } from "react-icons/fa";
import YouTube from "react-youtube";
import { useCourses } from "../../context/CourseContext";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";

export default function LessonDetail() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const { courses, markLessonWatched } = useCourses();
  const course = courses.find((c) => c.id === +courseId);

  const isLoggedIn = !!localStorage.getItem("user");
  const purchasedCourses = JSON.parse(
    localStorage.getItem("purchasedCourses") || "[]"
  );
  const hasPurchased = purchasedCourses.includes(+courseId);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);

  if (!course)
    return (
      <p className="text-center mt-20 text-gray-500 dark:text-gray-400">
        Kurs topilmadi
      </p>
    );

  if (!hasPurchased)
    return (
      <p className="text-center mt-20 text-red-500 dark:text-red-400">
        🔒 Kurs sotib olinmagan
      </p>
    );

  const [modIndex, lessonIndex] = lessonId.split("-").map(Number);
  const module = course.modules[modIndex];
  const lesson = module.lessons[lessonIndex];

  const total = module.lessons.length;
  const progress = ((lessonIndex + 1) / total) * 100;

  // Video ID olishni yaxshiladik
  const getVideoId = (url) => {
    if (!url) return null;
    if (url.includes("youtu.be/")) {
      return url.split("youtu.be/")[1].split("?")[0];
    }
    if (url.includes("v=")) {
      return url.split("v=")[1].split("&")[0];
    }
    return url;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <BackgroundLogos />

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg space-y-6">
        {/* Back button */}
        <button
          onClick={() => navigate(`/courses/${course.id}`)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <FaArrowLeft /> Orqaga
        </button>

        {/* Lesson title */}
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
          <FaBookOpen /> {lesson.title}
        </h1>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-sm mb-1 text-gray-500 dark:text-gray-400">
            <span>Progress</span>
            <span>
              {lessonIndex + 1} / {total}
            </span>
          </div>
          <div className="w-full bg-gray-300 dark:bg-gray-700 h-3 rounded-full">
            <div
              className="h-3 bg-indigo-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Video */}
        {lesson.video && (
          <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
            <YouTube
              videoId={getVideoId(lesson.video)}
              className="w-full h-full"
              opts={{ width: "100%", height: "100%", playerVars: { autoplay: 0, modestbranding: 1 } }}
              onEnd={() =>
                markLessonWatched(course.id, modIndex, lessonIndex)
              }
            />
          </div>
        )}

        {/* PDF download link */}
        {lesson.pdf && (
          <div className="mt-4">
            <a
              href={lesson.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              download
            >
              <FaFilePdf /> PDF ni yuklab olish
            </a>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-4 flex-wrap">
          <button
            disabled={lessonIndex === 0}
            onClick={() =>
              navigate(
                `/courses/${course.id}/lesson/${modIndex}-${lessonIndex - 1}`
              )
            }
            className="flex-1 min-w-[120px] bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <FaArrowLeft className="inline mr-2" /> Oldingi
          </button>

          <button
            disabled={lessonIndex === total - 1}
            onClick={() =>
              navigate(
                `/courses/${course.id}/lesson/${modIndex}-${lessonIndex + 1}`
              )
            }
            className="flex-1 min-w-[120px] bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Keyingi <FaArrowRight className="inline ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
