"use client";
import React, { useState, useEffect } from "react";
import SidebarComponent from "@/components/Sidebar";
import Barchart from "../../components/barchart";
import ProtectedRoute from "../auth/ProtectedRoutes";

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
    <div className="flex-1 p-4 md:p-10 bg-white dark:bg-neutral-900">
      <div className="grid grid-cols-2 ml-auto md:grid-cols-2 gap-4">
        <Barchart />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {[...new Array(2)].map((_, i) => (
          <div key={i} className="h-40 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 animate-pulse" />
        ))}
      </div>
    </div>
  );
};