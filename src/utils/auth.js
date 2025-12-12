// src/utils/auth.js

// Foydalanuvchini olish
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

// Foydalanuvchini saqlash
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Foydalanuvchini o'chirish
export const removeUser = () => {
  localStorage.removeItem("user");
};
