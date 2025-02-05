"use client";
import React, { useState, useEffect } from "react";
import SidebarComponent from "@/components/Sidebar";
import Barchart from "../../../components/barchart";
import ProtectedRoute from "../../auth/ProtectedRoutes";
import Codechefprofile from "../../../components/codechefprofile" 
import CodechefStats from "@/components/codechefstats";

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
        <div className="relative p-10">
          {/* Top Row */}
          <div className="grid grid-cols-1 gap-6 relative z-10">
            {/* Profile Section */}
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6">
              <Codechefprofile />
            </div>
  
            {/* Heatmap and Graph Section */}
            <div className="flex gap-6">
              {/* Heatmap Section */}
              <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6 flex-1">
                <div className="flex justify-center items-center ml-20 mt-20 h-full">
                  <iframe
                    src="https://codechef-api.vercel.app/heatmap/one_deepak"
                    className="w-full"
                    style={{ height: '400px', border: 'none' }}
                    title="CodeChef Heatmap"
                  ></iframe>
                </div>
              </div>
  
              {/* Rating Graph Section */}
              <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6 flex-1">
                <div className="flex justify-center items-center ml-12 mt-10 h-full">
                  <iframe
                    src="https://codechef-api.vercel.app/rating/one_deepak"
                    className="w-full"
                    style={{ height: '600px', border: 'none' }}
                    title="CodeChef Rating"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Lower Section */}
        <div className="-mt-4 ml-10 mr-10 p-10 bg-gray-50 dark:bg-neutral-800 rounded-t-3xl">
          {/* Submission Heatmap Section */}
          <CodechefStats/>
        </div>
      </div>
    );
  };
  


