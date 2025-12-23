// src/admin/AdminRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/AdminKurslar/Courses";
import CourseForm from "./pages/AdminKurslar/CourseForm";
import Modules from "./pages/AdminKurslar/Modules";
// import Users from "./pages/Users";
import Login from "./pages/Login";
import Protected from "./pages/Protected";
// TEST PAGES
import TestSubjects from "../admin/pages/AdminTest/TestSubjects";
import CreateTestSubject from "../admin/pages/AdminTest/CreateSubject";
import SubjectTests from "../admin/pages/AdminTest/SubjectTests";
import CreateTest from "../admin/pages/AdminTest/CreateTest";
import EditTest from "./pages/AdminTest/EditTest";
import NotFound from "../components/NotFound/NotFound";




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
        {/* <Route path="users" element={<Users />} /> */}

        {/* Test */}

         <Route path="tests" element={<TestSubjects />} />
        <Route path="tests/create" element={<CreateTestSubject />} />
        <Route path="tests/:subjectId" element={<SubjectTests />} />
        <Route path="tests/:subjectId/create" element={<CreateTest />} />
        <Route path="/admin/tests/:subjectId/edit/:testId" element={<EditTest />} />

        <Route path="*" element={<NotFound/>} />


       
      </Route>
    </Routes>
  );
}
