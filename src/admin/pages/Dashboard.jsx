import React from "react";
import { useCourses } from "../../context/CourseContext";
import { FiBook, FiUsers, FiLayers } from "react-icons/fi";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { courses } = useCourses();

  // Fake users data
  const users = [
    { id:1, name:"Ali", role:"student" },
    { id:2, name:"Vali", role:"student" },
    { id:3, name:"Olim", role:"teacher" },
  ];

  // Chart data (lessons count per course)
  const chartData = courses.map(c => ({ name: c.title, lessons: c.lessonsCount }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow flex items-center gap-4 hover:shadow-lg transition-shadow">
          <FiBook className="text-4xl text-blue-500"/>
          <div>
            <p className="text-sm text-gray-500">Courses</p>
            <p className="text-2xl font-bold">{courses.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow flex items-center gap-4 hover:shadow-lg transition-shadow">
          <FiUsers className="text-4xl text-green-500"/>
          <div>
            <p className="text-sm text-gray-500">Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded shadow flex items-center gap-4 hover:shadow-lg transition-shadow">
          <FiLayers className="text-4xl text-purple-500"/>
          <div>
            <p className="text-sm text-gray-500">Modules</p>
            <p className="text-2xl font-bold">{courses.reduce((sum,c)=>sum+c.modules.length,0)}</p>
          </div>
        </div>
      </div>

      {/* Lessons chart */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Lessons per Course</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="lessons" stroke="#1D4ED8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
