import React, { useEffect, useState } from "react";
import adminApi from "../../api/adminApi";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminApi.get("/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Users</h1>
      <table className="w-full">
        <thead>
          <tr><th>#</th><th>Name</th><th>Role</th></tr>
        </thead>
        <tbody>
          {users.map((u, i)=>(
            <tr key={u._id}>
              <td>{i+1}</td>
              <td>{u.name}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
