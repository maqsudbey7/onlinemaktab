import React from "react";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Slider from "react-slick";
import heroImg from "/online.jpg";
import teacher1 from "../../public/express-backend.webp";
import teacher2 from "../../public/express-backend.webp";
import teacher3 from "../../public/express-backend.webp";
import teacher4 from "../../public/express-backend.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCalculator, FaFlask, FaGlobe } from "react-icons/fa";
import TeacherCard from "../components/TeacherCard";

export default function Home() {
  const items = [
    { name: "Matematika", icon: <FaCalculator size={20} /> },
    { name: "Fizika", icon: <FaFlask size={20} /> },
    { name: "Ingliz tili", icon: <FaGlobe size={20} /> },
    { name: "Kimyo", icon: <FaFlask size={20} /> },
    { name: "Biologiya", icon: <FaGlobe size={20} /> },
    { name: "Tarix", icon: <FaGlobe size={20} /> },
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
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="min-h-screen">
      <main className="bg-[radial-gradient(circle_at_top_left,_#c7d2fe,_#e0e7ff,_#ffffff)]">
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 relative py-20 px-6 overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl dark:bg-purple-700/30"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-200 rounded-full opacity-30 blur-3xl dark:bg-pink-700/30"></div>

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">
            {/* Left */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/8 text-sm w-max mb-6">
                <span className="text-primary font-semibold">💡</span>
                <span className="text-sm text-gray-600 dark:text-gray-200">
                  Ta’lim — qulay va samarali
                </span>
              </div>

              <h2 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
                Har bir o‘quvchi uchun <span className="text-primary">zamonaviy</span> va{" "}
                <span className="text-accent">amalga yo‘naltirilgan</span> ta’lim
              </h2>

              <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl">
                OnlaynMaktabim bilan maktab fanlarini chuqurlashgan <br /> holda o‘rganing —
                video darslar, interaktiv testlar va sertifikatlar.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <button className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:shadow-none">
                  Boshlash
                </button>
                <button className="px-6 py-3 border border-gray-200 rounded-lg glass text-gray-800 dark:text-gray-200">
                  Testlarni ko‘rish
                </button>
              </div>

              <div className="mt-8 flex gap-6 text-gray-900 dark:text-white">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">+16k</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Talabalar</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">+300</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Darslar</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">7 yil</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Jamoaviy tajriba</span>
                </div>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-soft-lg p-6">
                <img src={heroImg} alt="hero" className="rounded-xl object-cover w-full h-72" />
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="card-gradient p-3 rounded-xl shadow-sm bg-white dark:bg-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Matematika</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300">120+ dars</p>
                  </div>
                  <div className="card-gradient p-3 rounded-xl shadow-sm bg-white dark:bg-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Fizika</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300">Amaliy misollar</p>
                  </div>
                  <div className="card-gradient p-3 rounded-xl shadow-sm bg-white dark:bg-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Ingliz tili</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-300">IELTS tayyorlov</p>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-6 -top-6 p-4 bg-white dark:bg-gray-700 rounded-2xl shadow-lg text-gray-900 dark:text-white"
              >
                <div className="text-sm font-semibold">Mentor: Nodir Khalilov</div>
                <div className="text-xs">UX dizayn — tajribali o‘qituvchi</div>
              </motion.div>
            </motion.div>
          </div>

          {/* SUBJECTS inside HERO */}
          <div className="max-w-7xl mx-auto px-6 mt-20 relative z-10">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Fanlar</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              Tanlangan fanlar uchun interaktiv darslar va testlar mavjud.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {items.map((s, i) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-soft-lg flex flex-col items-center gap-3 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-md flex items-center justify-center card-gradient text-primary">
                    {s.icon}
                  </div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">{s.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Boshlangʻichdan ilgʻargacha</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Teachers */}
          <div className="w-full px-6">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl font-bold my-8 text-gray-900 dark:text-white">Ustozlarimiz</h2>
              <Slider {...sliderSettings}>
                {teachers.map((t, i) => (
                  <div key={i} className="px-4">
                    <TeacherCard {...t} darkMode={true} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          
        </section>
      </main>
    </div>
  );
}
