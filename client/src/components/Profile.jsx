import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  async function logout() {
    try {
      const response = await axios.post("/auth/logout");
      if (response.status === 200) {
        // Clear user context and remove the authentication token from cookies
        setUser(null);
        Cookies.remove("token"); // Remove token from cookies
        toast.success("You’ve successfully logged out.", {
          onClose: () => setRedirect(true), // Redirect after success message
          position: "bottom-right",
          style: { zIndex: 9999 },
        });
      }
    } catch (error) {
      toast.error("Logout failed. Please try again later.", {
        position: "bottom-right",
      });
    }
  }

  if (redirect) {
    return <Navigate to="/login" />; // Redirect to login page after logout
  }

  if (!ready) {
    return "Loading..."; // Show a loading message until the context is ready
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return (
    <div className="text-center max-w-lg mx-auto mt-8 text-sm font-medium">
      Logged in as {user?.name} ({user?.email})<br />
      <button
        onClick={logout}
        className="primary mt-4 max-w-sm text-sm font-medium"
      >
        Logout
      </button>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
