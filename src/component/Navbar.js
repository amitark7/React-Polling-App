import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import navbarData from "../utils/navbarData.json";
import { ADMIN_ID } from "../utils/constantData";
import { useDispatch, useSelector } from "react-redux";
import { getUser, onLogout } from "../redux/reducer/authReducer";

const Navbar = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const [showNavbarMenu, setShowNavbarMenu] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const onLogoutClick = () => {
    dispatch(onLogout());
    navigate("/");
  };

  return user && user?.id ? (
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
            setShowLogoutBtn(false);
          }}
        >
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-500"
              }
              to={"/polling"}
            >
              Polls
            </NavLink>
          </li>
          {user.roleId === ADMIN_ID && (
            <>
              {navbarData.map((item, index) => {
                return (
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-white" : "text-gray-500"
                    }
                    key={index}
                    to={item.path}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </>
          )}
        </ul>
        <div
          className="flex items-center relative gap-2"
          onClick={() => {
            setShowLogoutBtn(!showLogoutBtn);
            setShowNavbarMenu(false);
          }}
        >
          <div className="text-3xl flex gap-2 items-center md:text-4xl cursor-pointer">
            <FaUserCircle />
            <div>
              <h1 className="text-xs md:text-base">{`${user?.firstName} ${user?.lastName}`}</h1>
              <p className="text-xs md:text-base">{user?.email}</p>
            </div>
          </div>
          {showLogoutBtn && (
            <div className="absolute left-[0%] w-full top-[116%] flex text-black flex-col font-semibold bg-red-500 shadow-md rounded">
              <button
                onClick={() => onLogoutClick()}
                className="rounded-md p-3 mr-2 text-xs md:text-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Navbar;
