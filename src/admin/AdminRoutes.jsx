import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
// import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseForm from "./pages/CourseForm";
import Modules from "./pages/Modules";
import Users from "./pages/Users";
import Tests from "./pages/Tests";
import Protected from "./pages/Protected";

export default function AdminRoutes() {

    return (
        <Routes>
            <Route path="/" element={
                <Protected>
                    <AdminLayout />
                </Protected>
            }>
                {/* <Route index element={<Dashboard />} /> */}
                <Route path="courses" element={<Courses />} />
                <Route path="courses/new" element={<CourseForm />} />
                <Route path="courses/:courseId/edit" element={<CourseForm edit />} />
                <Route path="courses/:courseId/modules" element={<Modules />} />
                <Route path="tests" element={<Tests />} />
                <Route path="users" element={<Users />} />

                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
        </Routes>
    );
}
