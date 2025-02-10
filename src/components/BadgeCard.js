"use client";
import React, { useEffect, useState } from "react";

const BadgeCard = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        // Get userId from local storage
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in local storage");

        // Fetch user data using userId to get leetcodeUsername
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_USER_API}/${userId}`
        );
        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        const userData = await userResponse.json();
        const leetcodeUsername = userData.leetcodeUsername;

        if (!leetcodeUsername)
          throw new Error("Leetcode username not found in user data");

        // Fetch badges using leetcodeUsername
        const badgesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_LEETCODE_API2}/${leetcodeUsername}/badges`
        );
        if (!badgesResponse.ok) throw new Error("Failed to fetch badges");
        const badgeData = await badgesResponse.json();

        // Filter valid badges (only with proper image links)
        const validBadges = badgeData.badges.filter(
          (badge) => badge.icon && badge.icon.startsWith("http")
        );

        setBadges(validBadges);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center border rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-lg text-black dark:text-white">
      <div className="text-lg font-semibold mb-4">LeetCode Badges</div>

      {loading ? (
        <p className="text-sm text-gray-400">Fetching your achievements...</p>
      ) : error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : badges.length > 0 ? (
        <div
          className={`w-full ${
            badges.length === 1
              ? "flex justify-center"
              : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          }`}
        >
          {badges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center text-center">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-700">
                <img
                  src={badge.icon}
                  alt={badge.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm mt-2 font-medium">{badge.displayName}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Earned on: {new Date(badge.creationDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-400">
          You haven&apos;t earned any badges yet. Keep coding and unlock your first badge!
        </p>
      )}
    </div>
  );
};

export default BadgeCard;
