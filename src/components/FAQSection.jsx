import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { question: "Kurslarni kimlar olishi mumkin?", answer: "Kurslar boshlang‘ichdan ilg‘or darajagacha barcha foydalanuvchilar uchun mo‘ljallangan.", icon: "🎓", new: true },
  { question: "Kurslarni tugatgach sertifikat beriladimi?", answer: "Ha, kurslarni muvaffaqiyatli tugatganingizdan so‘ng rasmiy sertifikat beriladi.", icon: "📜" },
  { question: "Darslar onlaynmi yoki yuklab olish mumkinmi?", answer: "Barcha darslar onlayn tarzda mavjud. Ba'zi darslar offline ko‘rish uchun yuklab olish imkoniyati bilan ta'minlangan.", icon: "💻" },
  { question: "Kurslar bepulmi yoki pullimi?", answer: "Ba'zi kurslar bepul, ayrim kurslar esa pullik. Narx va shartlar kurs sahifasida ko‘rsatilgan.", icon: "💰" }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section
      className="py-32 px-6 transition-colors duration-300"
      style={{
        background: "linear-gradient(135deg, #fdf6e3, #c6f1ff)", // Umumiy orqa fon ranglari
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">
          Tez-tez so‘raladigan savollar
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{faq.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">{faq.question}</h3>
                  {faq.new && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">NEW</span>
                  )}
                </div>

                <div
                  className={`text-gray-500 dark:text-gray-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                >
                  <FaChevronDown />
                </div>
              </div>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ maxHeight: 0, opacity: 0 }}
                    animate={{ maxHeight: 200, opacity: 1 }}
                    exit={{ maxHeight: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="px-4 pb-4 text-gray-700 dark:text-gray-300 overflow-hidden"
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
  );
}
