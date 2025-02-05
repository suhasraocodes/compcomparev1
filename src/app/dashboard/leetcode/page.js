"use client";
import React, { useState, useEffect } from "react";
import SidebarComponent from "@/components/Sidebar";
import Barchart from "../../../components/barchart";
import ProtectedRoute from "../../auth/ProtectedRoutes";
import Leetprofile from "@/components/leetprofile";
import LeetCodeStats from "@/components/leetcodestats";

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
        <div className="flex flex-1 mt-[74px] h-[calc(100vh-64px)] overflow-hidden">
          <SidebarComponent open={open} setOpen={setOpen} />
          <Dashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
}
const Dashboard = () => {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-neutral-900 overflow-y-auto">
      {/* Background Gradient Section */}
      <div className="relative  p-10">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  relative z-10">
          {/* Profile Section */}
          <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6">
            <Leetprofile />
          </div>

          {/* Chart Section */}
          <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6">
            <Barchart />
          </div>

          {/* Badge Section */}
          <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6">
            <BadgeCard />
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="-mt-4 ml-10 mr-10 p-10 bg-gray-50 dark:bg-neutral-800  rounded-t-3xl">
        {/* Submission Heatmap Section */}
          <LeetCodeStats />

        
      </div>
    </div>
  );
};

const BadgeCard = () => {
  return (
    <div className="flex flex-col items-center border rounded-xl bg-gray-900 dark:bg-neutral-800 p-4 shadow-lg text-white">
      <div className="text-lg font-semibold mb-2">Badges</div>
      <div className="text-4xl font-bold mb-4">3</div>
      <div className="flex flex-col items-center md:flex-row gap-4">
        {/* Badge Image Section */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
            <img
              src="https://assets.leetcode.com/static_assets/marketing/2024-200-lg.png" // Replace with your badge image URL
              alt="Badge"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm mt-2">Most Recent Badge</div>
        </div>
        
      </div>
      {/* Badge Description */}
      <div className="text-center md:text-left text-xl">
          200 Days Badge 2024
        </div>
    </div>
  );
};

