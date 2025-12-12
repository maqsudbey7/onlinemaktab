import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import FAQSection from "./components/FAQSection";
import TestsSection from "./page/Test/TestsSection";
import TestPage from "./page/Test/Quiz";
import Result from "./page/Test/Result";
import CourseDetail from "./page/Kurslar/CourseDetail";
import Courses from "./page/Kurslar/Courses";
import LessonDetail from "./page/Kurslar/LessonDetail";
import Contact from "./page/Contact/Contact";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const PrivateRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/test" element={<TestsSection />} />
          <Route path="/FAQ" element={<FAQSection />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/test/:testId" element={<TestPage />} />
          <Route path="/result" element={<Result />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses/:courseId/lesson/:lessonId" element={<LessonDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
