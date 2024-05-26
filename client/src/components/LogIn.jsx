import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      if (response.status === 200) {
        setUser(response.data);
        toast.success("Welcome back! You’ve successfully logged in.", {
          onClose: () => setRedirect(true),
          position: "bottom-right",
          style: { zIndex: 9999 },
        });
      }
    } catch (e) {
      toast.error("Login failed", { position: "bottom-right" });
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (user) {
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
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary text-sm font-medium mt-2">Login</button>
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
