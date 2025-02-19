"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const LeetCodeStats = () => {
  const [data, setData] = useState(null);
  const [username, setUsername] = useState(""); // State to track LeetCode username
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId"); // Retrieve userId from local storage
        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }

        // Fetch user details to get LeetCode username
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userData/${userId}`
        );
        const userData = await userResponse.json();

        if (userData.leetcodeUsername) {
          setUsername(userData.leetcodeUsername);
        } else {
          console.error("LeetCode username not found in user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!username) return;

    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LEETCODE_API}/userprofile/${username}`);
        const leetData = await response.json();
        setData(leetData);
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, [username]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">LeetCode Statistics</h1>

      {loading ? (
        <p>Loading data...</p>
      ) : data ? (
        <>
          {/* Solved Problems Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-4 border border-gray-300 shadow-md">
              <h3 className="text-lg font-semibold">Total Solved</h3>
              <p className="text-sm">{data.totalSolved || 0} problems</p>
            </Card>
            <Card className="p-4 border border-gray-300 shadow-md">
              <h3 className="text-lg font-semibold">Easy Solved</h3>
              <p className="text-sm">{data.easySolved || 0} problems</p>
            </Card>
            <Card className="p-4 border border-gray-300 shadow-md">
              <h3 className="text-lg font-semibold">Medium Solved</h3>
              <p className="text-sm">{data.mediumSolved || 0} problems</p>
            </Card>
            <Card className="p-4 border border-gray-300 shadow-md">
              <h3 className="text-lg font-semibold">Hard Solved</h3>
              <p className="text-sm">{data.hardSolved || 0} problems</p>
            </Card>
          </div>

          {/* Submission History Section */}
          <h2 className="text-lg font-semibold mt-6 mb-4">Recent Submissions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.recentSubmissions?.map((submission, index) => (
              <Card key={index} className="p-4 border border-gray-300 shadow-md">
                <h3 className="text-lg font-semibold">{submission.title}</h3>
                <p className="text-sm">
                  <span className="font-medium">Status:</span> {submission.statusDisplay}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Language:</span> {submission.lang}
                </p>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default LeetCodeStats;
