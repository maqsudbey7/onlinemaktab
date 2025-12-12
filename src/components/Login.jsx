import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  const fullCode = code.join("");

  if (fullCode === "111111") {
    localStorage.setItem("role", "admin");
    // admin ma'lumotini ham saqlash
    localStorage.setItem("user", JSON.stringify({
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
      onlineDays: 0,
      watchedCourses: []
    }));
    navigate("/admin");
    return;
  }

  if (fullCode === "222222") {
    localStorage.setItem("role", "user");
    localStorage.setItem("user", JSON.stringify({
      name: "Maqsudbek",
      email: "maq@example.com",
      role: "user",
      onlineDays: 0,
      watchedCourses: []
    }));
    navigate("/profile"); // yoki /courses
    return;
  }

  setMessage("❌ Kod xato yoki eskirgan");
};
;

  return (
    <div className="flex items-center justify-center mt-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-[500px] transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between gap-3">
            {code.map((num, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={num}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="w-12 h-12 text-center text-xl border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition-colors"
          >
            Kirish
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center font-medium text-red-600 dark:text-red-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
