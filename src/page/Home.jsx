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
// import { GiSpellBook } from "react-icons/gi";  
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

  return (
    <div className="transition-colors duration-300 font-poppins bg-white dark:bg-gray-900">
<BackgroundLogos/>
      {/* HERO SECTION */}
      <section className="pt-32 pb-20 relative py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center relative z-10">

          {/* Left */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm w-max mb-6">
              <span className="text-gray-700 dark:text-gray-200 font-semibold">💡</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">Ta’lim — qulay va samarali</span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Har bir o‘quvchi uchun <span className="text-blue-600 dark:text-blue-400">zamonaviy</span> va <span className="text-purple-600 dark:text-purple-400">amalga yo‘naltirilgan</span> ta’lim
            </h2>

            <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-xl">
              A'loMaktab bilan maktab fanlarini chuqurlashgan holda o‘rganing — video darslar, interaktiv testlar va sertifikatlar.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link 
                to={"/courses"} 
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Boshlash
              </Link>
              <Link 
                to={"/test"} 
                className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Testlarni ko‘rish
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg p-6">
              <img src={heroImg} alt="hero" className="rounded-xl object-cover w-full h-72" />
            </div>

            {/* <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -left-6 -top-6 p-4 bg-white dark:bg-gray-700 rounded-2xl shadow-lg text-gray-900 dark:text-white">
              <div className="text-sm font-semibold">Mentor: Nodir Khalilov</div>
              <div className="text-xs">UX dizayn — tajribali o‘qituvchi</div>
            </motion.div> */}
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
                className={`relative rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center p-8
                  bg-gradient-to-br ${bgColor} dark:from-gray-700 dark:to-gray-900 shadow-md`}
              >
                <div className="z-10 mb-4">
                  {React.cloneElement(s.icon, { size: 50, color: "white" })}
                </div>
                <h3 className="text-2xl font-bold text-white z-10">{s.name}</h3>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* TEACHERS */}
      <section className="w-full px-6 mt-20 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold my-8 text-gray-900 dark:text-white">Ustozlarimiz</h2>
          <Slider {...sliderSettings}>
            {teachers.map((t, i) => (
              <div key={i} className="px-2 sm:px-4">
                <TeacherCard {...t} className="w-full shadow-lg" darkMode={true} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

<section className="max-w-7xl mx-auto px-6 mt-24">
  <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
    Platforma qanday ishlaydi?
  </h2>

  <div className="flex gap-8 justify-center">
    {[
      {
        title: "Ro‘yxatdan o‘ting",
        desc: "Bir necha soniyada akkaunt yarating va barcha kurslarga kirish huquqiga ega bo‘ling.",
        icon: "📝"
      },
      {
        title: "Kurs tanlang",
        desc: "O‘zingizga mos fan va darajani tanlab, video darslarni boshlang.",
        icon: "📚"
      },
      {
        title: "Natijaga erishing",
        desc: "Testlardan o‘ting, sertifikat oling va bilimlaringizni mustahkamlang.",
        icon: "🏆"
      }
    ].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="
          flex
          items-start
          gap-4
          bg-white
          dark:bg-gray-800
          p-6
          rounded-xl
          shadow-md
          max-w-sm
        "
      >
        {/* ICON */}
        <div className="text-4xl">
          {item.icon}
        </div>

        {/* TEXT */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {item.desc}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</section>



<section className="mt-24 py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
  <h2 className="text-3xl font-bold mb-6">
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
