import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [employee, setEmployee] = useState(() => {
    const saved = localStorage.getItem("employee");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (loginData) => {
    setToken(loginData.token);
    setEmployee(loginData.employee);
    localStorage.setItem("token", loginData.token);
    localStorage.setItem("employee", JSON.stringify(loginData.employee));
  };

  const logout = () => {
    setToken("");
    setEmployee(null);
    localStorage.removeItem("token");
    localStorage.removeItem("employee");
  };

  const value = useMemo(
    () => ({
      token,
      employee,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, employee]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
