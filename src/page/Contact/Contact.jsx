import React, { useState } from "react";
import { FiMapPin, FiMail, FiPhone, FiClock } from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    accepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.accepted) {
      alert("Iltimos, Xizmat Shartlari va Maxfiylik Siyosatini qabul qiling!");
      return;
    }
    alert("Xabaringiz yuborildi! Tez orada javob olasiz.");
    setFormData({ name: "", email: "", subject: "", message: "", accepted: false });
  };

  return (
    <section
      className="py-32 px-6 transition-colors duration-300"
      style={{
        background: "linear-gradient(135deg, #f0f4ff, #d3f8e2)", // Umumiy orqa fon
      }}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Biz bilan bog'laning
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Chap taraf: Kontakt ma'lumotlari */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <FiMapPin className="text-blue-600 text-2xl" />
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">Manzil</h2>
                <p className="text-gray-600 dark:text-gray-400">Toshkent shahri, O'zbekiston</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-blue-600 text-2xl" />
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">Email</h2>
                <p className="text-gray-600 dark:text-gray-400">info@onlinemaktab.uz</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-blue-600 text-2xl" />
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">Telefon</h2>
                <p className="text-gray-600 dark:text-gray-400">+998 (90) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FiClock className="text-blue-600 text-2xl" />
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">Ish vaqti</h2>
                <p className="text-gray-600 dark:text-gray-400">Dushanba-Juma: 9:00 - 18:00</p>
              </div>
            </div>
          </div>

          {/* O'ng taraf: Yandex Maps */}
          <div className="w-full h-80 md:h-60 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://yandex.uz/map-widget/v1/?um=constructor%3Aabcdef123456&source=constructor"
              title="Yandex Maps"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Pastdagi Kontakt Formasi */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ismingiz"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email manzilingiz"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Mavzu"
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Xabaringiz"
            rows={4}
            className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            required
          ></textarea>
          <div className="md:col-span-2 flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              name="accepted"
              checked={formData.accepted}
              onChange={handleChange}
              className="rounded"
              required
            />
            Men Xizmat Shartlari va Maxfiylik Siyosatini qabul qilaman *
          </div>
          <button
            type="submit"
            className="md:col-span-2 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors"
          >
            Xabarni yuborish
          </button>
        </form>
      </div>
    </section>
  );
}
