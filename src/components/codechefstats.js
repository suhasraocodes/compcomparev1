"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import withCodeChefProfile from "@/components/withCodeChefProfile";

const CodeChefStats = ({ profileData, loading }) => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">CodeChef Statistics</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : profileData ? (
        <>
          {/* Profile Section */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={
                profileData.profile ||
                "https://cdn.codechef.com/sites/all/themes/abessive/images/user_default_thumb.jpg"
              }
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{profileData.name}</h3>
              <p className="text-sm text-gray-500">
                Rating: {profileData.currentRating} | Highest Rating: {profileData.highestRating}
              </p>
              <p className="text-sm text-gray-500">
                Stars: {profileData.stars} | Country: {profileData.countryName}
              </p>
            </div>
          </div>

          {/* Rating Data Section */}
          <h2 className="text-lg font-semibold mb-4">Rating History</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profileData.ratingData.map((rating, index) => (
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

export default withCodeChefProfile(CodeChefStats);
