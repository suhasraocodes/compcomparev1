"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import withCodeChefProfile from "@/components/withCodeChefProfile";
import axios from "axios";

const CodeChefProfile = ({ profileData, loading }) => {
  const [codechefUsername, setCodechefUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId =
          localStorage.getItem("userId") || sessionStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in localStorage");

        // Fetch user data to get CodeChef username
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userData/${userId}`
        );
        setCodechefUsername(userResponse.data.codechefUsername || "");
      } catch (error) {
        console.error("Error fetching CodeChef username:", error);
      }
    };

    fetchUserData();
  }, []);

  const renderStat = (label, value) =>
    value ? (
      <div className="font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-white rounded-full px-6 py-2 shadow-lg mb-4 hover:translate-y-[-2px]">
        {label}: {value}
      </div>
    ) : null;

    if (loading) {
      return (
        <CardContainer className="flex justify-center">
          <CardBody className="bg-gray-50 dark:bg-neutral-900 border rounded-xl p-4 sm:p-6 w-full sm:w-80 flex flex-col items-center shadow-lg">
            {/* Loading Skeleton */}
            <div className="h-20 w-20 sm:h-24 sm:w-24 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-5 w-32 sm:w-40 mt-3 sm:mt-4 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
            <div className="h-3 w-48 sm:w-60 mt-2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          </CardBody>
        </CardContainer>
      );
    }
  
    return (
      <CardContainer className="flex -mt-16 sm:-mt-20 justify-center">
        <CardBody className="bg-gray-50 dark:bg-neutral-900 border rounded-xl p-4 sm:p-6 w-full sm:w-80 md:w-[28rem] h-auto flex flex-col items-center shadow-lg transition-all hover:scale-105 transform duration-300 ease-in-out">
          {/* Profile Image */}
          {profileData?.profile && (
            <CardItem translateZ="100" className="mt-3 sm:mt-4">
              <Image
                src={profileData.profile || "/images/codechef.svg"}
                height={80}
                width={80}
                className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-full border-4 border-gradient-to-br from-green-400 to-blue-500"
                alt="Profile Picture"
              />
            </CardItem>
          )}
  
          {/* Profile Name */}
          {profileData?.name && (
            <CardItem
              translateZ="50"
              className="text-lg sm:text-xl font-semibold text-neutral-700 dark:text-white mt-3 sm:mt-4"
            >
              {profileData.name}
            </CardItem>
          )}
  
          {/* Profile Stats */}
          <CardItem
            translateZ="10"
            className="text-neutral-600 dark:text-neutral-300 text-xs sm:text-sm mt-2 text-center w-full"
          >
            {renderStat("Current Rating", profileData?.currentRating)}
            {renderStat("Highest Rating", profileData?.highestRating)}
            {renderStat("Global Rank", profileData?.globalRank)}
            {renderStat("Country Rank", profileData?.countryRank)}
            {renderStat("Stars", profileData?.stars)}
          </CardItem>
  
          {/* Buttons */}
          {profileData?.name && codechefUsername && (
            <div className="flex gap-3 sm:gap-4 mt-5 sm:mt-6">
              <CardItem
                translateZ={10}
                as={Link}
                href={`https://www.codechef.com/users/${codechefUsername}`}
                target="_blank"
                className="font-medium bg-black text-white dark:bg-white dark:text-black rounded-full px-4 py-2 sm:px-6 sm:py-2.5 shadow-lg hover:translate-y-[-2px]"
              >
                View Profile
              </CardItem>
            </div>
          )}
        </CardBody>
      </CardContainer>
  );
};

export default withCodeChefProfile(CodeChefProfile);
