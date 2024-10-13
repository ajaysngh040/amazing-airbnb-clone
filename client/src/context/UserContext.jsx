import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token"); // Use js-cookie to get the token

    if (token) {
      const fetchProfile = async () => {
        try {
          const { data } = await axios.get("/auth/profile", {
            headers: { Authorization: `Bearer ${token}` }, // Send token in headers if needed
          });
          setUser(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
          setUser(null);
        } finally {
          setReady(true);
        }
      };

      fetchProfile();
    } else {
      setReady(true);
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
