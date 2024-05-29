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
  // const items = [
  //   {
  //     key: "1",
  //     label: <Link to="signup">Sign up</Link>,
  //   },
  //   {
  //     key: "2",
  //     label: <Link to="login">Log In</Link>,
  //   },
  //   {
  //     key: "3",
  //     label: (
  //       <a target="" rel="noopener noreferrer" href="/airbnbyourhome">
  //         Airbnb Your Home
  //       </a>
  //     ),
  //   },
  //   {
  //     key: "4",
  //     label: (
  //       <a target="" rel="noopener noreferrer" href="/helpcenter">
  //         Help center
  //       </a>
  //     ),
  //   },
  // ];

  return (
    // <nav className="p-4 border-b-2">
    //   {/* for Logo */}
    //   <div className="flex justify-between items-center px-4">
    //     <Link className="flex justify-center items-center gap-1" to="/">
    //       <span className="text-3xl  text-primary">
    //         <SiAirbnb />
    //       </span>
    //       <span className="text-xl font-bold text-primary hidden lg:block  ">
    //         airbnb
    //       </span>
    //     </Link>

    //     {/* for middle search bar */}
    //     <div className="flex justify-center items-center gap-1 border border-500-lightGrey  rounded-full  h-12 w-80 shadow-md hover:shadow-lg">
    //       <span className="">
    //         <a
    //           className="text-sm font-semibold text-darkGrey truncate ..."
    //           href="#"
    //         >
    //           Anywhere
    //         </a>
    //         <Divider
    //           type="vertical"
    //           className=""
    //           style={{ color: "var(--dark-grey)" }}
    //         />
    //       </span>
    //       <span className="">
    //         <a
    //           className="text-sm font-semibold text-darkGrey  truncate ..."
    //           href="#"
    //         >
    //           Anyweek
    //         </a>
    //         <Divider type="vertical" />
    //       </span>

    //       <span className="flex justify-center items-center gap-3">
    //         <a
    //           className="text-sm font-medium text-lightGrey truncate ..."
    //           href="#"
    //         >
    //           Add Guest
    //         </a>
    //         <a
    //           href="#"
    //           className="flex justify-center items-center text-white bg-primary w-8 h-8 rounded-full "
    //         >
    //           <FaSearch className=" text-sm" />
    //         </a>
    //       </span>
    //     </div>

    //     {/* for right search bar */}

    //     <div className="flex justify-center items-center gap-1">
    //       <span className="flex justify-center items-center rounded-full  h-8 w-36  hover:bg-ultraGrey">
    //         <a href="/airbnbyourhome" className="text-black truncate ...">
    //           Airbnb your home
    //         </a>
    //       </span>
    //       <span className="text-xl text-black flex justify-center items-center rounded-full  h-8 w-8 hover:bg-ultraGrey ">
    //         <a href="#">
    //           <MdLanguage />
    //         </a>
    //       </span>
    //       <span className="flex">
    //         <Dropdown
    //           menu={{
    //             items,
    //           }}
    //           trigger={["click"]}
    //         >
    //           <a>
    //             <div className="flex justify-center items-center gap-2 border border-500-lightGrey rounded-full  h-12 w-20 hover:shadow-lg ">
    //               <div className="text-xl">
    //                 <IoMdMenu style={{}} />
    //               </div>
    //               <div className="text-3xl">
    //                 <RiAccountCircleFill style={{ color: "darkGrey" }} />
    //               </div>
    //             </div>
    //           </a>
    //         </Dropdown>
    //       </span>
    //     </div>
    //   </div>
    // </nav>

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
