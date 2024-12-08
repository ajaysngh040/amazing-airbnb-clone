import { IoMdMenu } from "react-icons/io";
import { FaPersonWalkingLuggage } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="flex justify-between items-center fixed top-0 left-0 w-full z-50 px-8 lg:px-16 bg-white py-2">
      <Link to={"/"} className="flex justify-center items-center text-primary">
        <FaPersonWalkingLuggage size="28px" />
        <span className="font-bold text-md tracking-tight p-1 hidden sm:block">
          Travel Nest
        </span>
      </Link>

      {/* Right menu */}
      <div className="flex justify-center items-center gap-2">
        <Link
          to={user ? "/account" : "/login"}
          className="flex items-center border border-gray-200 rounded-full py-3 px-3 gap-2 overflow-hidden shadow-sm hover:shadow-md"
        >
          <IoMdMenu size="22px" />
          <div className="bg-darkGrey text-white rounded-full border border-grey-300">
            {user ? (
              <img src={"man.png"} />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
