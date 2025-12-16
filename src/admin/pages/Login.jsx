import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && pass === "123456") {
      localStorage.setItem("token", "fake-admin-token");
      nav("/admin");
    } else {
      alert("Email yoki password xato!");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
      <input
        className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-3 rounded w-full focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="Password"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors">
        Login
      </button>
    </form>
  );
}
