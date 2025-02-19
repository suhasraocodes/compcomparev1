"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";
export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Get dark mode preference from localStorage when the page loads
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    } else if (savedDarkMode === "false") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode to the document when the state changes
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Persist dark mode state to localStorage
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="relative w-full">
      {/* Aurora Background with removed top 20px */}
      <div className="overflow-hidden mt-[-20px]">
        <AuroraBackground>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="relative flex flex-col gap-6 items-center justify-center px-6 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold dark:text-white">
              Track Your Competitive Coding Journey
            </h1>
            <p className="text-lg md:text-2xl font-light dark:text-neutral-300">
              View your CodeChef and LeetCode stats in one place.
            </p>
            <Button
              className="bg-black dark:bg-white rounded-full text-white dark:text-black px-6 py-6 text-lg font-medium"
              onClick={() => router.push("/dashboard")}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Animated Stats Section */}
          {/* Animated Stats Section */}
          <div className="flex flex-wrap justify-center gap-10 mt-16">
            {[
              {
                title: "CodeChef & LeetCode",
                subtitle: "Platforms Integrated",
              },
              { title: "Track in Real Time", subtitle: "Your Coding Progress" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0.0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3 + index * 0.2,
                  duration: 0.6,
                  ease: "easeInOut",
                }}
                className="bg-white dark:bg-black p-6 rounded-lg shadow-lg text-center"
              >
                <h2 className="text-3xl font-bold dark:text-white">
                  {stat.title}
                </h2>
                <p className="text-lg font-light dark:text-neutral-300">
                  {stat.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          <footer className="absolute bottom-5 w-full text-center text-sm dark:text-neutral-400">
            {/* GitHub Support Section */}
            <div className="mb-4 flex justify-center items-center gap-2">
              <span className="text-base dark:text-neutral-300">
                Support us on
              </span>
              <a
                href="https://github.com/suhasraocodes/compcomparev1" // Replace with your GitHub
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition"
              >
                <Github size={20} />
                <span className="font-medium">GitHub</span>
              </a>
            </div>
            {/* Footer Text */}© {new Date().getFullYear()} CodeStats | Built
            with ❤️ by Chethan886 & suhasraocodes
          </footer>
        </AuroraBackground>
      </div>
    </div>
  );
}
