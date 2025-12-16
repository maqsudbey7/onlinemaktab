// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <>
//     <App /></>

// );

// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"; // sizning asosiy site
import AdminRoutes from "./admin/AdminRoutes";
import "./index.css";
import { CourseProvider } from "./context/CourseContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CourseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </CourseProvider>
  </React.StrictMode>
);
