import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../utilityFunction"; // Assuming this function retrieves cookies correctly

// Create UserContext with default value as an empty object
export const UserContext = createContext({});

// UserContextProvider component to wrap around children components
// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // To store user data
  const [ready, setReady] = useState(false); // To indicate if data is ready

  useEffect(() => {
    const token = getCookie("token"); // Retrieve token from cookies

    if (!token) {
      // If no token, skip the Axios call and directly set user to null
      setUser(null);
      setReady(true); // Mark ready since there's no token
    } else {
      // If token is present, fetch user profile
      const fetchProfile = async () => {
        try {
          const { data } = await axios.get("/profile", {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in request headers
            },
          });

          if (data) {
            setUser(data); // Set user data if fetched successfully
          } else {
            setUser(null); // If no data returned, set user to null
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setUser(null); // In case of error, set user to null
        } finally {
          setReady(true); // Set ready to true regardless of success or error
        }
      };

      fetchProfile(); // Call the async function to fetch profile
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
