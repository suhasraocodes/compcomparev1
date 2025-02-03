"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Barchart from "../../components/barchart";
import ProtectedRoute from "../auth/ProtectedRoutes";

export default function SidebarDemo() {
  const links = [
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    { 
      label: "CodeChef", 
      href: "#", 
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> 
    },
    { 
      label: "HackerRank", 
      href: "#", 
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> 
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null); // Track selected link
  const [darkMode, setDarkMode] = useState(false); // Track dark mode state

  // Load Dark Mode from Local Storage on Mount
  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleLinkClick = (index) => {
    setSelectedLink(index);
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen w-full">
        {/* Sidebar starts below Navbar */}
        <div className="flex flex-1 mt-[74px] h-[calc(100vh-64px)] overflow-hidden">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10">
              <div className="flex flex-col flex-1 overflow-y-clip">
                <div className="mt-1 flex flex-col gap-2">
                  {links.map((link, idx) => (
                    <SidebarLink
                      key={idx}
                      link={link}
                      onClick={() => handleLinkClick(idx)} // Set the selected link on click
                      className={cn(
                        "flex items-center p-3 rounded-s-full transition-colors w-full",
                        selectedLink === idx
                          ? "bg-neutral-500 text-white" // Highlight when selected
                          : "hover:bg-gray-200 dark:hover:bg-neutral-500" // Hover effect
                      )}
                    />
                  ))}
                </div>
              </div>
              <div>
                <SidebarLink
                  link={{
                    label: "Manu Arora",
                    href: "#",
                    icon: (
                      <Image
                        src="https://assets.aceternity.com/manu.png"
                        className="h-7 w-7 flex-shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>

          {/* Dashboard Content */}
          <Dashboard />
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Dummy Dashboard Component
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
