"use client"
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { IconBrandTabler, IconUserBolt } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const SidebarComponent = ({ open, setOpen }) => {
  const [userData, setUserData] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      if (!userId) return;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_USER_API}/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const generateAvatar = (firstName, lastName) => {
    const initials = firstName.charAt(0) + (lastName ? lastName.charAt(0) : "");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=50`;
  };

  const links = [
    {
      label: "Profile",
      href: "/dashboard",
      icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "CodeChef",
      href: "/dashboard/codechef",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Leetcode",
      href: "/dashboard/leetcode",
      icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen} >
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-clip">
          <div className="mt-1 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className={cn(
                  "flex items-center p-3 rounded-s-full transition-colors w-full",
                  pathname === link.href
                    ? "bg-neutral-400 dark:bg-neutral-600 text-white"
                    : "hover:bg-neutral-400 dark:hover:bg-neutral-600"
                )}
              />
            ))}
          </div>
        </div>
        {userData && (
          <div>
            <SidebarLink
              link={{
                label: `${userData.firstName} ${userData.lastName || ""}`.trim(),
                href: "#",
                icon: (
                  <img
                    src={generateAvatar(userData.firstName, userData.lastName)}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        )}
      </SidebarBody>
    </Sidebar>
  );
};

export default SidebarComponent;