"use client";

import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";  // Ensure you have the right icons
import { Button } from "@/components/ui/button";  // Assuming the Button component is pre-defined
import { useRouter} from "next/navigation";
export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent dark:bg-transparent shadow-lg z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800 dark:text-white">CodeStats</div>
        <div className="flex items-center space-x-6">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-yellow-500"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>

          {/* Sign In Button */}
          <Button className=" text-white rounded-full py-2 px-4 dark:text-black" onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}
