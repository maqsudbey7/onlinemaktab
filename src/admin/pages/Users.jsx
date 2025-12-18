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
    <div className="p-6 max-w-6xl mx-auto text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-8 text-center">Users Management</h1>

      {/* Add user */}
      <form
        onSubmit={addUser}
        className="mb-8 p-6 rounded-2xl shadow-lg
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-700
          flex flex-col md:flex-row gap-4 items-end transition-all"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400 font-medium">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition"
            placeholder="User name"
          />
        </div>

        <div className="min-w-[150px]">
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400 font-medium">
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-3 rounded-xl
              bg-gray-50 dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          className="px-6 py-3 rounded-xl font-semibold
            bg-gradient-to-r from-blue-500 to-indigo-500
            hover:from-indigo-500 hover:to-blue-500
            text-white shadow-lg transition-all"
        >
          Add User
        </button>
      </form>

      {/* User cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.length > 0 ? (
          users.map((u) => (
            <div
              key={u.id}
              className="p-5 rounded-2xl shadow-md
                bg-white dark:bg-gray-900
                border border-gray-200 dark:border-gray-700
                hover:shadow-xl transform hover:-translate-y-1
                transition-all"
            >
              <h2 className="text-lg font-bold mb-2">{u.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 capitalize mb-4">
                Role: {u.role}
              </p>
              <button
                onClick={() => deleteUser(u.id)}
                className="px-4 py-2 rounded-xl
                  bg-red-500 hover:bg-red-600
                  text-white font-medium transition-all"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12 text-lg">
            Users mavjud emas
          </p>
        )}
      </div>
    </div>
  );
}
