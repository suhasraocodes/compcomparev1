"use client";
import React, { useState, useEffect } from "react";
import SidebarComponent from "@/components/Sidebar";
import ProtectedRoute from "../auth/ProtectedRoutes";
import Image from "next/image";
import PinCodechef from "@/components/PinCodechef";
import {PinLeetcode} from "@/components/PinLeetcode";
import { motion } from "framer-motion";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen w-full">
      <div className="flex flex-1 flex-col sm:flex-row mt-16 sm:mt-[74px] h-auto sm:h-[calc(100vh-64px)] overflow-hidden">        
          <SidebarComponent open={open} setOpen={setOpen} />
          <Dashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
}


const Dashboard = () => {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-neutral-900 overflow-y-auto min-h-screen p-4">
      {/* Background Gradient Section */}
      <div className="relative -top-2 sm:-top-6 p-4 sm:p-6 md:p-10 h-full">
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* CodeChef Profile Section */}
          <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-center w-full">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="relative flex flex-col gap-4 items-center justify-center text-center"
            >
              <Image
                src="/images/codechef.svg"
                alt="Codechef Logo"
                width={80}
                height={80}
                className="mb-2 sm:mb-4 bg-white p-2 rounded-xl transform transition-transform hover:translate-y-[-3px]"
              />
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold dark:text-white">
                Codechef
              </h1>
            </motion.div>
            <PinCodechef />
          </div>

          {/* LeetCode Profile Section */}
          <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-4 sm:p-6 flex flex-col items-center w-full">
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="relative flex flex-col gap-4 items-center justify-center text-center"
            >
              <Image
                src="/images/leetcode.svg"
                alt="LeetCode Logo"
                width={80}
                height={80}
                className="mb-2 sm:mb-4 bg-white p-2 rounded-xl transform transition-transform hover:translate-y-[-3px]"
              />
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold dark:text-white">
                Leetcode
              </h1>
            </motion.div>
            <PinLeetcode />
          </div>
        </div>
      </div>
    </div>
  );
};


const AnimatedTitle = ({ text }) => {
  return (
    <div className="flex space-x-1 text-xl font-bold mt-2">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="transition-colors duration-300 hover:text-indigo-500 dark:hover:text-yellow-400"
        >
          {char}
        </span>
      ))}
    </div>
  );
};