import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token && !user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
