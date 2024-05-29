import { MdLanguage } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
// import { Dropdown } from "antd";
// import { Link } from "react-router-dom";
import { SiAirbnb } from "react-icons/si";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <header className="bg-white flex justify-between items-center w-full fixed top-0 left-0 z-50 pt-3 pb-4 pl-11">
        <Link
          to={"/"}
          className="flex justify-center items-center text-primary"
        >
          <SiAirbnb size="34px" />
          <span className="font-bold text-xl tracking-tight p-1 hidden md:block">
            airbnb
          </span>
        </Link>

        <div className="flex items-center border border-gray-100 rounded-full py-2 px-2 gap-4 shadow-sm shadow-grey-100 hover:shadow-md cursor-pointer xl:ml-36 md:ml-24 lg:ml-20">
          <div className="text-sm font-medium hidden md:block truncate ...">
            Anywhere
          </div>
          {/* <div className="border border-1 border-grey-500 hidden sm:block"></div> */}
          <div className="text-sm font-medium hidden md:block truncate ...">
            Any week
          </div>
          {/* <div className="border border-l border-grey-500 hidden sm:block"></div> */}
          <div className="text-sm font-light hidden md:block truncate ...">
            Add guest
          </div>
          <button className="bg-primary text-white p-2 rounded-full hidden md:block">
            <IoSearchOutline />
          </button>
        </div>

        {/* Right menu */}
        <div className="flex justify-center items-center gap-2">
          <span className="flex justify-center items-center rounded-full hover:bg-gray-100 py-3 px-4">
            <a
              href="#"
              className="text-sm font-medium hidden xl:block truncate ..."
            >
              Airbnb your home
            </a>
          </span>
          <span className="text-xl text-black flex justify-center items-center rounded-full hover:bg-gray-100 py-3 px-3 ">
            <a href="#" className="hidden xl:block">
              <MdLanguage />
            </a>
          </span>
          <Link
            to={user ? "/account" : "/login"}
            className="flex items-center border border-gray-200 rounded-full py-3 px-3 gap-2 overflow-hidden shadow-sm hover:shadow-md mr-10"
          >
            <IoMdMenu size="22px" />
            <div className="bg-darkGrey text-white rounded-full border border-grey-300">
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
            </div>
            {!!user && (
              <div className="text-xs font-medium mr-2 truncate ...">
                {user.name}
              </div>
            )}
          </Link>
        </div>
      </header>
    </div>
  );
}
