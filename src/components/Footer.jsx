import React from "react";
import { FaFacebookF, FaTelegramPlane, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 pt-14 pb-8 mt-20 transition-colors duration-300 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Logo va matn */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">OnlaynMaktabim</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            Yangi avlod uchun zamonaviy o‘quv platformasi.
            O‘rganing, rivojlaning va kelajagingizni quring.
          </p>
        </div>

        {/* Bo‘limlar */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bo‘limlar</h3>
          <ul className="space-y-2">
            <li className="hover:text-black dark:hover:text-white transition cursor-pointer">Kurslar</li>
            <li className="hover:text-black dark:hover:text-white transition cursor-pointer">Testlar</li>
            <li className="hover:text-black dark:hover:text-white transition cursor-pointer">Biz haqimizda</li>
            <li className="hover:text-black dark:hover:text-white transition cursor-pointer">Aloqa</li>
          </ul>
        </div>

        {/* Manzil */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Manzil</h3>
          <p className="text-gray-600 dark:text-gray-300">Toshkent shahri, Yunusobod</p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Email: support@onlaynmaktab.uz</p>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Telefon: +998 90 123 45 67</p>
        </div>

        {/* Ijtimoiy tarmoqlar */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bizni kuzating</h3>
          <div className="flex space-x-4 mt-3">
            <FaTelegramPlane className="text-xl hover:text-blue-500 dark:hover:text-blue-400 transition cursor-pointer" />
            <FaInstagram className="text-xl hover:text-pink-600 dark:hover:text-pink-400 transition cursor-pointer" />
            <FaYoutube className="text-xl hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer" />
            <FaFacebookF className="text-xl hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Pastki qator */}
      <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-5 text-center text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} OnlaynMaktabim — Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
