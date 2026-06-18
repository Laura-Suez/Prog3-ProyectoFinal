import { useState } from "react";
import { AuthenticationContext } from "./auth.context";
import { decodeToken } from "../../Utils/auth";

const tokenValue = "authToken";
const storedToken = localStorage.getItem(tokenValue);
// Asegurarse de que storedToken sea null si está vacío o inválido
const validToken = storedToken && storedToken.trim() ? storedToken : null;
const initialUser = validToken ? decodeToken(validToken) : null;

export const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(validToken);
  const [user, setUser] = useState(initialUser);
  const isAuthenticated = !!user;

  const handleUserLogin = (token) => {
    localStorage.setItem(tokenValue, token);
    setToken(token);
    setUser(decodeToken(token));
  };

  const handleUserLogout = () => {
    localStorage.removeItem(tokenValue);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthenticationContext
      value={{
        token,
        user,
        handleUserLogin,
        handleUserLogout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthenticationContext>
  );
};
