"use client"

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
    easyTotal: 856,
    mediumTotal: 1793,
    hardTotal: 796,
  });
  const [activeIndex, setActiveIndex] = useState(null);

  // Fetch data from the API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/suhascodes');
        const data = await response.json();

        const { easySolved, mediumSolved, hardSolved } = data;

        // Set statistics
        setStatistics({
          easySolved,
          mediumSolved,
          hardSolved,
          easyTotal: 856,
          mediumTotal: 1793,
          hardTotal: 796,
        });

        // Map data to the chart format
        setChartData([
          { browser: "Easy", visitors: easySolved, fill: "var(--color-easy, #4CAF50)" },
          { browser: "Medium", visitors: mediumSolved, fill: "var(--color-medium, #FF9800)" },
          { browser: "Hard", visitors: hardSolved, fill: "var(--color-hard, #F44336)" },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle hover events on the Pie chart
  const handleMouseEnter = (index) => {
    setActiveIndex(index); // Update the active index on hover
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Leetcode Problem Solving Statistics</CardTitle>
        <CardDescription>Easy, Medium, and Hard problems solved</CardDescription>
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
            <div className="text-lg font-medium">
              <div className="text-green-500">Easy</div>
              <div>{statistics.easySolved}/{statistics.easyTotal}</div>
            </div>
            <div className="text-lg font-medium">
              <div className="text-orange-500">Medium</div>
              <div>{statistics.mediumSolved}/{statistics.mediumTotal}</div>
            </div>
            <div className="text-lg font-medium">
              <div className="text-red-500">Hard</div>
              <div>{statistics.hardSolved}/{statistics.hardTotal}</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing statistics for Leetcode problem solving
        </div>
      </CardFooter>
    </Card>
  );
}
