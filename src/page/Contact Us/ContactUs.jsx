import React, { useState } from "react";
import { FiMapPin, FiMail, FiPhone, FiClock } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";

export default function ContactUs() {
  const faqs = [
    {
      question: "Kurslarni kimlar olishi mumkin?",
      answer:
        "Kurslar boshlang‘ichdan ilg‘or darajagacha barcha foydalanuvchilar uchun mo‘ljallangan.",
      icon: "🎓",
      new: true,
    },
    {
      question: "Kurslarni tugatgach sertifikat beriladimi?",
      answer:
        "Ha, kurslarni muvaffaqiyatli tugatganingizdan so‘ng rasmiy sertifikat beriladi.",
      icon: "📜",
    },
    {
      question: "Darslar onlaynmi yoki yuklab olish mumkinmi?",
      answer:
        "Barcha darslar onlayn. Ba'zi darslar offline ko‘rish uchun yuklab olish imkoniyati bilan ta'minlangan.",
      icon: "💻",
    },
    {
      question: "Kurslar bepulmi yoki pullimi?",
      answer:
        "Ba'zi kurslar bepul, ayrim kurslar esa pullik.",
      icon: "💰",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    accepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.accepted) return alert("Shartlarni qabul qiling!");
    alert("Xabar yuborildi!");
  };

  return (
    <main className="w-full">
      <BackgroundLogos />

      {/* ================= FAQ ================= */}
      <section className="py-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 dark:text-white">
            Tez-tez so‘raladigan savollar
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>{faq.icon}</span>
                    <h3 className="font-semibold dark:text-white">
                      {faq.question}
                    </h3>
                    {faq.new && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <FaChevronDown
                    className={`transition-transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 text-gray-600 dark:text-gray-300"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-center dark:text-white">
            Biz bilan bog‘laning
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactInfo icon={<FiMapPin />} title="Manzil" text="Toshkent, O‘zbekiston" />
              <ContactInfo icon={<FiMail />} title="Email" text="info@onlinemaktab.uz" />
              <ContactInfo icon={<FiPhone />} title="Telefon" text="+998 90 123 45 67" />
              <ContactInfo icon={<FiClock />} title="Ish vaqti" text="9:00 - 18:00" />
            </div>

            {/* Map */}
            <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden shadow">
              <iframe
                title="Map"
                src="https://yandex.uz/map-widget/v1/"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-white"
          >
            <input name="name" placeholder="Ism" required onChange={handleChange}
              className="p-3 rounded-xl border dark:bg-gray-800" />
            <input name="email" type="email" placeholder="Email" required onChange={handleChange}
              className="p-3 rounded-xl border dark:bg-gray-800" />
            <input name="subject" placeholder="Mavzu" required onChange={handleChange}
              className="p-3 rounded-xl border dark:bg-gray-800 md:col-span-2" />
            <textarea name="message" rows="4" placeholder="Xabar" required onChange={handleChange}
              className="p-3 rounded-xl border dark:bg-gray-800 md:col-span-2" />

            <label className="flex gap-2 text-sm md:col-span-2 dark:text-white">
              <input type="checkbox" name="accepted" onChange={handleChange} /> Shartlarni qabul qilaman
            </label>

            <button className="md:col-span-2 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500">
              Xabarni yuborish
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function ContactInfo({ icon, title, text }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="text-blue-600 text-xl">{icon}</div>
      <div>
        <h3 className="font-semibold dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
      </div>
    </div>
  );
}
