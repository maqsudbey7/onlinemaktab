import React, { useState } from "react";
import adminApi from "../../api/adminApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const nav = useNavigate();

  const submit = async(e)=>{
    e.preventDefault();
    const res = await adminApi.post("/auth/login", { email, password: pass });
    localStorage.setItem("token", res.data.token);
    nav("/admin");
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-20 space-y-4">
      <h2 className="text-xl text-center">Admin Login</h2>
      <input className="border p-2 rounded w-full"
        placeholder="email"
        value={email} onChange={e=>setEmail(e.target.value)} />
      <input className="border p-2 rounded w-full"
        placeholder="password"
        type="password"
        value={pass} onChange={e=>setPass(e.target.value)} />
      <button className="bg-blue-600 text-white w-full py-2 rounded">Login</button>
    </form>
  );
}
