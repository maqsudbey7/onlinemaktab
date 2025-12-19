import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const TeacherCard = ({ name, subject, image }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 220 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* IMAGE */}
      <div className="relative w-full h-56 sm:h-60 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent z-10" />

        <img
          src={image}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 text-center">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          {name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1.5">
          {subject}
        </p>

       <Link to={"/courses"}>
        <button className="mt-4 w-full py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-800 dark:text-white hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
          Darslarga o'tish
        </button></Link>
      </div>
    </motion.div>
  );
};

export default TeacherCard;
