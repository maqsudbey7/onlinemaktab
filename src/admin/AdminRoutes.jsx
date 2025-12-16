import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Courses from "./pages/Courses";
import CourseForm from "./pages/CourseForm";
import Modules from "./pages/Modules";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
import TestForm from "./pages/AdminTest/TestForm";
import TestsPage from "./pages/AdminTest/TestsPage";
import TestDetailForm from "./pages/AdminTest/TestDetailForm";
// import UserTests from "./pages/UserTests";


// Admin test componentlari

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
        <Route path="users" element={<Users />} />
        <Route path="tests" element={<TestsPage />} />                     {/* /admin/tests */}
        <Route path="tests/:courseId/new" element={<TestForm />} />        {/* /admin/tests/1/new */}
        <Route path="tests/:courseId/:testId" element={<TestDetailForm />} /> {/* test detail / savollar */}

      </Route>
    </Routes>
  );
}
