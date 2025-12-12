import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function Topics() {
  const { moduleId } = useParams();
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    adminApi.get(`/modules/${moduleId}/topics`)
      .then(res => setTopics(res.data))
      .catch(err => console.error(err));
  }, [moduleId]);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Topics</h1>
        <Link to="new" className="px-3 py-2 bg-blue-600 text-white rounded">New</Link>
      </div>

      <ul className="space-y-4">
        {topics.map(t => (
          <li key={t._id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <b className="text-lg">{t.title}</b>
              <p className="text-gray-600">{t.videos?.length || 0} videos</p>
              {t.videos?.map((v, i) => (
                v.url && (
                  <video
                    key={i}
                    src={v.url} // admin tomonidan berilgan link
                    controls
                    className="w-full mt-2 max-w-md rounded border"
                  />
                )
              ))}
            </div>
            <Link to={`/admin/topics/${t._id}/videos`} className="text-blue-600 mt-2 md:mt-0">Videos</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
