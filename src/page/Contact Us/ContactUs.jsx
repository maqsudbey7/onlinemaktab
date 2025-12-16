import React, { useState } from "react";
import { FiMapPin, FiMail, FiPhone, FiClock } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundLogos from "../../components/BackgroundLogos/BackgroundLogos";

export default function ContactUs() {
    /* ================= FAQ ================= */
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
                "Ba'zi kurslar bepul, ayrim kurslar esa pullik. Narx va shartlar kurs sahifasida ko‘rsatilgan.",
            icon: "💰",
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    /* ================= CONTACT FORM ================= */
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
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
            accepted: false,
        });
    };

    return (
        <main className="w-full">
<BackgroundLogos/>
            {/* ================= FAQ SECTION ================= */}
            <section className="py-8 px-6  dark:bg-gray-900 transition-colors">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
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
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform"
                            >
                                {/* Question */}
                                <div
                                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    onClick={() =>
                                        setOpenIndex(openIndex === index ? null : index)
                                    }
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{faq.icon}</span>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                                            {faq.question}
                                        </h3>
                                        {faq.new && (
                                            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                    <FaChevronDown
                                        className={`transition-transform ${openIndex === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>

                                {/* Answer */}
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ maxHeight: 0, opacity: 0 }}
                                            animate={{ maxHeight: 200, opacity: 1 }}
                                            exit={{ maxHeight: 0, opacity: 0 }}
                                            transition={{ duration: 0.4 }}
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

            {/* ================= CONTACT SECTION ================= */}
            <section className="py-12 px-6 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 transition-colors">
                <div className="max-w-6xl mx-auto space-y-10">
                    <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                        Biz bilan bog'laning
                    </h1>

                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <ContactInfo icon={<FiMapPin />} title="Manzil" text="Toshkent shahri, O'zbekiston" />
                            <ContactInfo icon={<FiMail />} title="Email" text="info@onlinemaktab.uz" />
                            <ContactInfo icon={<FiPhone />} title="Telefon" text="+998 (90) 123-45-67" />
                            <ContactInfo icon={<FiClock />} title="Ish vaqti" text="Dushanba–Juma: 9:00 - 18:00" />
                        </div>

                        {/* Map */}
                        <div className="w-full h-80 md:h-60 rounded-xl overflow-hidden shadow-lg">
                            <iframe
                                title="Yandex Map"
                                src="https://yandex.uz/map-widget/v1/?um=constructor%3Aabcdef123456&source=constructor"
                                width="100%"
                                height="100%"
                                className="border-0"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ismingiz"
                            required
                            className="p-3 rounded-xl border dark:bg-gray-800     placeholder-gray-500 dark:placeholder-gray-300
"
                        />
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                            className="p-3 rounded-xl border dark:bg-gray-800     placeholder-gray-500 dark:placeholder-gray-300
"
                        />
                        <input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Mavzu"
                            required
                            className="p-3 rounded-xl border dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-300
"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Xabar"
                            required
                            className="p-3 rounded-xl border dark:bg-gray-800     placeholder-gray-500 dark:placeholder-gray-300
"
                        />
                        <label className="md:col-span-2 flex gap-2 text-sm  dark:text-white">
                            <input
                                type="checkbox"
                                name="accepted"
                                checked={formData.accepted}
                                onChange={handleChange}
                                required
                                className=""
                            />
                            Men shartlarni qabul qilaman
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

/* ================= Small Component ================= */
function ContactInfo({ icon, title, text }) {
    return (
        <div className="flex items-center gap-3">
            <div className="text-blue-600 text-2xl">{icon}</div>
            <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{text}</p>
            </div>
        </div>
    );
}
