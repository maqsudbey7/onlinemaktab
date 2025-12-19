import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import heroImg from "/online.jpg";
import teacher1 from "../../public/express-backend.webp";
import teacher2 from "../../public/express-backend.webp";
import teacher3 from "../../public/express-backend.webp";
import teacher4 from "../../public/express-backend.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCalculator, FaFlask, FaAtom, FaBook } from "react-icons/fa";
import TeacherCard from "../components/TeacherCard";
import { Link } from "react-router-dom";
import BackgroundLogos from "../components/BackgroundLogos/BackgroundLogos";

export default function Home() {
  const items = [
    { name: "Matematika", icon: <FaCalculator /> },
    { name: "Fizika", icon: <FaAtom /> },
    { name: "Ingliz tili", icon: <FaBook /> },
    { name: "Kimyo", icon: <FaFlask /> },
  ];

  const teachers = [
    { name: "Nodir Khalilov", subject: "UX Dizayn", image: teacher1 },
    { name: "John Doe", subject: "Web Development", image: teacher2 },
    { name: "Jane Smith", subject: "Graphic Design", image: teacher3 },
    { name: "Alex Johnson", subject: "Frontend", image: teacher4 },
  ];

 const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  arrows: false,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 1 },
    },
  ],
};


  return (
    <div className="transition-colors duration-300 font-poppins bg-white dark:bg-gray-900">
      <BackgroundLogos />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 relative py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">

          {/* Left */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm w-max mb-6">
              <span className="text-gray-700 dark:text-gray-200 font-semibold">💡</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Ta’lim — qulay va samarali</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Har bir o‘quvchi uchun <span className="text-blue-600 dark:text-blue-400">zamonaviy</span> va <span className="text-purple-600 dark:text-purple-400">amalga yo‘naltirilgan</span> ta’lim
            </h2>

            <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl">
              A'loMaktab bilan maktab fanlarini chuqurlashgan holda o‘rganing — video darslar, interaktiv testlar va sertifikatlar.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to={"/courses"}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-center"
              >
                Boshlash
              </Link>
              <Link
                to={"/test"}
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto text-center"
              >
                Testlarni ko‘rish
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg p-4 sm:p-6">
              <img src={heroImg} alt="hero" className="rounded-xl object-cover w-full h-64 sm:h-72" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* SUBJECTS */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">Fanlar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((s, i) => {
            const colors = ["from-blue-400 to-blue-600","from-green-400 to-green-600","from-purple-400 to-purple-600","from-pink-400 to-pink-600"];
            const bgColor = colors[i % colors.length];

            return (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center p-6 sm:p-8
                  bg-gradient-to-br ${bgColor} dark:from-gray-700 dark:to-gray-900 shadow-md`}
              >
                <div className="z-10 mb-4">
                  {React.cloneElement(s.icon, { size: 40, color: "white" })}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white z-10">{s.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TEACHERS */}
    <section className="w-full py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
      Ustozlarimiz
    </h2>

    <Slider {...sliderSettings}>
      {teachers.map((t, i) => (
        <div key={i} className="px-3">
          <TeacherCard {...t} />
        </div>
      ))}
    </Slider>
  </div>
</section>


      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Platforma qanday ishlaydi?
        </h2>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch">
          {[
            { title: "Ro‘yxatdan o‘ting", desc: "Bir necha soniyada akkaunt yarating va barcha kurslarga kirish huquqiga ega bo‘ling.", icon: "📝" },
            { title: "Kurs tanlang", desc: "O‘zingizga mos fan va darajani tanlab, video darslarni boshlang.", icon: "📚" },
            { title: "Natijaga erishing", desc: "Testlardan o‘ting, sertifikat oling va bilimlaringizni mustahkamlang.", icon: "🏆" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
            >
              <div className="text-4xl">{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="mt-24 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Bugun boshlang — kelajagingizga sarmoya qiling
        </h2>
        <p className="mb-8 max-w-xl mx-auto">
          Minglab o‘quvchilar biz bilan bilimlarini oshirmoqda. Siz ham ularga qo‘shiling.
        </p>
        <Link
          to="/login"
          className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition"
        >
          Ro‘yxatdan o‘tish
        </Link>
      </section>
    </div>
  );
}
