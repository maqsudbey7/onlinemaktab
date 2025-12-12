// src/admin/pages/Modules.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function Modules() {
  const { courseId } = useParams(); // agar route shunday bo‘lsa
  const [modules, setModules] = useState([]);

  useEffect(()=> {
    // agar courseId bo'lsa shu kursning modullarini chaqirish
    // else: list all modules
    const url = courseId ? `/courses/${courseId}/modules` : "/modules";
    adminApi.get(url).then(res => setModules(res.data)).catch(()=>{});
  }, [courseId]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Modules</h1>
        <Link to="#" className="px-3 py-2 bg-green-600 text-white rounded">New Module</Link>
      </div>

      <ul className="space-y-3">
        {modules.map(m => (
          <li key={m._id} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-gray-500">{m.topics?.length || 0} topics</div>
              </div>
              <div>
                <Link to={`/admin/modules/${m._id}/topics`} className="text-blue-600">Open</Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
