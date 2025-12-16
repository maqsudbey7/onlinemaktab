import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundLogos from "../BackgroundLogos/BackgroundLogos";

export default function NotFound() {
  const navigate = useNavigate();

  return (
<div className="flex flex-col items-center justify-center my-8  
            dark:bg-gray-900 dark:text-white text-white">
    <BackgroundLogos/>
    <h1 className="text-9xl font-extrabold mb-4 animate-bounce">404</h1>
    <h2 className="text-3xl font-bold mb-2">Sahifa Topilmadi</h2>
    <p className="mb-8 text-center max-w-md">
        Afsus! Siz izlayotgan sahifa mavjud emas yoki boshqa joyga ko‘chirilgan.
    </p>
    <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg shadow-lg 
               hover:bg-purple-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition"
    >
        Bosh sahifaga qaytish
    </button>
</div>


  );
}
