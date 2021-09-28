import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CLIENT_SERVER_URL } from "../config";

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

    const login = async ({ email, password }) => {
        try {
            const options = {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password })
            };
            const response = await fetch(`${CLIENT_SERVER_URL}/api/login`, options);
            const data = await response.json();
            console.log(data);
            if(response.ok) {
                setUser(data?.user);
            } else {
                setError(data?.message);
                setError(null);
            }
        } catch (e) {
            console.log(e.message);
        }
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
