import { useState } from "react";
import { AuthenticationContext } from "./auth.context";
import { decodeToken } from "../../Utils/auth";


const tokenValue = "authToken";
const storedToken = localStorage.getItem(tokenValue);
const initialUser = storedToken ? decodeToken(storedToken) : null;


export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(storedToken);
    const [user, setUser] = useState(initialUser);
    const isAuthenticated = (token) ? true : false; 

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
    <AuthenticationContext value={{ token, user, handleUserLogin, handleUserLogout, isAuthenticated}}>
        {children}
    </AuthenticationContext>
    );
};
    

