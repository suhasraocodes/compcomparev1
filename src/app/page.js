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

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setDarkMode(true);
    } else if (savedDarkMode === "false") {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      <div className="overflow-hidden w-full">
        <AuroraBackground>
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="relative flex flex-col gap-6 items-center justify-center px-6 text-center pt-20 md:pt-32"
          >
            <h1 className="text-3xl md:text-6xl font-bold dark:text-white">
              Track Your Competitive Coding Journey
            </h1>
            <p className="text-lg md:text-2xl font-light dark:text-neutral-300">
              View your CodeChef and LeetCode stats in one place.
            </p>
            <Button
              className="bg-black dark:bg-white rounded-full text-white dark:text-black px-6 py-4 md:py-6 text-lg font-medium"
              onClick={() => router.push("/dashboard")}
            >
              Get Started
            </Button>
          </motion.div>

          {/* Animated Stats Section */}
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-10 mt-12 md:mt-16 w-full px-4">
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
                className="bg-white dark:bg-black p-6 rounded-lg shadow-lg text-center w-full md:w-[300px] h-[180px] flex flex-col justify-center items-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold dark:text-white">
                  {stat.title}
                </h2>
                <p className="text-lg font-light dark:text-neutral-300">
                  {stat.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <footer className="w-full text-center text-sm dark:text-neutral-400 mt-16 md:mt-24 pb-10">
            <div className="mb-4 flex justify-center items-center gap-2">
              <span className="text-base dark:text-neutral-300">
                Support us on
              </span>
              <a
                href="https://github.com/suhasraocodes/compcomparev1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition"
              >
                <Github size={20} />
                <span className="font-medium">GitHub</span>
              </a>
            </div>
            © {new Date().getFullYear()} CodeStats | Built with ❤️ by Chethan886
            & suhasraocodes
          </footer>
        </AuroraBackground>
      </div>
    </div>
  );
}
