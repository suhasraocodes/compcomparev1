"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
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
          View your CodeChef, LeetCode, CodeForces, and AtCoder stats in one place.
        </p>
        <Button className="bg-black dark:bg-white rounded-full text-white dark:text-black px-6 py-3 text-lg font-medium">
          Get Started
        </Button>
      </motion.div>

      {/* Animated Stats Section */}
      <div className="flex flex-wrap justify-center gap-10 mt-16">
        {[
          { title: "1000+", subtitle: "Users" },
          { title: "50K+", subtitle: "Problems Solved" },
          { title: "4+", subtitle: "Platforms Integrated" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6, ease: "easeInOut" }}
            className="bg-white dark:bg-black p-6 rounded-lg shadow-lg text-center"
          >
            <h2 className="text-3xl font-bold dark:text-white">{stat.title}</h2>
            <p className="text-lg font-light dark:text-neutral-300">{stat.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* Carousel Section */}
      <div className="mt-16 max-w-2xl mx-auto">
        <Carousel>
          <CarouselContent>
            {["CodeChef", "LeetCode", "CodeForces", "AtCoder"].map((platform, index) => (
              <CarouselItem key={index} className="p-4 text-center">
                <motion.div
                  initial={{ opacity: 0.0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-2xl font-semibold dark:text-white">{platform}</h3>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-5 w-full text-center text-sm dark:text-neutral-400">
        © {new Date().getFullYear()} CodeStats | Built with ❤️ by Developers
      </footer>
    </AuroraBackground>
  );
}
