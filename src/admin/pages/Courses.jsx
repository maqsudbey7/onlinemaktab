import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Backend yo‘q → mock data ishlatamiz
    const mockCourses = [
      { _id: "1", title: "React Basics", modules: [1, 2] },
      { _id: "2", title: "Node.js Advanced", modules: [1] },
      { _id: "3", title: "Express + MongoDB", modules: [] },
    ];

    setTimeout(() => { // simulyatsiya loading
      setCourses(mockCourses);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Courses</h1>
        <Link to="/admin/courses/new" className="px-4 py-2 bg-blue-600 text-white rounded">New Course</Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="bg-white shadow rounded p-4">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">#</th>
                <th className="py-2">Title</th>
                <th className="py-2">Modules</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((c, idx) => (
                <tr key={c._id || idx} className="border-t">
                  <td className="py-2">{idx + 1}</td>
                  <td className="py-2">{c.title}</td>
                  <td className="py-2">{c.modules?.length || 0}</td>
                  <td className="py-2">
                    <Link to={`/admin/courses/${c._id}/edit`} className="mr-2 text-blue-600">Edit</Link>
                    <Link to={`/admin/courses/${c._id}/modules`} className="text-green-600">Modules</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
