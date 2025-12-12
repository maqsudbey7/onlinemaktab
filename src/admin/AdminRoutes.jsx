import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Courses from "./pages/Courses";
import CourseForm from "./pages/CourseForm";
import Modules from "./pages/Modules";
import Users from "./pages/Users";
import Tests from "./pages/Tests";
import Protected from "./pages/Protected";
import Login from "./pages/Login";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* PUBLIC ADMIN LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ADMIN ROUTES */}
      <Route
        path="/"
        element={
          <Protected>
            <AdminLayout />
          </Protected>
        }
      >
        <Route path="courses" element={<Courses />} />
        <Route path="courses/new" element={<CourseForm />} />
        <Route path="courses/:courseId/edit" element={<CourseForm edit />} />
        <Route path="courses/:courseId/modules" element={<Modules />} />
        <Route path="tests" element={<Tests />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}
