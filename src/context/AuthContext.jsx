import { createContext, useContext, useEffect, useState } from "react";
import { userAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      // Register user in backend
      const backendUser = await userAPI.register({
        firstName: userData.name.split(" ")[0],
        lastName: userData.name.split(" ").slice(1).join(" ") || "",
        email: userData.email,
        password: userData.password,
        phoneNumber: userData.phone || "",
        address: userData.address || ""
      });

      // Do NOT auto-login the user after registration.
      // Return the backend response to the caller so they can show a success message
      // and redirect the user to the login page explicitly.
      return backendUser;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    // Call backend login endpoint
    const user = await userAPI.login(email, password);
    const loginUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phoneNumber,
      address: user.address
    };
    localStorage.setItem("user", JSON.stringify(loginUser));
    setUser(loginUser);
    return loginUser;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
