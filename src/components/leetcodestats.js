"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const LeetCodeStats = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from LeetCode API
    fetch("https://leetcode-api-faisalshohag.vercel.app/chethanb886") // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">LeetCode Statistics</h1>

      {data ? (
        <>
          {/* Profile Section */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={data.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{data.name}</h3>
              <p className="text-sm text-gray-500">Ranking: {data.ranking}</p>
              <p className="text-sm text-gray-500">Contribution Points: {data.contributionPoint}</p>
            </div>
          </div>

          {/* Solved Problems Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-4 border border-gray-300 shadow-md">
              <h3 className="text-lg font-semibold">Total Solved</h3>
              <p className="text-sm">{data.totalSolved} problems</p>
            </Card>
            <Card className="p-4 border border-gray-300 shadow-md">
              <h3 className="text-lg font-semibold">Easy Solved</h3>
              <p className="text-sm">{data.easySolved} problems</p>
            </Card>
            <Card className="p-4 border border-gray-300 shadow-md">
              <h3 className="text-lg font-semibold">Medium Solved</h3>
              <p className="text-sm">{data.mediumSolved} problems</p>
            </Card>
            <Card className="p-4 border border-gray-300 shadow-md">
              <h3 className="text-lg font-semibold">Hard Solved</h3>
              <p className="text-sm">{data.hardSolved} problems</p>
            </Card>
          </div>

          {/* Submission History Section */}
          <h2 className="text-lg font-semibold mb-4">Recent Submissions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.recentSubmissions.map((submission, index) => (
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
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default LeetCodeStats;
