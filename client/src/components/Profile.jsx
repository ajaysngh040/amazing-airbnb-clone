import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  async function logout() {
    try {
      const response = await axios.post("/logout");
      if (response.status === 200) {
        setUser(null);
        toast.success("You’ve successfully logged out.", {
          onClose: () => setRedirect(true),
          position: "bottom-right",
          style: { zIndex: 9999 },
        });
      }
    } catch (error) {
      toast.error("Logout failed. Please try again later..", {
        position: "bottom-right",
      });
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="text-center max-w-lg mx-auto mt-8 text-sm font-medium">
      Logged in as {user.name} ({user.email})<br />
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
