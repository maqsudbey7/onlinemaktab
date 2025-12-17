// src/context/CourseContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { courses as initialCourses } from "../data/courses";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  /* ===================== COURSES ===================== */
  const [courses, setCourses] = useState([]);

  /* ===================== TEST SUBJECTS ===================== */
  const [testSubjects, setTestSubjects] = useState([]);

  /* ===================== LOAD ===================== */
  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");
    const savedSubjects = localStorage.getItem("testSubjects");

    if (savedCourses) setCourses(JSON.parse(savedCourses));
    else setCourses(initialCourses);

    if (savedSubjects) setTestSubjects(JSON.parse(savedSubjects));
  }, []);

  /* ===================== SAVE ===================== */
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("testSubjects", JSON.stringify(testSubjects));
  }, [testSubjects]);

  /* ===================== COURSES ===================== */
  const addCourse = (course) =>
    setCourses(prev => [
      ...prev,
      { id: Date.now(), modules: [], tests: [], ...course }
    ]);

  const updateCourse = (courseId, data) =>
    setCourses(prev =>
      prev.map(c => c.id === +courseId ? { ...c, ...data } : c)
    );

  const deleteCourse = (courseId) =>
    setCourses(prev => prev.filter(c => c.id !== +courseId));

  /* ===================== MODULES ===================== */
  const addModule = (courseId, module) =>
    setCourses(prev =>
      prev.map(c =>
        c.id === courseId
          ? { ...c, modules: [...c.modules, { id: Date.now(), lessons: [], ...module }] }
          : c
      )
    );

  const addLesson = (courseId, moduleId, lesson) =>
    setCourses(prev =>
      prev.map(c =>
        c.id === courseId
          ? {
              ...c,
              modules: c.modules.map(m =>
                m.id === moduleId
                  ? { ...m, lessons: [...m.lessons, { id: Date.now(), ...lesson }] }
                  : m
              )
            }
          : c
      )
    );

  /* ===================== TEST SUBJECT (FAN) ===================== */
  const addTestSubject = (data) =>
    setTestSubjects(prev => [
      ...prev,
      { id: Date.now(), tests: [], ...data }
    ]);

  const deleteTestSubject = (subjectId) =>
    setTestSubjects(prev => prev.filter(s => s.id !== +subjectId));

  /* ===================== TESTS ===================== */
  const addTest = (subjectId, test) =>
    setTestSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              tests: [...s.tests, { id: Date.now(), questions: [], ...test }]
            }
          : s
      )
    );

  const deleteTest = (subjectId, testId) =>
    setTestSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? { ...s, tests: s.tests.filter(t => t.id !== +testId) }
          : s
      )
    );

  /* ===================== QUESTIONS ===================== */
  const addQuestion = (subjectId, testId, question) =>
    setTestSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              tests: s.tests.map(t =>
                t.id === testId
                  ? {
                      ...t,
                      questions: [...t.questions, { id: Date.now(), ...question }]
                    }
                  : t
              )
            }
          : s
      )
    );

  const deleteQuestion = (subjectId, testId, questionId) =>
    setTestSubjects(prev =>
      prev.map(s =>
        s.id === subjectId
          ? {
              ...s,
              tests: s.tests.map(t =>
                t.id === testId
                  ? {
                      ...t,
                      questions: t.questions.filter(q => q.id !== +questionId)
                    }
                  : t
              )
            }
          : s
      )
    );

  /* ===================== PROVIDER ===================== */
  return (
    <CourseContext.Provider
      value={{
        /* courses */
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        addModule,
        addLesson,

        /* test subjects */
        testSubjects,
        addTestSubject,
        deleteTestSubject,

        /* tests */
        addTest,
        deleteTest,

        /* questions */
        addQuestion,
        deleteQuestion
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export const useCourses = () => useContext(CourseContext);
