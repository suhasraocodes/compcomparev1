"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import axios from "axios";

export default function Leetprofile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in localStorage");

        // Fetch user data to get CodeChef username
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_USER_API}/${userId}`
        );
        const codechefUsername = userResponse.data.codechefUsername;
        if (!codechefUsername) throw new Error("CodeChef username not found");

        // Fetch CodeChef profile data
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_CODECHEF_API}/handle/${codechefUsername}`
        );

        if (profileResponse.status === 200) {
          setProfileData(profileResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <CardContainer className="flex justify-center">
        <CardBody className="bg-gray-50 dark:bg-neutral-900 border rounded-xl p-6 w-80 flex flex-col items-center shadow-lg">
          {/* Loading Skeleton */}
          <div className="h-24 w-24 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-6 w-40 mt-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-4 w-60 mt-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        </CardBody>
      </CardContainer>
    );
  }

  const renderStat = (label, value) =>
    value ? (
      <div className="font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-white rounded-full px-6 py-2 shadow-lg mb-4 hover:translate-y-[-2px]">
        {label}: {value}
      </div>
    ) : null;

  return (
    <CardContainer className="flex -mt-20 justify-center">
      <CardBody className="bg-gray-50 dark:bg-neutral-900 border rounded-xl p-6 w-[28rem] h-auto flex flex-col items-center shadow-lg transition-all hover:scale-105 transform duration-300 ease-in-out">
        {/* Profile Image */}
        {profileData?.profile && (
          <CardItem translateZ="100" className="mt-4">
            <Image
              src={
                profileData.profile ||
                "https://cdn.codechef.com/sites/all/themes/abessive/images/user_default_thumb.jpg"
              }
              height={80}
              width={80}
              className="h-24 w-24 object-cover rounded-full border-4 border-gradient-to-br from-green-400 to-blue-500"
              alt="Profile Picture"
            />
          </CardItem>
        )}

        {/* Profile Name */}
        {profileData?.name && (
          <CardItem
            translateZ="50"
            className="text-xl font-semibold text-neutral-700 dark:text-white mt-4"
          >
            {profileData.name}
          </CardItem>
        )}

        {/* Profile Stats */}
        <CardItem
          translateZ="10"
          className="text-neutral-600 dark:text-neutral-300 text-sm mt-2 text-center w-full"
        >
          {renderStat("Current Rating", profileData?.currentRating)}
          {renderStat("Highest Rating", profileData?.highestRating)}
          {renderStat("Global Rank", profileData?.globalRank)}
          {renderStat("Country Rank", profileData?.countryRank)}
          {renderStat("Stars", profileData?.stars)}
        </CardItem>

        {/* Buttons */}
        {profileData?.name && (
          <div className="flex gap-4 mt-6">
            <CardItem
              translateZ={10}
              as={Link}
              href={`https://www.codechef.com/users/${profileData.name}`}
              target="_blank"
              className="font-medium bg-black text-white dark:bg-white dark:text-black rounded-full px-6 py-2 shadow-lg hover:translate-y-[-2px]"
            >
              View Profile
            </CardItem>
          </div>
        )}
      </CardBody>
    </CardContainer>
  );
}
