import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function Topics() {
  const { moduleId } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    adminApi.get(`/modules/${moduleId}/topics`)
      .then(res => setTopics(res.data))
      .catch(() => {});
  }, [moduleId]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Topics</h1>
        <Link to="new" className="px-3 py-2 bg-blue-600 text-white rounded">New</Link>
      </div>

      <ul className="space-y-3">
        {topics.map(t => (
          <li key={t._id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>
              <b>{t.title}</b>
              <p className="text-gray-600">{t.videos?.length || 0} videos</p>
            </div>
            <Link to={`/admin/topics/${t._id}/videos`} className="text-blue-600">Videos</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
