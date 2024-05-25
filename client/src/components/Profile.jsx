import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  async function logout() {
    try {
      const response = await axios.post("/logout");
      if (response.status == 200) {
        setUser(null);
        setRedirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="text-center max-w-lg mx-auto mt-8 text-sm font-medium">
      Logged in as {user.name} ({user.email})<br />
      <button
        onClick={logout}
        className="primary mt-4 max-w-sm  text-sm font-medium"
      >
        Logout
      </button>
    </div>
  );
}
