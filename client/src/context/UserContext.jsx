import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../utilityFunction";

// Create the UserContext
export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null); // User state
  const [ready, setReady] = useState(false); // Ready state to indicate data is fetched

  useEffect(() => {
    const token = getCookie("token"); // Get token from cookies
    if (token) {
      axios
        .get("/profile", { headers: { Authorization: `Bearer ${token}` } }) // Set token in headers for request
        .then(({ data }) => {
          setUser(data); // Set user data in state
          setReady(true); // Set ready state to true
        })
        .catch((error) => {
          console.log("Error fetching profile data:", error);
          setReady(true); // Even on error, set ready to true to end loading state
        });
    } else {
      setReady(true); // If no token, set ready to true
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
