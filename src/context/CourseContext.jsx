import React, { createContext, useContext, useEffect, useState } from "react";
import { courses as initialCourses } from "../data/courses";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  /* ===================== COURSES ===================== */
  const [courses, setCourses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState({});

  /* ===================== TEST SUBJECTS ===================== */
  const [testSubjects, setTestSubjects] = useState([]);

  /* ===================== LOAD ===================== */
  useEffect(() => {
    const savedCourses = localStorage.getItem("courses");
    const savedTests = localStorage.getItem("testSubjects");
    const savedWatched = localStorage.getItem("watchedLessons");

    if (savedCourses) setCourses(JSON.parse(savedCourses));
    else setCourses(initialCourses);

    if (savedTests) setTestSubjects(JSON.parse(savedTests));
    if (savedWatched) setWatched(JSON.parse(savedWatched));
  }, []);

  /* ===================== SAVE ===================== */
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("testSubjects", JSON.stringify(testSubjects));
  }, [testSubjects]);

  useEffect(() => {
    localStorage.setItem("watchedLessons", JSON.stringify(watched));
  }, [watched]);

  /* ===================== FAVORITES ===================== */
  const toggleFavorite = (id) =>
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );

  /* ===================== WATCHED LESSONS ===================== */
  const markLessonWatched = (courseId, moduleIndex, lessonIndex) => {
    setWatched(prev => {
      const updated = {
        ...prev,
        [courseId]: {
          ...prev[courseId],
          [`${moduleIndex}-${lessonIndex}`]: true
        }
      };
      return updated;
    });
  };

  /* ===================== COURSES CRUD ===================== */
  const addCourse = (course) =>
    setCourses(prev => [
      ...prev,
      {
        id: Date.now(),
        modules: [],
        ...course
      }
    ]);

  const updateCourse = (courseId, data) =>
    setCourses(prev =>
      prev.map(c =>
        c.id === +courseId ? { ...c, ...data } : c
      )
    );

  const deleteCourse = (courseId) =>
    setCourses(prev => prev.filter(c => c.id !== +courseId));

  /* ===================== MODULES ===================== */
  const addModule = (courseId, module) =>
    setCourses(prev =>
      prev.map(c =>
        c.id === +courseId
          ? {
              ...c,
              modules: [
                ...c.modules,
                {
                  id: Date.now(),
                  lessons: [],
                  ...module
                }
              ]
            }
          : c
      )
    );

  const deleteModule = (courseId, moduleId) =>
    setCourses(prev =>
      prev.map(c =>
        c.id === +courseId
          ? { ...c, modules: c.modules.filter(m => m.id !== +moduleId) }
          : c
      )
    );

  /* ===================== LESSONS ===================== */
  const addLesson = (courseId, moduleId, lesson) =>
    setCourses(prev =>
      prev.map(c =>
        c.id === +courseId
          ? {
              ...c,
              modules: c.modules.map(m =>
                m.id === +moduleId
                  ? { ...m, lessons: [...m.lessons, { id: Date.now(), ...lesson }] }
                  : m
              )
            }
          : c
      )
    );

  /* ===================== TEST SUBJECTS ===================== */
  const addTestSubject = (subject) =>
    setTestSubjects(prev => [
      ...prev,
      { id: Date.now(), tests: [], ...subject }
    ]);

  const deleteTestSubject = (subjectId) =>
    setTestSubjects(prev =>
      prev.filter(s => s.id !== +subjectId)
    );

  /* ===================== TEST QUESTIONS ===================== */
  const addTestQuestion = (subjectId, test) =>
    setTestSubjects(prev =>
      prev.map(s =>
        s.id === +subjectId
          ? { ...s, tests: [...s.tests, { id: Date.now(), ...test }] }
          : s
      )
    );

  const deleteTestQuestion = (subjectId, testId) =>
    setTestSubjects(prev =>
      prev.map(s =>
        s.id === +subjectId
          ? { ...s, tests: s.tests.filter(t => t.id !== +testId) }
          : s
      )
    );

  const updateTest = (subjectId, testId, data) =>
    setTestSubjects(prev =>
      prev.map(s =>
        s.id === +subjectId
          ? { ...s, tests: s.tests.map(t => t.id === +testId ? { ...t, ...data } : t) }
          : s
      )
    );

  /* ===================== PROVIDER ===================== */
  return (
    <CourseContext.Provider
      value={{
        courses,
        favorites,
        watched,
        toggleFavorite,
        markLessonWatched,
        addCourse,
        updateCourse,
        deleteCourse,
        addModule,
        addLesson,
        deleteModule,
        testSubjects,
        addTestSubject,
        deleteTestSubject,
        addTestQuestion,
        deleteTestQuestion,
        updateTest,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export const useCourses = () => useContext(CourseContext);
