// src/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/AdminKurslar/Courses";
import CourseForm from "./pages/AdminKurslar/CourseForm";
import Modules from "./pages/AdminKurslar/Modules";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Protected from "./pages/Protected";

// Tests
import AllTests from "./pages/AdminTest/AllTests"; // Barcha testlar ro'yxati
import Tests from "./pages/AdminTest/Tests"; // Kursga oid testlar
import TestQuestions from "./pages/AdminTest/TestQuestions"; // Savollar

export default function AdminRoutes() {
  return (
    <Routes>
      {/* LOGIN sahifasi */}
      <Route path="/login" element={<Login />} />

      {/* ADMIN PANEL */}
      <Route
        path="/"
        element={
          <Protected>
            <AdminLayout />
          </Protected>
        }
      >
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Kurslar */}
        <Route path="courses" element={<Courses />} />
        <Route path="courses/new" element={<CourseForm />} />
        <Route path="courses/:courseId/edit" element={<CourseForm edit />} />
        <Route path="courses/:courseId/modules" element={<Modules />} />

        {/* Users */}
        <Route path="users" element={<Users />} />

        {/* Tests */}
        {/* Umumiy testlar sahifasi */}
        <Route path="tests" element={<AllTests />} />
        {/* Kursga oid testlar */}
        <Route path="courses/:courseId/tests" element={<Tests />} />
        {/* Test savollarini boshqarish */}
        <Route path="courses/:courseId/tests/:testId" element={<TestQuestions />} />
      </Route>
    </Routes>
  );
}
