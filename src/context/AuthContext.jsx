import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /**
   * Mock login rules (simple + works for this assignment):
   * - Any non-admin username/password logs in as role "regular"
   * - Admin login: username "admin" and password "password"
   */
  function login(username, password) {
    const u = username?.trim();
    const p = password?.trim();

    if (!u || !p) {
      return { ok: false, message: "Please enter both username and password." };
    }

    if (u === "admin") {
      if (p !== "password") {
        return { ok: false, message: "Invalid admin credentials." };
      }
      setUser({ username: "admin", role: "admin" });
      return { ok: true };
    }

    setUser({ username: u, role: "regular" });
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  function isAuthenticated() {
    return !!user;
  }

  function isAdmin() {
    return user?.role === "admin";
  }

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated, isAdmin }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}