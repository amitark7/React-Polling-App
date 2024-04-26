import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { navbarRoute } from "../utils/navbarData";

const Navbar = ({ onLogout }) => {
  const [userData, setUserData] = useState({});
  const [showProfile, setShowProfile] = useState(false);
  const [showNavbarMenu, setShowNavbarMenu] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-between items-center px-4 sm:px-8 md:px-10 py-2 bg-black text-white">
        <div className="md:hidden block text-xl">
          <FaBars onClick={() => setShowNavbarMenu(!showNavbarMenu)} />
        </div>
        <ul
          className={`absolute bg-black px-4 sm:px-8 pb-4 top-[100%] left-0 ${
            showNavbarMenu ? "flex" : "hidden"
          } w-full md:pb-0 md:static flex-col md:flex md:flex-row gap-3 text-[14px] md:text-lg font-semibold cursor-pointer md:items-center`}
          onClick={() => {
            setShowNavbarMenu(false);
            setShowProfile(false);
          }}
        >
          <li>
            <Link to={"/polling"}>Polls</Link>
          </li>
          {userData.roleId === 2 && (
            <>
              {navbarRoute.map((item,index) => {
                return <Link key={index} to={item.path}>{item.name}</Link>;
              })}
            </>
          )}
        </ul>
        <div
          className="flex items-center gap-2"
          onClick={() => setShowProfile(!showProfile)}
        >
          <div className="text-3xl md:text-4xl cursor-pointer">
            <FaUserCircle />
          </div>
          {showProfile && (
            <div className="absolute right-[0%] w-[200px] md:w-[250px] top-[100%] flex text-black flex-col items-start font-semibold bg-white shadow-md rounded">
              <h1 className="text-xs p-2 pr-20 md:text-base">{`${userData.firstName} ${userData.lastName}`}</h1>
              <hr className="w-full border-gray-400" />
              <p className="text-xs p-2 md:text-base">{userData.email}</p>
              <hr className="w-full border-gray-400" />
              <button
                onClick={() => onLogout()}
                className="rounded-md p-2 mr-2 text-xs md:text-base"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
