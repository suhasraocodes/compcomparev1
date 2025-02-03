import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink} from "./ui/sidebar"
import { IconBrandTabler, IconUserBolt } from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SidebarComponent = ({ open, setOpen }) => {
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

  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (index) => {
    setSelectedLink(index);
  };

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-clip">
          <div className="mt-1 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                onClick={() => handleLinkClick(idx)}
                className={cn(
                  "flex items-center p-3 rounded-s-full transition-colors w-full",
                  selectedLink === idx
                    ? "bg-neutral-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-neutral-500"
                )}
              />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Manu Arora",
              href: "#",
              icon: (
                <Image
                  src="https://assets.aceternity.com/manu.png"
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export default SidebarComponent;
