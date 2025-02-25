"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function Component() {
  const [chartData, setChartData] = useState([]);
  const [statistics, setStatistics] = useState({
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalEasy: 0,
    totalMedium: 0,
    totalHard: 0,
  });
  const [activeIndex, setActiveIndex] = useState(null);

  // Fetch data from the API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get userId from local storage
        const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");

        if (!userId) {
          console.error("User ID not found in local storage");
          return;
        }

        // Step 2: Fetch LeetCode username using userId
        const userResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userData/${userId}`
        );
        const userData = await userResponse.json();

        if (!userData.leetcodeUsername) {
          console.error("LeetCode username not found in user data");
          return;
        }

        // Step 3: Fetch LeetCode data using the LeetCode username
        const leetcodeResponse = await fetch(
          `${process.env.NEXT_PUBLIC_LEETCODE_API}/userprofile/${userData.leetcodeUsername}`
        );
        const leetcodeData = await leetcodeResponse.json();

        const {
          easySolved,
          mediumSolved,
          hardSolved,
          totalEasy,
          totalMedium,
          totalHard,
        } = leetcodeData;

        // Set statistics
        setStatistics({
          easySolved,
          mediumSolved,
          hardSolved,
          totalEasy,
          totalMedium,
          totalHard,
        });

        // Map data to the chart format
        setChartData([
          {
            browser: "Easy",
            visitors: easySolved,
            fill: "var(--color-easy, #4CAF50)",
          },
          {
            browser: "Medium",
            visitors: mediumSolved,
            fill: "var(--color-medium, #FF9800)",
          },
          {
            browser: "Hard",
            visitors: hardSolved,
            fill: "var(--color-hard, #F44336)",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle hover events on the Pie chart
  const handleMouseEnter = (index) => {
    setActiveIndex(index); // Update the active index on hover
  };

  return (
    <Card className="flex flex-col w-full h-full mx-auto p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Leetcode Problem Solving Statistics</CardTitle>
        <CardDescription>
          Easy, Medium, and Hard problems solved
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}} // You can leave this as is if it's not being used
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex} // Dynamically change the active index
              onMouseEnter={(e) => handleMouseEnter(e.index)} // Trigger animation on hover
              animationDuration={1000} // Add animation duration for smooth transitions
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
        <div className="flex justify-center mt-4">
          <div className="flex gap-4 text-center">
            {/* Easy Section */}
            <div className="text-lg font-medium w-full rounded-xl px-4 py-2 shadow-md bg-white dark:bg-neutral-800 transform transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="text-green-500">Easy</div>
              <div>
                {statistics.easySolved}/{statistics.totalEasy}
              </div>
            </div>

            {/* Medium Section */}
            <div className="text-lg font-medium w-full rounded-xl px-4 py-2 shadow-md bg-white dark:bg-neutral-800 transform transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="text-orange-500">Med.</div>
              <div>
                {statistics.mediumSolved}/{statistics.totalMedium}
              </div>
            </div>

            {/* Hard Section */}
            <div className="text-lg font-medium rounded-xl w-full px-4 py-2 shadow-md bg-white dark:bg-neutral-800 transform transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="text-red-500">Hard</div>
              <div>
                {statistics.hardSolved}/{statistics.totalHard}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none mt-3">
          Statistics for Leetcode problem solving{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
