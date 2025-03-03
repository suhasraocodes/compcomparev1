"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isHomePage = pathname === "/";

  // ✅ Load dark mode state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return (
      typeof window !== "undefined" &&
      localStorage.getItem("darkMode") === "true"
    );
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 shadow-lg z-50 
        ${
          isHomePage
            ? "bg-white dark:bg-neutral-900 lg:bg-transparent dark:lg:bg-transparent"
            : "bg-white dark:bg-neutral-900"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div
          className="text-2xl font-bold text-gray-800 dark:text-white cursor-pointer"
          onClick={() => router.push("/")}
        >
          CodeStats
        </div>

        <div className="flex items-center space-x-6">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-yellow-500"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>

          {/* Sign In / Log Out */}
          {user ? (
            <Button
              className="text-white rounded-full py-2 px-4 dark:text-black"
              onClick={() => {
                logout();
                router.push("/signin");
              }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              className="text-white rounded-full py-2 px-4 dark:text-black"
              onClick={() => router.push("/signin")}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
