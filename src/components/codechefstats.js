"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";

const CodeChefStats = () => {
  const [data, setData] = useState(null);
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

        setData(profileResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">CodeChef Statistics</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : data ? (
        <>
          {/* Profile Section */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={data.profile || 
              "https://cdn.codechef.com/sites/all/themes/abessive/images/user_default_thumb.jpg"}
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{data.name}</h3>
              <p className="text-sm text-gray-500">
                Rating: {data.currentRating} | Highest Rating: {data.highestRating}
              </p>
              <p className="text-sm text-gray-500">
                Stars: {data.stars} | Country: {data.countryName}
              </p>
            </div>
          </div>

          {/* Rating Data Section */}
          <h2 className="text-lg font-semibold mb-4">Rating History</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.ratingData.map((rating, index) => (
              <Card key={index} className="p-4 border border-gray-300 shadow-md">
                <h3 className="text-lg font-semibold">{rating.name}</h3>
                <p className="text-sm">
                  <span className="font-medium">Rating:</span> {rating.rating}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Rank:</span> {rating.rank}
                </p>
                <p className="text-sm">
                  <span className="font-medium">End Date:</span> {rating.end_date}
                </p>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <p>Error fetching data.</p>
      )}
    </div>
  );
};

export default CodeChefStats;
