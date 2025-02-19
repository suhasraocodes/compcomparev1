"use client";
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignupFormDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [validUsernames, setValidUsernames] = useState({
    leetcodeUsername: null,
    codechefUsername: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const router = useRouter();
  const getBorderColor = () => {
    if (!password || !reenterPassword) return ""; // No border when empty
    return password === reenterPassword ? "border-green-500" : "border-red-500";
  };
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  const verifyUsername = async (platform, username) => {
    if (!username.trim()) {
      setValidUsernames((prev) => ({ ...prev, [platform]: null }));
      return;
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;
    const reenterPassword = e.target.reenterpassword.value;

    setPassword(password);
    setReenterPassword(reenterPassword);

    if (password !== reenterPassword) {
      toast.error("Passwords do not match", { richColors: true });
      return;
    }

    const formData = {
      firstName: e.target.firstname.value,
      lastName: e.target.lastname.value,
      email: e.target.email.value,
      password,
      leetcodeUsername: e.target.leetcodeusername.value,
      codechefUsername: e.target.codechefusername.value || null,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Welcome..Forwarding you to signin page", {
          richColors: true,
        });
        router.push("/signin");
      } else {
        toast.error("User Already exists, try sign in", { richColors: true });
      }
    } catch (error) {
      toast.error("User Already exists, try sign in.", { richColors: true });
    }
  };

  return (
    <div className="max-w-md mt-32 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to CodeStats
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Sign up to get started
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          {isLoading ? (
            <>
              <Skeleton className="w-full h-10 rounded-md" />
              <Skeleton className="w-full h-10 rounded-md" />
            </>
          ) : (
            <>
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Durden"
                  type="text"
                  required
                />
              </LabelInputContainer>
            </>
          )}
        </div>
        {isLoading ? (
          <Skeleton className="w-full h-10 rounded-md mb-4" />
        ) : (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="example@domain.com"
              type="email"
              required
            />
          </LabelInputContainer>
        )}

{isLoading ? (
  <Skeleton className="w-full h-10 rounded-md mb-4" />
) : (
  <LabelInputContainer className="mb-4">
    <Label htmlFor="password">Password</Label>
    <div className="relative">
      <Input
        id="password"
        placeholder="••••••••"
        type={showPassword ? "text" : "password"}
        required
        className={`${getBorderColor()}`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </LabelInputContainer>
)}

{isLoading ? (
  <Skeleton className="w-full h-10 rounded-md mb-4" />
) : (
  <LabelInputContainer className="mb-4">
    <Label htmlFor="reenterpassword">Re-enter Password</Label>
    <div className="relative">
      <Input
        id="reenterpassword"
        placeholder="••••••••"
        type={showReenterPassword ? "text" : "password"}
        required
        className={`${getBorderColor()}`}
        value={reenterPassword}
        onChange={(e) => setReenterPassword(e.target.value)}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        onClick={() => setShowReenterPassword(!showReenterPassword)}
      >
        {showReenterPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  </LabelInputContainer>
)}

        {isLoading ? (
          <Skeleton className="w-full h-10 rounded-md mb-4" />
        ) : (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="codechefusername">Codechef Username</Label>
            <Input
              id="codechefusername"
              placeholder="CodechefUsername"
              type="text"
              onChange={(e) => verifyUsername("codechefUsername", e.target.value)}
              className={validUsernames.codechefUsername === false ? "border-red-500" : validUsernames.codechefUsername === true ? "border-green-500" : ""}
            />
          </LabelInputContainer>
        )}

        {isLoading ? (
          <Skeleton className="w-full h-10 rounded-md mb-4" />
        ) : (
          <LabelInputContainer className="mb-4">
            <Label htmlFor="leetcodeusername">Leetcode Username</Label>
            <Input
              id="leetcodeusername"
              placeholder="Leetcodeusername"
              type="text"
              onChange={(e) => verifyUsername("leetcodeUsername", e.target.value)}
              className={validUsernames.leetcodeUsername === false ? "border-red-500" : validUsernames.leetcodeUsername === true ? "border-green-500" : ""}
            />
          </LabelInputContainer>
        )}

        {isLoading ? (
          <Skeleton className="w-full h-10 rounded-md mb-4" />
        ) : (
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
        )}

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            Go to signin
          </Link>
        </p>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};