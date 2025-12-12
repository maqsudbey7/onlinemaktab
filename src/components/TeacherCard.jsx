import React from "react";
import { motion } from "framer-motion";

const TeacherCard = ({ name, subject, image }) => {
  return (
    <motion.div
      className="flex-shrink-0 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg dark:shadow-gray-700 hover:shadow-2xl transition-transform transform hover:-translate-y-2 m-4 transition-colors duration-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="mx-auto shadow-md mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-xl" />
      </div>
      <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">{name}</h3>
      <p className="text-gray-700 dark:text-gray-300 text-center mt-1 text-lg">{subject}</p>
      <button className="px-5 py-2.5 text-black dark:text-white  border mt-2 border-gray-500 dark:border-gray-400 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-colors duration-300">
        Darslarga yozilish
      </button>
    </motion.div>
  );
};

export default TeacherCard;
