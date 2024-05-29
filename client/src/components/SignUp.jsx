import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        toast.success("Registration successful! Redirecting to login page...", {
          onClose: () => setRedirect(true),
          position: "bottom-right",
          style: { zIndex: 9999 },
        });
      }
    } catch (e) {
      toast.error("Registration failed. Please try again later.", {
        position: "bottom-right",
      });
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-lg font-medium text-center mb-4">Register</h1>
        <form onSubmit={registerUser} className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary text-sm font-medium mt-2">Register</button>
          <div className="text-center text-sm font-light py-2">
            Already a member?{" "}
            <Link
              to={"/login"}
              className="text-sm font-light underline text hover:font-medium"
            >
              Login
            </Link>
          </div>
        </form>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}
