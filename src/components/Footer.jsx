import React from "react";
import { FaFacebookF, FaTelegramPlane, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        {/* Logo va haqiqiy matn */}
        <div>
          <h2 className="text-2xl font-bold text-white">OnlaynMaktabim</h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            Yangi avlod uchun zamonaviy o‘quv platformasi.  
            O‘rganing, rivojlaning va kelajagingizni quring.
          </p>
        </div>

        {/* Tezkor linklar */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Bo‘limlar</h3>
          <ul className="space-y-2">
            <li className="hover:text-white transition cursor-pointer">Kurslar</li>
            <li className="hover:text-white transition cursor-pointer">Testlar</li>
            <li className="hover:text-white transition cursor-pointer">Biz haqimizda</li>
            <li className="hover:text-white transition cursor-pointer">Aloqa</li>
          </ul>
        </div>

        {/* Manzil */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Manzil</h3>
          <p className="text-gray-400">Toshkent shahri, Yunusobod</p>
          <p className="text-gray-400 mt-2">Email: support@onlaynmaktab.uz</p>
          <p className="text-gray-400 mt-2">Telefon: +998 90 123 45 67</p>
        </div>

        {/* Ijtimoiy tarmoqlar */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Bizni kuzating</h3>
          <div className="flex space-x-4 mt-3">
            <FaTelegramPlane className="text-xl hover:text-blue-400 transition cursor-pointer" />
            <FaInstagram className="text-xl hover:text-pink-500 transition cursor-pointer" />
            <FaYoutube className="text-xl hover:text-red-500 transition cursor-pointer" />
            <FaFacebookF className="text-xl hover:text-blue-500 transition cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Pastki line */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-gray-500">
        © {new Date().getFullYear()} OnlaynMaktabim — Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
