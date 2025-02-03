"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.replace("/signin"); // Redirect to sign-in if not logged in
        }
    }, [user, router]);

    if (!user) return null; // Prevents flashing of protected content

    return children;
}
