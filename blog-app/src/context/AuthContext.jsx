import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("myBlogUser") || null;
  });
  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem("myBlogUser");
  });

  const login = (name) => {
    setIsLogin(true);
    setUserName(name);
    localStorage.setItem("myBlogUser", name);
  };

  const logout = () => {
    // 1. INSTANT FRONTEND UPDATE (No 'await' here!)
    // Clear React's memory and local storage immediately
    localStorage.removeItem("myBlogUser");
    setUserName(null);
    setIsLogin(false);

    // If you navigate in this function, do it right now:
    // navigate("/home");

    // 2. BACKGROUND BACKEND REQUEST
    // We remove the 'await' so this happens silently in the background
    fetch("http://localhost:3000/api/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .catch((err) => {
        // If it fails, the user is already gone anyway. Just log it.
        console.error("Background logout failed", err);
      });
  };

  return (
    <AuthContext.Provider
      value={{ userName, isLogin, setIsLogin, setUserName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
