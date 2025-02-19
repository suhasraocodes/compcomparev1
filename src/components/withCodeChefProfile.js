/* eslint-disable react/display-name */
// components/withCodeChefProfile.js
import { useEffect, useState } from "react";
import axios from "axios";

const fetchCodeChefProfile = async () => {
  try {
    const userId = localStorage.getItem("userId") || sessionStorage.getItem("userId");
    if (!userId) throw new Error("User ID not found in storage");

    // Fetch user data to get CodeChef username
    const userResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userData/${userId}`
    );
    const codechefUsername = userResponse.data.codechefUsername;
    if (!codechefUsername) throw new Error("CodeChef username not found");

    // Fetch CodeChef profile data
    const profileResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_CODECHEF_API}/handle/${codechefUsername}`
    );
    
    console.log("Fetched CodeChef Profile:", profileResponse);

    if (profileResponse.status === 200) {
      // Store the profile data in localStorage
      localStorage.setItem("codechefProfile", JSON.stringify(profileResponse.data));
      return profileResponse.data;
    }
  } catch (error) {
    console.error("Error fetching CodeChef profile:", error);
    throw error;
  }
};

const withCodeChefProfile = (WrappedComponent) => {
  return (props) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Check if page was explicitly refreshed
          const pageReloaded = performance.navigation.type === 1; // Type 1 means reload

          if (pageReloaded) {
            console.log("Page refreshed: Clearing local storage and fetching fresh data.");
            localStorage.removeItem("codechefProfile"); // Clear cached data
          }

          // Always fetch fresh data on refresh
          const data = await fetchCodeChefProfile();
          setProfileData(data);
        } catch (error) {
          console.error("Error in withCodeChefProfile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return <WrappedComponent {...props} profileData={profileData} loading={loading} />;
  };
};

export default withCodeChefProfile;
