import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  async function registerUser(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        history.push("/login");
      }

      alert("Registration successfull");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-lg font-medium text-center mb-4">Register</h1>
        <form action="" onSubmit={registerUser} className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="John doe"
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
          <div className="text-center py-2 text-sm font-light">
            Already a member?{" "}
            <Link
              to={"/login"}
              className="text-sm font-light hover:font-medium underline text"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
