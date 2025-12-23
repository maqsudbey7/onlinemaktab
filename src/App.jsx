import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./page/Home";
import TestsSection from "./page/Test/TestsSection";
import TestPage from "./page/Test/Quiz";
import Result from "./page/Test/Result";
import CourseDetail from "./page/Kurslar/CourseDetail";
import Courses from "./page/Kurslar/Courses";
import LessonDetail from "./page/Kurslar/LessonDetail";
import Login from "./components/Login";
// import Register from "./components/Register";
import Profile from "./page/userProfile/Profile";
import ContactUs from "./page/Contact Us/ContactUs";
import NotFound from "./components/NotFound/NotFound";

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
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/test" element={<TestsSection />} />
        <Route path="contactUs" element={<ContactUs/>}/>

        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/test/:testId" element={<TestPage />} />
        <Route path="/result" element={<Result />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound/>} />
        

        <Route path="/courses/:courseId/lesson/:lessonId" element={<LessonDetail />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        {/* Protected example */}
        {/* <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} /> */}
        
      </Route>
    </Routes>
  );
}
