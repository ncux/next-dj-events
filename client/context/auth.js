import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CLIENT_SERVER_URL } from "../config";

export const AuthContext = createContext();

export const AuthState = ({ children }) => {

    const router = useRouter();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const register = async ({ username, email, password }) => {
        try {
            const options = {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, username, password })
            };
            const response = await fetch(`${CLIENT_SERVER_URL}/api/register`, options);
            const data = await response.json();
            console.log(data);
            if(response.ok) {
                await setUser(data?.user);
                await router.push(`/account/dashboard`);
            } else {
                setError(data?.message);
                setError(null);
            }
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
                await setUser(data?.user);
                await router.push(`/account/dashboard`);
            } else {
                setError(data?.message);
                setError(null);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const checkIsLoggedIn = async () => {
        try {
            const response = await fetch(`${CLIENT_SERVER_URL}/api/user`);
            const data = await response.json();
            console.log(data);
            if(response.ok) {
                await setUser(data?.user);
                await router.push(`/account/dashboard`);
            } else {
                setError(data?.message);
                setError(null);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const logout = async () => {
        try {
            const options = { method: 'POST' };
            const response = await fetch(`${CLIENT_SERVER_URL}/api/logout`, options);
            if(response.ok) {
                await setUser(null);
                await router.push(`/`);
            } else {
                setError(null);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => checkIsLoggedIn(), []);

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
