"use client";
import React from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";
import Link from "next/link";
import withCodeChefProfile from "@/components/withCodeChefProfile";

function PinCodechef({ profileData, loading }) {
  return (
    <div className="h-[40rem] w-full flex items-center justify-center">
      <Link href="/dashboard/codechef">
        <PinContainer title="CodeChef">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-20 w-20 bg-gray-300 rounded-full mx-auto"></div>
                <div className="h-4 w-32 bg-gray-300 mt-4 mx-auto"></div>
                <div className="h-3 w-24 bg-gray-300 mt-2 mx-auto"></div>
              </div>
            ) : profileData ? (
              <>
                <div className="flex flex-col items-center">
                  <Image
                    src={profileData.profile || "/default-avatar.png"}
                    alt="Profile"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-purple-500"
                  />
                  <h3 className="mt-2 font-bold text-lg text-slate-100">
                    {profileData.name}
                  </h3>
                  <span className="text-sm text-slate-400">
                    Rating: {profileData.currentRating}
                  </span>
                  <span className="text-sm text-slate-400">
                    Stars: {profileData.stars}
                  </span>
                </div>
                <div className="flex flex-1 w-full rounded-xl mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
              </>
            ) : (
              <p className="text-center text-red-500">Error loading profile</p>
            )}
          </div>
        </PinContainer>
      </Link>
    </div>
  );
}

export default withCodeChefProfile(PinCodechef);
