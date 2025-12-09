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
import { FaCalculator, FaFlask, FaLeaf, FaAtom, FaBook } from "react-icons/fa";
import { GiSpellBook } from "react-icons/gi";
import TeacherCard from "../components/TeacherCard";
import { Link } from "react-router-dom";

export default function Home() {
  const items = [
    { name: "Matematika", icon: <FaCalculator /> },
    { name: "Fizika", icon: <FaAtom /> },
    { name: "Ingliz tili", icon: <FaBook /> },
    { name: "Kimyo", icon: <FaFlask /> },
    { name: "Biologiya", icon: <FaLeaf /> },
    { name: "Tarix", icon: <GiSpellBook /> },
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
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const floatingIcons = [
    { icon: <FaCalculator />, size: 60, top: "10%", left: "5%", duration: 5 },
    { icon: <FaFlask />, size: 50, top: "70%", left: "80%", duration: 4 },
    { icon: <FaLeaf />, size: 55, top: "30%", left: "60%", duration: 6 },
    { icon: <FaAtom />, size: 40, top: "50%", left: "50%", duration: 7 },
    { icon: <FaBook />, size: 45, top: "35%", left: "20%", duration: 6 },
    { icon: <GiSpellBook />, size: 35, top: "80%", left: "40%", duration: 5 },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 transition-colors duration-300">

      {/* Floating Icons */}
      {floatingIcons.map((f, index) => (
        <motion.div
          key={index}
          className="absolute opacity-20"
          style={{ top: f.top, left: f.left, color: "#6366F1" }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: f.duration, repeat: Infinity }}
        >
          {React.cloneElement(f.icon, { size: f.size })}
        </motion.div>
      ))}

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 relative py-20 px-6 overflow-hidden">
        {/* Background Bubbles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-300 rounded-full opacity-30 blur-3xl dark:bg-purple-700/30"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-300 rounded-full opacity-30 blur-3xl dark:bg-pink-700/30"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* Left */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-accent/8 text-sm w-max mb-6">
              <span className="text-primary font-semibold">💡</span>
              <span className="text-sm text-gray-600 dark:text-gray-200">Ta’lim — qulay va samarali</span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Har bir o‘quvchi uchun <span className="text-primary">zamonaviy</span> va <span className="text-accent">amalga yo‘naltirilgan</span> ta’lim
            </h2>

            <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl">
              OnlaynMaktabim bilan maktab fanlarini chuqurlashgan <br /> holda o‘rganing — video darslar, interaktiv testlar va sertifikatlar.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link to={"/courses"} className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:shadow-none">Boshlash</Link>
              <Link to={"/test"} className="px-6 py-3 bg-black text-white rounded-lg shadow-lg hover:shadow-none">Testlarni ko‘rish</Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="rounded-2xl bg-white dark:bg-gray-800 shadow-soft-lg p-6">
              <img src={heroImg} alt="hero" className="rounded-xl object-cover w-full h-72" />
            </div>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -left-6 -top-6 p-4 bg-white dark:bg-gray-700 rounded-2xl shadow-lg text-gray-900 dark:text-white">
              <div className="text-sm font-semibold">Mentor: Nodir Khalilov</div>
              <div className="text-xs">UX dizayn — tajribali o‘qituvchi</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Fanlar</h3>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {items.map((s, i) => {
            const colors = [
              "from-blue-400 to-blue-600",
              "from-green-400 to-green-600",
              "from-purple-400 to-purple-600",
              "from-pink-400 to-pink-600",
              "from-yellow-400 to-yellow-600",
              "from-red-400 to-red-600",
            ];
            const bgColor = colors[i % colors.length];

            return (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-xl shadow-2xl overflow-hidden cursor-pointer group flex flex-col items-center justify-center p-8`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-70 group-hover:opacity-90 transition-opacity duration-300 rounded-xl`}></div>

                {/* Icon */}
                <div className="z-10 mb-4">
                  {React.cloneElement(s.icon, { size: 50, color: "rgba(255,255,255,0.9)" })}
                </div>

                {/* Fan nomi */}
                <h3 className="text-2xl font-bold text-white z-10 group-hover:underline">{s.name}</h3>

                {/* Decorative shapes */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TEACHERS */}
      <section className="w-full px-6 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold my-8 text-gray-900 dark:text-white">Ustozlarimiz</h2>
          <Slider {...sliderSettings}>
            {teachers.map((t, i) => (
              <div key={i} className="px-2 sm:px-4">
                <TeacherCard {...t} darkMode={true} className="w-full" />
              </div>
            ))}
          </Slider>
        </div>
      </section>

    </div>
  );
}
