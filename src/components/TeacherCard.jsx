import React from "react";
import { motion } from "framer-motion";

const TeacherCard = ({ name, subject, image }) => {
  return (
    <motion.div
      className="flex-shrink-0 bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-lg dark:shadow-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 m-2 sm:m-4 w-full sm:w-80"
      whileHover={{ scale: 1.03 }}
    >
      <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden rounded-xl shadow-md mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{name}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-center mt-1 text-sm sm:text-lg">{subject}</p>
      <button className="mt-4 w-full px-4 py-2 sm:px-5 sm:py-2.5 text-black dark:text-white border border-gray-500 dark:border-gray-400 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors duration-300">
        Darslarga yozilish
      </button>
    </motion.div>
  );
};

export default TeacherCard;
