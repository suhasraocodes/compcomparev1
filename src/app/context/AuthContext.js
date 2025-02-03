"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        console.log("AuthContext useEffect running...");

        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");

        if (token && userId) {
            console.log("Token found:", token);

            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);

                if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
                    console.warn("Token expired, logging out...");
                    logout();
                } else {
                    console.log("Token is valid, setting user...");
                    setUser({ token, id: userId });

                    // ✅ Prevent unnecessary redirects if user is already logged in
                    if (router.pathname === "/signin") {
                        console.log("Redirecting to dashboard...");
                        router.push("/dashboard");
                    }
                }
            } catch (error) {
                console.error("Invalid token, logging out...");
                logout();
            }
        } else {
            console.warn("No token found, user not logged in.");
        }

        setLoading(false);
    }, []);

    const login = (token, userId, rememberMe) => {
        console.log("Logging in with token:", token);

        if (rememberMe) {
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
        } else {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userId", userId);
        }

        setUser({ token, id: userId });
        router.push("/dashboard");
    };

    const logout = () => {
        console.log("Logging out...");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        setUser(null);
        router.push("/signin");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children} {/* ✅ Prevents rendering while checking authentication */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
