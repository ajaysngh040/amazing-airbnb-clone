import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
  const { user, logoutUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const handleLogout = () => {
    logoutUser(); // Call logout function from UserContext
    toast.success("You’ve successfully logged out.", {
      onClose: () => setRedirect(true),
      position: "bottom-right",
      style: { zIndex: 9999 },
    });
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="text-center max-w-lg mx-auto mt-8">
      <p>
        Logged in as {user.name} ({user.email})
      </p>
      <button onClick={handleLogout} className="primary mt-4">
        Logout
      </button>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
