"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const CodeChefStats = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from CodeChef API
    fetch("https://codechef-api.vercel.app/handle/lucifer886")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">CodeChef Statistics</h1>

      {data ? (
        <>
          {/* Profile Section */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={data.profile}
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
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default CodeChefStats;
