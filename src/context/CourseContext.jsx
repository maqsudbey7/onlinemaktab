// src/context/CourseContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { courses as initialCourses } from "../data/courses";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("courses");
    if (saved) setCourses(JSON.parse(saved));
    else setCourses(initialCourses);
  }, []);

  useEffect(() => {
    if (courses.length > 0) localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  // COURSES
  const addCourse = (course) => setCourses(prev => [...prev, { id: Date.now(), modules: [], tests: [], ...course }]);
  const updateCourse = (courseId, courseData) => setCourses(prev => prev.map(c => c.id === parseInt(courseId) ? { ...c, ...courseData } : c));
  const deleteCourse = (courseId) => setCourses(prev => prev.filter(c => c.id !== parseInt(courseId)));

  // MODULES & LESSONS
  const addModule = (courseId, module) => setCourses(prev => prev.map(c => c.id === courseId ? { ...c, modules: [...c.modules, { id: Date.now(), lessons: [], ...module }] } : c));
  const addLesson = (courseId, moduleId, lesson) => setCourses(prev => prev.map(c => c.id === courseId ? { ...c, modules: c.modules.map(m => m.id === moduleId ? { ...m, lessons: [...m.lessons, { id: Date.now(), ...lesson }] } : m) } : c));

  // TESTS
  const addTest = (courseId, testData) => setCourses(prev => prev.map(c => c.id === courseId ? { ...c, tests: [...(c.tests || []), { id: Date.now(), questions: [], ...testData }] } : c));
  const updateTest = (courseId, testId, testData) => setCourses(prev => prev.map(c => c.id === courseId ? { ...c, tests: c.tests.map(t => t.id === parseInt(testId) ? { ...t, ...testData } : t) } : c));
  const deleteTest = (courseId, testId) => setCourses(prev => prev.map(c => c.id === courseId ? { ...c, tests: c.tests.filter(t => t.id !== parseInt(testId)) } : c));

  // QUESTIONS
  const addQuestion = (courseId, testId, question) => setCourses(prev => prev.map(c => c.id === courseId ? { ...c, tests: c.tests.map(t => t.id === parseInt(testId) ? { ...t, questions: [...(t.questions || []), { id: Date.now(), ...question }] } : t) } : c));
  const updateQuestion = (courseId, testId, questionId, questionData) => setCourses(prev => prev.map(c => c.id === courseId ? { ...c, tests: c.tests.map(t => t.id === parseInt(testId) ? { ...t, questions: t.questions.map(q => q.id === parseInt(questionId) ? { ...q, ...questionData } : q) } : t) } : c));
  const deleteQuestion = (courseId, testId, questionId) => setCourses(prev => prev.map(c => c.id === courseId ? { ...c, tests: c.tests.map(t => t.id === parseInt(testId) ? { ...t, questions: t.questions.filter(q => q.id !== parseInt(questionId)) } : t) } : c));

  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        addModule,
        addLesson,
        addTest,
        updateTest,
        deleteTest,
        addQuestion,
        updateQuestion,
        deleteQuestion
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export const useCourses = () => useContext(CourseContext);
