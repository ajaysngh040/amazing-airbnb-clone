import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // Indicates if user data is loaded

  // Load token or user data from cookie/session and set initial user state if needed
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setReady(true); // Mark context as ready after checking the token
  }, []);

  // Function to log out the user (clear context and cookies)
  const logoutUser = () => {
    setUser(null); // Remove user from context
    localStorage.removeItem("user"); // Remove user from localStorage
    Cookies.remove("token", { path: "/" }); // Remove token from cookies
  };

  return (
    <UserContext.Provider value={{ user, setUser, ready, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
