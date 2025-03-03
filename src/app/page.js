"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Github, X, Video, Camera, Maximize, Minimize } from "lucide-react";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const iframeContainerRef = useRef(null);
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

  const handleShowIframe = async () => {
    setShowIframe(true);
    
    // We'll set this to true for the UI to update, but actual permission
    // will be handled by the iframe content
    setCameraPermissionGranted(true);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (iframeContainerRef.current.requestFullscreen) {
        iframeContainerRef.current.requestFullscreen();
      } else if (iframeContainerRef.current.webkitRequestFullscreen) {
        iframeContainerRef.current.webkitRequestFullscreen();
      } else if (iframeContainerRef.current.msRequestFullscreen) {
        iframeContainerRef.current.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      {/* Responsive iframe - Only shown when button is clicked */}
      {showIframe && (
        <>
          {/* Mobile version - full screen */}
          <div className="fixed inset-0 z-50 md:hidden">
            {!cameraPermissionGranted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-10 p-6 text-center">
                <Camera size={48} className="text-white mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Camera Access Required</h3>
                <p className="text-white mb-4">This demo needs access to your camera to work properly.</p>
                <p className="text-white text-sm mb-6">Please allow camera access when prompted by your browser.</p>
              </div>
            )}
            <div ref={iframeContainerRef} className="w-full h-full">
              <iframe 
                ref={iframeRef}
                src="https://test.vedeeo.com" 
                className="w-full h-full border-0"
                title="Vedeeo"
                allow="camera; microphone; fullscreen"
              />
            </div>
            <button 
              onClick={() => setShowIframe(false)}
              className="absolute top-4 right-4 z-20 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X size={24} className="dark:text-white" />
            </button>
          </div>
          
          {/* Desktop version - floating div with significantly increased height */}
          <div className="fixed bottom-4 right-4 z-50 hidden md:block w-96 h-144 rounded-lg shadow-xl overflow-hidden">
            <div ref={iframeContainerRef} className="relative w-full h-full">
              {!cameraPermissionGranted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-10 p-4 text-center">
                  <Camera size={32} className="text-white mb-2" />
                  <h3 className="text-lg font-bold text-white mb-1">Camera Access Required</h3>
                  <p className="text-white text-sm mb-2">This demo needs access to your camera.</p>
                  <p className="text-white text-xs mb-3">Please allow camera access when prompted.</p>
                </div>
              )}
              <div className="absolute top-2 right-2 z-20 flex gap-2">
                <button 
                  onClick={toggleFullscreen}
                  className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize size={20} className="dark:text-white" />
                  ) : (
                    <Maximize size={20} className="dark:text-white" />
                  )}
                </button>
                <button 
                  onClick={() => setShowIframe(false)}
                  className="bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X size={20} className="dark:text-white" />
                </button>
              </div>
              <iframe 
                ref={iframeRef}
                src="https://test.vedeeo.com" 
                className="w-full h-full border-0"
                title="Vedeeo"
                allow="camera; microphone; fullscreen"
              />
            </div>
          </div>
        </>
      )}

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
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-black dark:bg-white rounded-full text-white dark:text-black px-6 py-4 md:py-6 text-lg font-medium"
                onClick={() => router.push("/dashboard")}
              >
                Get Started
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 rounded-full text-white px-6 py-4 md:py-6 text-lg font-medium flex items-center gap-2"
                onClick={handleShowIframe}
              >
                <Video size={20} />
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <Camera size={16} /> Demo requires camera access
            </p>
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

      {/* Floating button to show iframe (only visible on desktop when iframe is hidden) */}
      {!showIframe && (
        <button
          onClick={handleShowIframe}
          className="fixed bottom-4 right-4 z-50 hidden md:flex bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-lg transition-colors items-center gap-2"
        >
          <Video size={20} />
          <span>Watch Demo</span>
        </button>
      )}
    </div>
  );
}