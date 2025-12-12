import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";

export default function Tests() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    adminApi.get("/tests").then(res => setTests(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Tests</h1>
      <ul className="space-y-3">
        {tests.map(t => (
          <li key={t._id} className="bg-white p-3 shadow rounded">
            <b>{t.name}</b> – {t.questions?.length} questions
          </li>
        ))}
      </ul>
    </div>
  );
}
