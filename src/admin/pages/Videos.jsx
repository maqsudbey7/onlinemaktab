import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import adminApi from "../../api/adminApi";

export default function Videos() {
  const { topicId } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    adminApi.get(`/topics/${topicId}/videos`)
      .then(res => setVideos(res.data))
      .catch(() => {});
  }, [topicId]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl">Videos</h1>
        <Link to="new" className="px-3 py-2 bg-blue-600 text-white rounded">Add Video</Link>
      </div>

      <div className="space-y-3">
        {videos.map(v => (
          <div key={v._id} className="bg-white p-3 rounded shadow">
            <b>{v.title}</b>
            <p className="text-gray-600">{v.url}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
