import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-2 bg-blue-400">
      <ul className="flex flex-col md:flex-row gap-5 text-lg font-semibold cursor-pointer md:items-center">
        <li>
          <Link to={"/polling"}>Polls</Link>
        </li>
        <li>
          <Link to={"/addpoll"}>Add Poll</Link>
        </li>
        <li>
          <Link to={"/createuser"}>Create User</Link>
        </li>
        <li>
          <Link to={"/users"}>List Users</Link>
        </li>
      </ul>
      <div className="flex items-center gap-2">
        <div className="text-4xl cursor-pointer">
          <FaUserCircle />
        </div>
        <div className="font-semibold">
          <h1 className="text-base">Amit Ark</h1>
          <p>amitkumar@innoteach.in</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
