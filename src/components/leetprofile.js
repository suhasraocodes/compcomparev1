"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import axios from "axios";

export default function Leetprofile() {
  const [profileData, setProfileData] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const getUserId = () =>
    localStorage.getItem("userId") || sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = getUserId();
        if (!userId) throw new Error("User ID not found in localStorage");

        // Get Leetcode username
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userData/${userId}`
        );
        const leetcodeUsername = userResponse.data.leetcodeUsername;
        if (!leetcodeUsername) throw new Error("Leetcode username not found");

        // Fetch avatar
        const avatarResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_LEETCODE_API}/${leetcodeUsername}`
        );
        const avatar = avatarResponse.data.avatar || "";

        // Fetch profile data
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_LEETCODE_API}/${leetcodeUsername}`
        );

        setProfileData(profileResponse.data);
        setAvatarUrl(avatar);
        setLeetcodeUsername(leetcodeUsername);
      } catch (error) {
        console.error("Error fetching Leetcode data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <CardContainer className="flex justify-center">
        <CardBody className="bg-gray-50 dark:bg-neutral-900 border rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg flex flex-col items-center shadow-lg">
          <div className="h-24 w-24 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-6 w-40 mt-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-4 w-60 mt-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        </CardBody>
      </CardContainer>
    );
  }

  return (
    <CardContainer className="flex justify-center w-full">
      <CardBody className="bg-gray-50 dark:bg-neutral-900 border rounded-xl p-6 w-full h-auto flex flex-col items-center shadow-lg transition-all hover:scale-105 transform duration-300 ease-in-out">
        {/* Profile Image */}
        <CardItem translateZ="100" className="mt-4">
          <Image
            src={
              avatarUrl ||
              "/images/leetcode.svg"
            }  
            height={80}
            width={80}
            className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-full border-4 border-gradient-to-br from-green-400 to-blue-500"
            alt="Profile Picture"
          />
        </CardItem>

        {/* Profile Name */}
        <CardItem
          translateZ="50"
          className="text-lg sm:text-xl font-semibold text-neutral-700 dark:text-white mt-4"
        >
          {profileData?.username}
        </CardItem>

        {/* Profile Stats */}
        <CardItem
          translateZ="10"
          className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-base mt-2 text-center w-full"
        >
          <div className="font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-white rounded-xl px-4 sm:px-6 py-2 shadow-lg mb-4 transform transition-transform duration-300 hover:translate-y-[-2px]">
            Rank: {profileData?.ranking}
          </div>
          <div className="font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-white rounded-full px-4 sm:px-6 py-2 shadow-lg mb-4 hover:translate-y-[-2px]">
            Contributions: {profileData?.contributionPoint}
          </div>
          <div className="font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-white rounded-full px-4 sm:px-6 py-2 shadow-lg hover:translate-y-[-2px]">
            Reputation: {profileData?.reputation}
          </div>
        </CardItem>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <CardItem
            translateZ={10}
            as={Link}
            href={`https://leetcode.com/${leetcodeUsername}`}
            target="_blank"
            className="font-medium bg-black text-white dark:bg-white dark:text-black rounded-full px-6 py-2 sm:px-8 sm:py-3 transform transition-transform duration-300 shadow-lg hover:translate-y-[-2px]"
          >
            View Profile
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
