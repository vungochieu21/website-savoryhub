"use client";

/* AUTH SYSTEM */

export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find((u) => u.name === user.name);
  if (exists) {
    return { success: false, message: "Tên tài khoản đã tồn tại" };
  }

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  localStorage.setItem("currentUser", JSON.stringify(user));

  window.dispatchEvent(new Event("authChange"));

  return { success: true };
};

export const loginUser = (name, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.name === name && u.password === password
  );

  if (!user) return { success: false };

  localStorage.setItem("currentUser", JSON.stringify(user));

  window.dispatchEvent(new Event("authChange"));

  return { success: true, user };
};

/* WRAPPER */

export const loginUserSafe = ({ name, password }) => {
  return loginUser(name, password);
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
  window.dispatchEvent(new Event("authChange"));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

/* WISHLIST */

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