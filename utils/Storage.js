"use client";

/* =========================
   AUTH SYSTEM
========================= */

export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find((u) => u.email === user.email);
  if (exists) return { success: false, message: "Email đã tồn tại" };

  users.push(user);
  localStorage.setItem("currentUser", JSON.stringify(user));

  window.dispatchEvent(new Event("authChange"));

  return { success: true };
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) return { success: false };

  localStorage.setItem("currentUser", JSON.stringify(user));

  // 🔥 notify toàn app
  window.dispatchEvent(new Event("authChange"));

  return { success: true, user };
};

/* =========================
   WRAPPER
========================= */

export const loginUserSafe = ({ email, password }) => {
  return loginUser(email, password);
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");

  // 🔥 notify toàn app
  window.dispatchEvent(new Event("authChange"));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

/* =========================
   WISHLIST
========================= */

export const getWishlist = () => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("wishlist")) || [];
};

export const addWishlist = (id) => {
  const list = getWishlist();

  if (!list.includes(id)) {
    list.push(id);
  }

  localStorage.setItem("wishlist", JSON.stringify(list));
};

export const removeWishlist = (id) => {
  let list = getWishlist();
  list = list.filter((i) => i !== id);

  localStorage.setItem("wishlist", JSON.stringify(list));
};