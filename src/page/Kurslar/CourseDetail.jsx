import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../../data/courses";
import { FaUsers, FaCalendar, FaBook, FaVideo } from "react-icons/fa";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === parseInt(id));
  const [lessonSearch, setLessonSearch] = useState(""); // Lesson search state

  if (!course)
    return (
      <p className="text-center mt-20 text-gray-500 text-xl">
        Kurs topilmadi!
      </p>
    );

  return (
    <div className="min-h-screen bg-[#f0f4f8] px-4 md:px-6 py-12">
      <div className="max-w-7xl mx-auto">

        {/* =================== TOP INFO BLOCK =================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 md:p-8 rounded-xl shadow-md">
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-700 leading-7 mb-6">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-700 text-[15px] md:text-[17px] mb-2">
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
                className="w-full md:w-64 p-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-600 outline-none"
              />
              <span className="text-yellow-500 font-bold ml-4">★★★★★</span>
              <span className="text-gray-600">({course.reviews})</span>
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

        {/* =================== MODUL & DARS BLOCK =================== */}
        <div className="mt-8 md:mt-12 bg-white p-6 md:p-8 rounded-xl shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Kurs dasturi</h2>

          {/* Kurs statistika */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-[#f0f4f8] p-3 md:p-4 rounded text-center">
              <p className="font-semibold">Modullar soni</p>
              <p className="text-lg">{course.modules.length} ta</p>
            </div>
            <div className="bg-[#f0f4f8] p-3 md:p-4 rounded text-center">
              <p className="font-semibold">Darslar soni</p>
              <p className="text-lg">{course.lessonsCount} ta</p>
            </div>
            <div className="bg-[#f0f4f8] p-3 md:p-4 rounded text-center">
              <p className="font-semibold">Kurs davomiyligi</p>
              <p className="text-lg">{course.duration}</p>
            </div>
          </div>

          {/* Modul va darslar kartalari */}
          <div className="space-y-6">
            {course.modules.map((mod, i) => {
              const filteredLessons = mod.lessons.filter((lesson) =>
                lesson.title.toLowerCase().includes(lessonSearch.toLowerCase())
              );

              return (
                <div key={i}>
                  {/* Modul nomi */}
                  <h3 className="text-lg md:text-xl font-semibold mb-3">{mod.title}</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-4">
                    {mod.lessons.length} darslik | {mod.duration}
                  </p>

                  {/* Lessons kartalari */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredLessons.length > 0 ? (
                      filteredLessons.map((lesson, j) => (
                        <div
                          key={j}
                          className="bg-white rounded-xl shadow-md hover:shadow-xl p-4 cursor-pointer transition transform hover:-translate-y-1"
                          onClick={() => navigate(`/courses/${course.id}/lesson/${i}-${j}`)}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <FaVideo className="text-blue-500 text-lg" />
                            <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
                          </div>
                          <p className="text-gray-500 text-sm">{lesson.time}</p>
                          <span className="mt-2 inline-block text-xs text-gray-400">
                            Video dars
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="col-span-full p-4 text-gray-400 text-center">
                        Hech qanday dars topilmadi
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
