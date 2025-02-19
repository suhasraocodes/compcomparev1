"use client";
import React, { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import { IconBrandTabler, IconUserBolt, IconCheck, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Modal from "@/components/ui/Modal";
import { toast } from "sonner"; // Import Sonner's toast

const SidebarComponent = ({ open, setOpen }) => {
  const [userData, setUserData] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [updatedUsernames, setUpdatedUsernames] = useState({
    leetcodeUsername: "",
    codechefUsername: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    leetcodeUsername: "",
    codechefUsername: "",
  });
  const [validUsernames, setValidUsernames] = useState({
    leetcodeUsername: null,
    codechefUsername: null,
  });

  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
      if (!userId) return;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userData/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setUpdatedUsernames({
            leetcodeUsername: data.leetcodeUsername || "",
            codechefUsername: data.codechefUsername || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const verifyUsername = async (platform, username) => {
    if (!username.trim()) return;

    let url;
    if (platform === "leetcodeUsername") {
      url = `${process.env.NEXT_PUBLIC_LEETCODE_API}/${username}`;
    } else if (platform === "codechefUsername") {
      url = `${process.env.NEXT_PUBLIC_CODECHEF_API}/handle/${username}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setValidUsernames((prev) => ({ ...prev, [platform]: false }));
        return false;
      }

      const data = await response.json();

      if (platform === "leetcodeUsername") {
        if (data.errors?.some((error) => error.message.includes("does not exist"))) {
          setValidUsernames((prev) => ({ ...prev, [platform]: false }));
          return false;
        }
      } else if (platform === "codechefUsername") {
        if (data.success === false && data.status === 404) {
          setValidUsernames((prev) => ({ ...prev, [platform]: false }));
          return false;
        }
      }

      setValidUsernames((prev) => ({ ...prev, [platform]: true }));
      return true;
    } catch (error) {
      setValidUsernames((prev) => ({ ...prev, [platform]: false }));
      console.error(`Error verifying ${platform} username:`, error);
      return false;
    }
  };

  const handleUsernameChange = async (platform, username) => {
    setUpdatedUsernames((prev) => ({ ...prev, [platform]: username }));
    setValidUsernames((prev) => ({ ...prev, [platform]: null })); // Reset validation state when typing

    if (username.trim() !== "") {
      const isValid = await verifyUsername(platform, username);
      setValidationErrors((prev) => ({
        ...prev,
        [platform]: isValid ? "" : `Invalid ${platform}`,
      }));
    }
  };

  const updateUsernames = async () => {
    // Check if both usernames are valid before updating
    if (!validUsernames.leetcodeUsername || !validUsernames.codechefUsername) {
      toast.error("Both usernames must be valid before updating."); // Show error toast
      return;
    }

    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (!userId) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update-username/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUsernames),
      });

      if (!response.ok) {
        toast.error("Failed to update usernames."); // Show error toast on failure
        return;
      }

      setUserData((prev) => ({ ...prev, ...updatedUsernames }));
      setEditModalOpen(false); // Close the modal after saving
      toast.success("Usernames updated successfully!"); // Show success toast
    } catch (error) {
      toast.error("Error updating usernames: " + error.message); // Show error toast on exception
    }
  };
  useEffect(() => {
    if (editModalOpen) {
      // Validate both usernames as soon as modal opens
      Object.keys(updatedUsernames).forEach((platform) => {
        handleUsernameChange(platform, updatedUsernames[platform]);
      });
    }
  }, [editModalOpen]); // Runs only when editModalOpen changes
  

  // Memoize the links array to prevent unnecessary re-renders
  const links = useMemo(() => [
    { label: "Profile", href: "/dashboard", icon: <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
    { label: "CodeChef", href: "/dashboard/codechef", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
    { label: "Leetcode", href: "/dashboard/leetcode", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> },
  ], []);

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-clip">
          <div className="mt-1 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className={cn(
                  "flex items-center p-3 rounded-s-full transition-colors w-full",
                  pathname === link.href ? "bg-neutral-400 dark:bg-neutral-600 text-white" : "hover:bg-neutral-400 dark:hover:bg-neutral-600"
                )}
              />
            ))}
          </div>
        </div>

        {userData && (
          <div className="relative flex items-center gap-3 p-3 rounded-md">
            <SidebarLink
              link={{
                label: `${userData.firstName} ${userData.lastName || ""}`.trim(),
                href: "#",
                icon: (
                  <img
                    src={`https://ui-avatars.com/api/?name=${userData.firstName}&background=random`}
                    className="h-7 w-7 rounded-full"
                    alt="Avatar"
                  />
                ),
              }}
              onClick={() => setEditModalOpen(true)} // Open the modal when clicking on the username
            />
          </div>
        )}
      </SidebarBody>

      {editModalOpen && (
        <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <div className="flex flex-col gap-3">
            {["leetcodeUsername", "codechefUsername"].map((platform) => (
              <div key={platform}>
                <label>{platform === "leetcodeUsername" ? "LeetCode Username" : "CodeChef Username"}</label>
                <div className="relative">
                  <Input
                    value={updatedUsernames[platform]}
                    onChange={(e) => handleUsernameChange(platform, e.target.value)}
                    className="pr-10"
                  />
                  {validUsernames[platform] !== null && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {validUsernames[platform] ? <IconCheck className="text-green-500" /> : <IconX className="text-red-500" />}
                    </span>
                  )}
                </div>
                {validationErrors[platform] && <p className="text-red-500 text-sm">{validationErrors[platform]}</p>}
              </div>
            ))}
            <Button 
              className="mt-4" 
              onClick={updateUsernames} 
              disabled={!validUsernames.leetcodeUsername || !validUsernames.codechefUsername} // Disable button if any username is invalid
            >
              Save
            </Button>
          </div>
        </Modal>
      )}
    </Sidebar>
  );
};

export default SidebarComponent;
