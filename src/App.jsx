import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import FAQSection from "./components/FAQSection";
import TestsSection from "./page/Test/TestsSection";
import TestPage from "./page/Test/Quiz";
import Result from "./page/Test/Result";
import CourseDetail from "./page/Kurslar/CourseDetail";
import Courses from "./page/Kurslar/Courses";
import LessonDetail from "./page/Kurslar/LessonDetail";
import Contact from "./page/Contact/Contact";
import Layout from "./layout/Layout";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // Initial dark mode from localStorage
  useEffect(() => {
    const darkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(darkMode);
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => {
      const newDark = !prev;
      if (newDark) document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", newDark.toString());
      return newDark;
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout isDark={isDark} toggleDarkMode={toggleDarkMode} />}>
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
