import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for preventing multiple submissions
  const { user, setUser } = useContext(UserContext);

  // Form validation
  const validateForm = () => {
    if (!email || !password) {
      toast.error("Email and password are required.", {
        position: "bottom-right",
      });
      return false;
    }
    return true;
  };

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    // Form validation check
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post("/auth/login", { email, password });
      const { token, user } = response.data;

      toast.success("Welcome back! You’ve successfully logged in.", {
        onClose: () => setRedirect(true),
        position: "bottom-right",
        style: { zIndex: 9999 },
      });

      if (user) {
        setUser(user); // Set user data to context
      }

      if (token) {
        Cookies.set("token", token, { path: "/profile" }); // Store token in cookies "/" for root & "/profile" for usercontext
        toast.success("Welcome back! You’ve successfully logged in.", {
          onClose: () => setRedirect(true),
          position: "bottom-right",
          style: { zIndex: 9999 },
        });
      }
    } catch (e) {
      // Check for specific error cases (e.g., invalid credentials)
      if (e.response && e.response.status === 401) {
        toast.error("Invalid email or password.", { position: "bottom-right" });
      } else {
        toast.error("Login failed. Please try again.", {
          position: "bottom-right",
        });
      }
    } finally {
      setLoading(false); // Stop loading after response is received
    }
  }

  // Redirect if user is already logged in
  if (redirect || user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-lg font-medium text-center mb-4">Login</h1>
        <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
          <button
            className="primary text-sm font-medium mt-2"
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="text-center text-sm font-light py-2">
            Don&apos;t have an account yet?{" "}
            <Link
              to={"/signup"}
              className="text-sm font-light underline text hover:font-medium"
            >
              Register now
            </Link>
          </div>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}
