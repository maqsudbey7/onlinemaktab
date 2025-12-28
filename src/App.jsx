import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import TestsSection from "./page/Test/TestsSection";
import Quiz from "./page/Test/Quiz";
import Result from "./page/Test/Result";
import CourseDetail from "./page/Kurslar/CourseDetail";
import Courses from "./page/Kurslar/Courses";
import LessonDetail from "./page/Kurslar/LessonDetail";
import Login from "./components/Login";
import Profile from "./page/userProfile/Profile";
import ContactUs from "./page/Contact Us/ContactUs";
import NotFound from "./components/NotFound/NotFound";
import TestCategories from "./page/Test/TestCategories";



export default function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const PrivateRoute = ({ children }) => {
    if (!token) return <Navigate to="/login" replace />;
    return children;
  };

  return (
    <Routes>
      <Route element={<Layout />}>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Kurslar */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:courseId/lesson/:lessonId" element={<LessonDetail />} />

        {/* Contact */}
        <Route path="contactUs" element={<ContactUs />} />

        {/* Test Page */}
        {/* Test Section */}
        <Route path="/test" element={<TestsSection />} />
        <Route path="/test/:subject" element={<TestCategories />} />
        <Route path="/test/:subject/:category" element={<Quiz />} />
        <Route path="/result" element={<Result />} />



        {/* UserProfile */}
        <Route path="/profile" element={<Profile />} />

        {/* NotFound */}
        <Route path="*" element={<NotFound />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />


      </Route>
    </Routes>
  );
}
