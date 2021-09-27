import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL, httpHeaders } from "../config";

export const AuthContext = createContext();

export const AuthState = ({ children }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const register = async ({ username, email, password }) => {
        try {
            console.log(username, email, password);
        } catch (e) {
            console.log(e.message);
        }
    };

    const login = async ({ email, password }) => {  // send email as "identifier"
        console.log(email, password);
    };

    const checkIsLoggedIn = async () => {
        console.log('checking');
    };

    const logout = async () => {
        console.log('logout');
    };

    return (
        <AuthContext.Provider value={{
            user,
            error,
            register,
            login,
            logout,
            checkIsLoggedIn
        }}>
            { children }
        </AuthContext.Provider>
    );
};
