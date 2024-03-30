import React from "react";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken_] = useState(localStorage.getItem("refreshToken"));

  // Function to set the authentication token
  const setToken = (newToken, newRefreshToken) => {
    setToken_(newToken);
    setRefreshToken_(newRefreshToken);
  };

  useEffect(() => {
    if (token && refreshToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
      localStorage.setItem('refreshToken',refreshToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    }
  }, [token, refreshToken]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const refreshAuthToken = async (refreshToken) => {
  try {
    const response = await axios.post('http://localhost:8000/api/token/refresh', {
      refreshToken: refreshToken
    });
    return response.data.accessToken; // New JWT 
  } catch (error) {
    console.error('Erreur lors du rafraîchissement du token :', error);
    throw error;
  }
};

export default AuthProvider;