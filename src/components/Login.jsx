import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackgroundLogos from "./BackgroundLogos/BackgroundLogos";

export default function Login() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  /* ================= BACKSPACE ================= */
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");

    /* ========= ADMIN ========= */
    if (fullCode === "111111") {
      const adminUser = {
        id: 1,
        name: "Admin",
        role: "admin",
        loginAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(adminUser));
      window.dispatchEvent(new Event("userChanged"));

      navigate(location.state?.from || "/admin", { replace: true });
      return;
    }

    /* ========= USER ========= */
    const validUserCodes = ["222222", "333333"];

    if (validUserCodes.includes(fullCode)) {
      const normalUser = {
        id: Date.now(),
        name: "User",
        role: "user",
        loginAt: new Date().toISOString(),
      };

      localStorage.setItem("user", JSON.stringify(normalUser));
      window.dispatchEvent(new Event("userChanged"));

      navigate(location.state?.from || "/profile", { replace: true });
      return;
    }

    /* ========= ERROR ========= */
    setError("❌ Kod noto‘g‘ri yoki muddati tugagan");
    setCode(["", "", "", "", "", ""]);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className=" flex mt-6 items-center justify-center dark:bg-gray-900 transition-colors">
      <BackgroundLogos/>
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-xl w-full max-w-md transition-colors">

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">
          Login
        </h2>

        <p className="mb-6 text-sm text-center text-gray-600 dark:text-gray-300">
          Kirish kodini{" "}
          <a
            href="https://t.me/AroN_Zade"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 underline"
          >
            @AroN_Zade
          </a>{" "}
          orqali olishingiz mumkin
        </p>

        {/* CODE INPUTS */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-3">
            {code.map((num, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={num}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => (inputsRef.current[idx] = el)}
                className="
                  w-12 h-12 text-center text-xl rounded-lg
                  border border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  text-gray-900 dark:text-white
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  transition-colors
                "
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Kirish
          </button>
        </form>

        {/* ERROR */}
        {error && (
          <p className="mt-6 text-center font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
