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

    // Admin kodini o'zing belgilaysan
    if (fullCode === "111111") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
      return;
    }

    // oddiy user bo'lsa
    if (fullCode === "222222") {
      localStorage.setItem("role", "user");
      navigate("/courses");
      return;
    }

    setMessage("❌ Kod xato yoki eskirgan");
  };

  return (
    <div className="flex items-center justify-center mt-12">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[500px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

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
                className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition"
          >
            Kirish
          </button>
        </form>

        {message && (
          <p className="mt-6 text-center font-medium text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
