import React from "react";

export default function Users() {
  const users = [
    { id:1, name:"Ali", role:"student" },
    { id:2, name:"Vali", role:"teacher" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u,i)=>(
            <tr key={u.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{i+1}</td>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
