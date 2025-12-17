import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  useEffect(() => {
    const saved = localStorage.getItem("users");
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      const initial = [
        { id: 1, name: "Ali", role: "student" },
        { id: 2, name: "Vali", role: "teacher" },
      ];
      setUsers(initial);
      localStorage.setItem("users", JSON.stringify(initial));
    }
  }, []);

  const saveUsers = (data) => {
    setUsers(data);
    localStorage.setItem("users", JSON.stringify(data));
  };

  const addUser = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    saveUsers([
      ...users,
      { id: Date.now(), name, role },
    ]);

    setName("");
    setRole("student");
  };

  const deleteUser = (id) => {
    if (!confirm("Userni o‘chirmoqchimisiz?")) return;
    saveUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">
        Users Management
      </h1>

      {/* Add user */}
      <form
        onSubmit={addUser}
        className="mb-6 p-5 rounded-xl shadow
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          flex flex-wrap gap-4 items-end"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg
              bg-gray-50 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="User name"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 rounded-lg
              bg-gray-50 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          className="px-6 py-2 rounded-lg font-medium
            bg-blue-600 hover:bg-blue-700
            text-white transition"
        >
          Add User
        </button>
      </form>

      {/* Table */}
      <div className="overflow-hidden rounded-xl shadow border
        border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-sm">#</th>
              <th className="px-4 py-3 text-left text-sm">Name</th>
              <th className="px-4 py-3 text-left text-sm">Role</th>
              <th className="px-4 py-3 text-center text-sm">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.id}
                className="border-t border-gray-200 dark:border-gray-700
                  hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-3">{i + 1}</td>
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3 capitalize text-gray-600 dark:text-gray-400">
                  {u.role}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="text-red-600 hover:text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  Users mavjud emas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
