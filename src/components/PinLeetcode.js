"use client";

import React, { useState, useEffect } from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export function PinLeetcode() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in localStorage");
  
        // Fetch user data to get LeetCode username
        const userResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_USER_API}/${userId}`
        );
        const leetcodeUsername = userResponse.data.leetcodeUsername;
        if (!leetcodeUsername) throw new Error("LeetCode username not found");
  
        // Fetch LeetCode profile data
        const profileResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_LEETCODE_API2}/${leetcodeUsername}`
        );
  
  
        if (profileResponse.status === 200) {
          setProfileData(profileResponse.data);
        }
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, []);
  



  return (
    <div className="h-[40rem] w-full flex items-center justify-center">
            <Link href="/dashboard/leetcode">
      <PinContainer title="LeetCode" href="/dashboard/leetcode">
        <div className="flex flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-20 w-20 bg-gray-300 rounded-full mx-auto"></div>
              <div className="h-4 w-32 bg-gray-300 mt-4 mx-auto"></div>
              <div className="h-3 w-24 bg-gray-300 mt-2 mx-auto"></div>
            </div>
          ) : profileData ? (
            <>
              <div className="flex flex-col items-center">
                <Image
                  src={profileData.avatar || "/default-avatar.png"}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-yellow-500"
                />
                <h3 className="mt-2 font-bold text-lg text-slate-100">
                  {profileData.username}
                </h3>
                <span className="text-sm text-slate-400 ">
                  Rank: {profileData.ranking}
                </span>
                <span className="text-sm text-slate-400">
                  Reputation: {profileData.reputation}
                </span>
              </div>
              <div className="flex flex-1 w-full rounded-xl mt-4 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500" />
            </>
          ) : (
            <p className="text-center text-red-500">Error loading profile</p>
          )}
        </div>
      </PinContainer>
      </Link>
    </div>
  );
}
