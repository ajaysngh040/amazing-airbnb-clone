import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user, setUser } = useContext(UserContext);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const data = await axios.post("/login", { email, password });
      setUser(data);
      setRedirect("/");
      alert("Login successful");
    } catch (e) {
      alert("Login failed");
    }
  }

  if (!user && !redirect) {
    <Navigate to={"/login"} />;
  } else {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-lg font-medium text-center mb-4">Login</h1>
        <form
          action=""
          onSubmit={handleLoginSubmit}
          className="max-w-md mx-auto"
        >
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
      </div>
    </div>
  );
}
