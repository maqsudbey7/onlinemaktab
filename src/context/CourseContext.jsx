import React, { createContext, useContext, useEffect, useState } from "react";
import { courses as initialCourses } from "../data/courses";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  /* ===================== STATES ===================== */
  const [courses, setCourses] = useState(initialCourses);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState({});
  const [testSubjects, setTestSubjects] = useState([]);

  /* ===================== LOAD FROM LOCALSTORAGE ===================== */
  useEffect(() => {
    const c = localStorage.getItem("courses");
    const f = localStorage.getItem("favorites");
    const w = localStorage.getItem("watchedLessons");
    const t = localStorage.getItem("testSubjects");

    if (c) setCourses(JSON.parse(c));
    if (f) setFavorites(JSON.parse(f));
    if (w) setWatched(JSON.parse(w));
    if (t) setTestSubjects(JSON.parse(t));
  }, []);

  /* ===================== SAVE TO LOCALSTORAGE ===================== */
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("watchedLessons", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    localStorage.setItem("testSubjects", JSON.stringify(testSubjects));
  }, [testSubjects]);

  /* ===================== FAVORITES ===================== */
  const toggleFavorite = (courseId) => {
    setFavorites((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const resetFavorites = () => setFavorites([]);

  /* ===================== WATCHED ===================== */
  const markLessonWatched = (courseId, moduleIndex, lessonIndex) => {
    setWatched((prev) => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [`${moduleIndex}-${lessonIndex}`]: true,
      },
    }));
  };

  const isLessonWatched = (courseId, moduleIndex, lessonIndex) => {
    return watched?.[courseId]?.[`${moduleIndex}-${lessonIndex}`] || false;
  };

  const resetCourseProgress = (courseId) => {
    setWatched((prev) => {
      const updated = { ...prev };
      delete updated[courseId];
      return updated;
    });
  };

  /* ===================== COURSE PROGRESS ===================== */
  const getCourseProgress = (courseId) => {
    const course = courses.find((c) => c.id === +courseId);
    if (!course) return 0;

    let total = 0;
    let done = 0;

    course.modules.forEach((m, mi) => {
      m.lessons.forEach((_, li) => {
        total++;
        if (watched?.[courseId]?.[`${mi}-${li}`]) done++;
      });
    });

    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  /* ===================== COURSES CRUD ===================== */
  const addCourse = (course) => {
    setCourses((prev) => [
      ...prev,
      { id: Date.now(), modules: [], ...course },
    ]);
  };

  const updateCourse = (courseId, data) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === +courseId ? { ...c, ...data } : c))
    );
  };

  const deleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== +courseId));
    resetCourseProgress(courseId);
  };

  /* ===================== MODULES ===================== */
  const addModule = (courseId, module) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === +courseId
          ? {
              ...c,
              modules: [
                ...c.modules,
                { id: Date.now(), lessons: [], ...module },
              ],
            }
          : c
      )
    );
  };

  const deleteModule = (courseId, moduleId) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === +courseId
          ? { ...c, modules: c.modules.filter((m) => m.id !== +moduleId) }
          : c
      )
    );
  };

  /* ===================== LESSONS ===================== */
  const addLesson = (courseId, moduleId, lesson) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === +courseId
          ? {
              ...c,
              modules: c.modules.map((m) =>
                m.id === +moduleId
                  ? {
                      ...m,
                      lessons: [...m.lessons, { id: Date.now(), ...lesson }],
                    }
                  : m
              ),
            }
          : c
      )
    );
  };

  const updateLesson = (courseId, moduleId, lessonId, data) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === +courseId
          ? {
              ...c,
              modules: c.modules.map((m) =>
                m.id === +moduleId
                  ? {
                      ...m,
                      lessons: m.lessons.map((l) =>
                        l.id === +lessonId ? { ...l, ...data } : l
                      ),
                    }
                  : m
              ),
            }
          : c
      )
    );
  };

  const deleteLesson = (courseId, moduleId, lessonId) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === +courseId
          ? {
              ...c,
              modules: c.modules.map((m) =>
                m.id === +moduleId
                  ? {
                      ...m,
                      lessons: m.lessons.filter((l) => l.id !== +lessonId),
                    }
                  : m
              ),
            }
          : c
      )
    );
  };

  /* ===================== TEST SUBJECTS ===================== */
  const addTestSubject = (subject) => {
    setTestSubjects((prev) => [
      ...prev,
      { id: Date.now(), tests: [], ...subject },
    ]);
  };

  const deleteTestSubject = (subjectId) => {
    setTestSubjects((prev) => prev.filter((s) => s.id !== +subjectId));
  };

  const addTestQuestion = (subjectId, test) => {
    setTestSubjects((prev) =>
      prev.map((s) =>
        s.id === +subjectId
          ? { ...s, tests: [...s.tests, { id: Date.now(), ...test }] }
          : s
      )
    );
  };

  const deleteTestQuestion = (subjectId, testId) => {
    setTestSubjects((prev) =>
      prev.map((s) =>
        s.id === +subjectId
          ? { ...s, tests: s.tests.filter((t) => t.id !== +testId) }
          : s
      )
    );
  };

  const updateTest = (subjectId, testId, data) => {
    setTestSubjects((prev) =>
      prev.map((s) =>
        s.id === +subjectId
          ? {
              ...s,
              tests: s.tests.map((t) =>
                t.id === +testId ? { ...t, ...data } : t
              ),
            }
          : s
      )
    );
  };

  /* ===================== PROVIDER ===================== */
  return (
    <CourseContext.Provider
      value={{
        courses,
        favorites,
        watched,
        testSubjects,

        toggleFavorite,
        resetFavorites,

        markLessonWatched,
        isLessonWatched,
        resetCourseProgress,
        getCourseProgress,

        addCourse,
        updateCourse,
        deleteCourse,

        addModule,
        deleteModule,

        addLesson,
        updateLesson,
        deleteLesson,

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
