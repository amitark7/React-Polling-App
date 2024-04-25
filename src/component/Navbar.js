import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Navbar = ({ onLogout }) => {
  const [userData, setUserData] = useState({});
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
          <FaBars onClick={() => setShowMenu(!showMenu)} />
        </div>
        <ul
          className={`absolute bg-black px-4 sm:px-8 pb-4 top-[100%] left-0 ${
            showMenu ? "flex" : "hidden"
          } w-full md:pb-0 md:static flex-col md:flex md:flex-row gap-3 text-[14px] md:text-lg font-semibold cursor-pointer md:items-center`}
          onClick={() => {
            setShowMenu(false);
            setShowLogoutModal(false);
          }}
        >
          <li>
            <Link to={"/polling"}>Polls</Link>
          </li>
          {userData.roleId === 2 && (
            <>
              <li>
                <Link to={"/addpoll"}>Add Poll</Link>
              </li>
              <li>
                <Link to={"/createuser"}>Create User</Link>
              </li>
              <li>
                <Link to={"/users"}>List Users</Link>
              </li>
            </>
          )}
        </ul>
        <div
          className="flex items-center gap-2"
          onClick={() => setShowLogoutModal(!showLogoutModal)}
        >
          <div className="text-3xl md:text-4xl cursor-pointer">
            <FaUserCircle />
          </div>
          {showLogoutModal && (
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
