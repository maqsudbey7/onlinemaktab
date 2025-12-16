// AdminPanel.jsx
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import { FiPlus, FiLogOut, FiDownload, FiUpload } from "react-icons/fi";
import { FaUsers, FaBook, FaVideo } from "react-icons/fa";
import { motion } from "framer-motion";
import BackgroundLogos from "../components/BackgroundLogos/BackgroundLogos";

// --------------------------- Storage keys ---------------------------
const STORAGE_KEY = "admin_panel_courses_v1";
const AUTH_KEY = "admin_panel_auth_v1";

// --------------------------- Default courses ---------------------------
const defaultCoursesSeed = [
  {
    id: 1,
    title: "JavaScript",
    description: "JavaScript bo‘yicha to‘liq kurs",
    students: "12,773",
    date: "2025-03-11",
    lessonsCount: 42,
    duration: "15 soat 37 daqiqa",
    reviews: 196,
    image: "/js.webp", // Public link sifatida ishlatiladi
    modules: [
      {
        title: "Asosiy tushunchalar",
        lessons: [
          { title: "Kirish", time: "10:00", video: "https://www.youtube.com/watch?v=9dUhZq9dkHM", keyPoints: ["Intro"] },
          { title: "O'zgaruvchilar", time: "15:00", video: "https://www.youtube.com/watch?v=E9OKpacyUSc", keyPoints: ["let,const"] }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Python",
    description: "Python dasturlash kursi",
    students: "8,412",
    date: "2025-02-20",
    lessonsCount: 30,
    duration: "12 soat 20 daqiqa",
    reviews: 120,
    image: "/python.webp", // Public link
    modules: []
  }
];

// --------------------------- Storage helpers ---------------------------
const readStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCoursesSeed;
    return JSON.parse(raw);
  } catch {
    return defaultCoursesSeed;
  }
};
const writeStorage = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

// --------------------------- Auth Context ---------------------------
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY));
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    const u = { email, role: "admin" };
    localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// --------------------------- Admin Panel ---------------------------
export default function AdminPanel() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<AuthGate />} />
            <Route path="/login" element={<AuthGate />} />
            <Route path="/dashboard/*" element={<ProtectedApp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

// --------------------------- AuthGate ---------------------------
function AuthGate() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    if (auth.user) navigate("/dashboard");
  }, [auth.user]);

  return (
    <div className="flex items-center justify-center h-screen">
      <BackgroundLogos/>
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <input
          className="w-full p-3 border rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded mb-3"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          onClick={() => {
            auth.login(email, pass);
            navigate("/dashboard");
          }}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium"
        >
          Sign in
        </button>
        <p className="mt-3 text-sm text-gray-500">Demo auth — replace with real backend later.</p>
      </div>
    </div>
  );
}

// --------------------------- ProtectedApp ---------------------------
function ProtectedApp() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) navigate("/login");
  }, [auth.user]);

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={() => { auth.logout(); navigate("/login"); }} user={auth.user} />
      <main className="flex-1 p-6">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<CourseList />} />
          <Route path="courses/:id" element={<CourseEditor />} />
          <Route path="import" element={<ImportExport />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
}

// --------------------------- Sidebar ---------------------------
function Sidebar({ onLogout, user }) {
  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold">Admin Panel</h3>
        <p className="text-sm text-gray-500">{user?.email || "admin@example.com"}</p>
      </div>

      <nav className="flex-1 space-y-1">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>
        <Link to="/dashboard/courses" className="block p-2 rounded hover:bg-gray-100">
          Courses
        </Link>
        <Link to="/dashboard/import" className="block p-2 rounded hover:bg-gray-100">
          Import / Export
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 p-2 rounded bg-red-50 hover:bg-red-100 text-red-600"
        >
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}

// --------------------------- Dashboard ---------------------------
function Dashboard() {
  const courses = readStorage();
  const totalCourses = courses.length;
  const totalLessons = courses.reduce((acc, c) => acc + (c.modules?.reduce((s, m) => s + (m.lessons?.length || 0), 0) || 0), 0);
  const totalStudents = courses.reduce((acc, c) => acc + Number((c.students || "0").replace(/[^0-9]/g, "")), 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Courses" value={totalCourses} icon={<FaBook />} />
        <Card title="Lessons" value={totalLessons} icon={<FaVideo />} />
        <Card title="Students (demo)" value={`~${totalStudents}`} icon={<FaUsers />} />
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="p-4 bg-white rounded-xl shadow flex items-center gap-4">
      <div className="text-2xl text-indigo-500">{icon}</div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}

// --------------------------- Course List ---------------------------
function CourseList() {
  const [courses, setCoursesState] = useState(readStorage());
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 8;

  useEffect(() => writeStorage(courses), [courses]);

  const filtered = courses.filter((c) => c.title.toLowerCase().includes(query.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  const addCourse = () => {
    const newCourse = {
      id: Date.now(),
      title: "Yangi kurs",
      description: "",
      date: new Date().toISOString().slice(0, 10),
      modules: [],
      image: "/js.webp",
    };
    setCoursesState([newCourse, ...courses]);
  };

  const remove = (id) => {
    if (!confirm("Kursni o'chirishni tasdiqlaysizmi?")) return;
    setCoursesState(courses.filter((c) => c.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Courses</h2>
        <div className="flex gap-2">
          <input
            placeholder="Qidirish..."
            className="p-2 border rounded"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
          <button onClick={addCourse} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded">
            <FiPlus /> Add
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {shown.map((c) => (
          <motion.div key={c.id} className="p-4 bg-white rounded-xl shadow flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-500">{c.description}</p>
              <div className="text-xs text-gray-400 mt-2">{c.modules?.length || 0} modules</div>
            </div>
            <div className="flex flex-col gap-2">
              <Link to={`/dashboard/courses/${c.id}`} className="px-3 py-2 bg-blue-50 rounded">
                Edit
              </Link>
              <button onClick={() => remove(c.id)} className="px-3 py-2 bg-red-50 rounded">
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          Sahifa {page} / {pages}
        </div>
        <div className="flex gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 bg-gray-100 rounded">
            Prev
          </button>
          <button disabled={page >= pages} onClick={() => setPage((p) => Math.min(p + 1, pages))} className="px-3 py-1 bg-gray-100 rounded">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// --------------------------- Course Editor ---------------------------
function CourseEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(readStorage());
  const courseId = Number(id);
  const course = courses.find((c) => c.id === courseId);
  const [local, setLocal] = useState(course ? deepClone(course) : { id: courseId || Date.now(), title: "", description: "", date: new Date().toISOString().slice(0, 10), modules: [], image: "/js.webp" });

  const save = () => {
    const idx = courses.findIndex((c) => c.id === local.id);
    let next;
    if (idx === -1) next = [local, ...courses];
    else {
      next = [...courses];
      next[idx] = local;
    }
    setCourses(next);
    writeStorage(next);
    alert("Saved");
  };

  const addModule = () => setLocal({ ...local, modules: [...(local.modules || []), { title: "Yangi modul", lessons: [] }] });

  const removeModule = (i) => {
    if (!confirm("Modulni o'chirish?")) return;
    const nextMods = [...local.modules];
    nextMods.splice(i, 1);
    setLocal({ ...local, modules: nextMods });
  };

  const addLesson = (modIndex) => {
    const mods = deepClone(local.modules || []);
    mods[modIndex].lessons.push({ title: "Yangi dars", time: "10:00", video: "", keyPoints: [] });
    setLocal({ ...local, modules: mods });
  };

  const removeLesson = (modIndex, lessonIndex) => {
    if (!confirm("Darsni o'chirish?")) return;
    const mods = deepClone(local.modules || []);
    mods[modIndex].lessons.splice(lessonIndex, 1);
    setLocal({ ...local, modules: mods });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Course editor</h2>
        <div className="flex gap-2">
          <button onClick={() => { save(); navigate("/dashboard/courses"); }} className="px-4 py-2 bg-indigo-600 text-white rounded">Save & Back</button>
          <button onClick={save} className="px-4 py-2 bg-gray-100 rounded">Save</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white p-4 rounded-xl shadow">
          <label className="block mb-2">Title</label>
          <input value={local.title} onChange={(e) => setLocal({ ...local, title: e.target.value })} className="w-full p-2 border rounded mb-3" />

          <label className="block mb-2">Description</label>
          <textarea value={local.description} onChange={(e) => setLocal({ ...local, description: e.target.value })} className="w-full p-2 border rounded mb-3" />

          <label className="block mb-2">Image URL</label>
          <input value={local.image} onChange={(e) => setLocal({ ...local, image: e.target.value })} className="w-full p-2 border rounded mb-3" />

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Modules</h3>
            <div className="space-y-3">
              {(local.modules || []).map((m, mi) => (
                <div key={mi} className="p-3 border rounded">
                  <div className="flex justify-between items-center mb-2">
                    <input className="p-2 border rounded w-1/2" value={m.title} onChange={(e) => { const mods = deepClone(local.modules); mods[mi].title = e.target.value; setLocal({ ...local, modules: mods }); }} />
                    <div className="flex gap-2">
                      <button onClick={() => addLesson(mi)} className="px-2 py-1 bg-green-50 rounded">Add lesson</button>
                      <button onClick={() => removeModule(mi)} className="px-2 py-1 bg-red-50 rounded">Remove</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {m.lessons?.map((l, li) => (
                      <div key={li} className="p-2 bg-gray-50 rounded flex justify-between items-center">
                        <div>
                          <div className="font-medium">{l.title}</div>
                          <div className="text-xs text-gray-400">{l.time} • {l.video ? "video" : "no-video"}</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 bg-red-50 rounded" onClick={() => removeLesson(mi, li)}>Del</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button onClick={addModule} className="px-4 py-2 bg-green-500 text-white rounded flex items-center gap-2"><FiPlus /> Add module</button>
            </div>
          </div>
        </div>

        <aside className="bg-white p-4 rounded-xl shadow space-y-4">
          <div>
            <div className="text-sm text-gray-500">Meta</div>
            <div className="text-lg font-semibold">{local.title || "—"}</div>
            <div className="text-xs text-gray-400">{local.date}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// --------------------------- Import / Export ---------------------------
function ImportExport() {
  const [courses, setCourses] = useState(readStorage());

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(courses, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "courses.json";
    a.click();
  };

  const onFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!Array.isArray(parsed)) throw new Error("Invalid");
        writeStorage(parsed);
        alert("Imported");
      } catch {
        alert("Import error");
      }
    };
    reader.readAsText(f);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Import & Export</h2>
      <div className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div className="flex gap-2">
          <button onClick={exportJSON} className="px-4 py-2 bg-indigo-600 text-white rounded flex items-center gap-2"><FiDownload /> Export JSON</button>
          <label className="px-4 py-2 bg-gray-100 rounded flex items-center gap-2 cursor-pointer"><FiUpload /> <input type="file" accept="application/json" className="hidden" onChange={onFile} /> Import JSON</label>
        </div>
        <p className="text-sm text-gray-500">Use import to restore from backup or seed the system.</p>
      </div>
    </div>
  );
}

// --------------------------- Helpers ---------------------------
function deepClone(v) {
  return JSON.parse(JSON.stringify(v));
}
