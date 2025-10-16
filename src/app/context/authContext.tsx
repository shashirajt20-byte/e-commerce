//@ts-nocheck
'use client'
import { useEffect, useState } from "react";
import { createContext } from "react";
import { getCookie, removeCookie } from "../utils/cookieHelper";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser({
                    id: decoded.id || decoded._id || decoded.userId,
                    email: decoded.email,
                    name: decoded.name,
                    token: token,
                });
            } catch (error) {
                console.error("Invalid token : ", error);
                removeCookie("token");
            }
        }
    }, [])
    const logout = () => {
        removeCookie("token");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{
            user, setUser, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}