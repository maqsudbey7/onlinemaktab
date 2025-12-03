import React from "react";
import { motion } from "framer-motion";

const TeacherCard = ({ name, subject, image }) => {
  return (
    <motion.div
      className="flex-shrink-0  bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 m-4"
      whileHover={{ scale: 1.05 }}
    >
      <div className="  mx-auto shadow-md mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-2xl font-bold text-center text-gray-800">{name}</h3>
      <p className="text-gray-700 text-center mt-1 text-lg">{subject}</p>
      <button className="px-5 py-2.5 border mt-2 border-gray-500 rounded-xl hover:border-blue-600 hover:text-blue-600">
        Darslarga yozilish
      </button>
    </motion.div>
  );
};

export default TeacherCard;
