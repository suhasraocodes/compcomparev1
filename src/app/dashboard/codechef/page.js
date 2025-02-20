"use client";
import React, { useState, useEffect } from "react";
import SidebarComponent from "@/components/Sidebar";
import ProtectedRoute from "../../auth/ProtectedRoutes";
import Codechefprofile from "../../../components/codechefprofile";
import CodechefStats from "@/components/codechefstats";

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log("Checking localStorage for darkMode...");
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    console.log("Dark Mode from localStorage:", storedDarkMode);

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
  const [codechefUsername, setCodechefUsername] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId =  localStorage.getItem("userId") || sessionStorage.getItem("userId");

        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }

        const userApiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userData/${userId}`;

        const response = await fetch(userApiUrl);

        const text = await response.text();

        const data = JSON.parse(text);

        if (data.codechefUsername) {
          setCodechefUsername(data.codechefUsername);
        } else {
          console.error("Codechef username not found in API response");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex-1 bg-gray-100 dark:bg-neutral-900 overflow-y-auto">
      {/* Background Gradient Section */}
      <div className="relative p-4 md:p-10">
        {/* Top Row */}
        <div className="grid grid-cols-1 gap-6 -top-6 relative z-10">
          {/* Profile Section */}
          <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6">
            <Codechefprofile />
          </div>
  
          {/* Heatmap and Graph Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Heatmap Section */}
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6 flex-1">
              <div className="flex justify-center items-center mt-10 md:mt-20 h-full">
                {codechefUsername ? (
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_CODECHEF_API}/heatmap/${codechefUsername}`}
                    className="w-full h-64 md:h-96"
                    style={{ border: "none" }}
                    title="CodeChef Heatmap"
                  ></iframe>
                ) : (
                  <p className="mt-[-50px] md:mt-[-150px]">Loading Heatmap...</p>
                )}
              </div>
            </div>
  
            {/* Rating Graph Section */}
            <div className="bg-white dark:bg-neutral-800 shadow-lg rounded-xl p-6 flex-1">
              <div className="flex justify-center items-center mt-10 md:mt-20 h-full">
                {codechefUsername ? (
                  <iframe
                    src={`${process.env.NEXT_PUBLIC_CODECHEF_API}/rating/${codechefUsername}`}
                    className="w-full h-80 md:h-[600px]"
                    style={{ border: "none" }}
                    title="CodeChef Rating"
                  ></iframe>
                ) : (
                  <p className="mt-[-30px] md:mt-[-60px]">Loading Rating Graph...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Lower Section */}
      <div className="-mt-4 mx-4 md:mx-10 p-6 md:p-10 bg-gray-50 dark:bg-neutral-800 rounded-t-3xl">
        {/* Submission Heatmap Section */}
        {codechefUsername ? <CodechefStats username={codechefUsername} /> : <p>Loading CodeChef Stats...</p>}
      </div>
    </div>
  );
  
};
