import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserList } from "../redux/reducer/userListReducer";

const UserList = () => {
  const [users, setUsers] = useState([""]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const dispatch = useDispatch();

  const getUsers = async () => {
    const result = await dispatch(
      getUserList({ page: currentPage, limit: usersPerPage })
    );
    if (result?.payload?.status === 200) {
      setUsers(result?.payload?.data.rows);
    }
  };

  useEffect(() => {
    getUsers();
  }, [currentPage, usersPerPage]);

  const handleChangePerPage = (e) => {
    setCurrentPage(1);
    setUsersPerPage(parseInt(e.target.value, 10));
  };

  return (
    <div className="w-[90%] max-w-4xl mx-auto mt-8 p-0 py-4 px-2 sm:p-8 bg-gray-100 rounded shadow-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">User List</h2>
      <div className="mb-4 text-sm sm:text-base flex items-center">
        <label htmlFor="perPage ">Entries per page:</label>
        <select
          id="perPage"
          value={usersPerPage}
          onChange={handleChangePerPage}
          className="ml-2 border rounded px-1 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border-b-2 text-sm sm:text-base px-4 sm:px-4 py-2">
              Name
            </th>
            <th className="border-b-2 text-sm sm:text-base px-1 sm:px-4 py-2">
              Email
            </th>
            <th className="border-b-2 text-sm sm:text-base px-1 sm:px-4 py-2">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={index}>
              <td className="border-b text-xs sm:text-sm md:text-base px-1 sm:px-4 py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border-b text-xs sm:text-sm md:text-base px-1 sm:px-4 py-2">
                {user.email}
              </td>
              <td className="border-b text-xs sm:text-sm md:text-base px-1 sm:px-4 py-2">
                {user.roleId === 1 ? "USER" : "ADMIN"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={` ${
            currentPage === 1 ? "bg-gray-400" : "bg-blue-500"
          } text-white w-[90px] text-xs sm:text-base py-2 px-4 rounded ${
            currentPage === 1 ? "bg-gray-400" : "hover:bg-blue-600"
          } transition duration-200`}
        >
          Previous
        </button>
        <div className="text-xs sm:text-base">Page {currentPage}</div>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={users.length < usersPerPage}
          className={` text-white ${
            users.length < usersPerPage ? "bg-gray-400" : "bg-blue-500"
          } py-2 px-4 text-xs w-[90px] sm:text-base  rounded ${
            users.length < usersPerPage ? "bg-gray-400" : "hover:bg-blue-600"
          } transition duration-200`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
