import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from "../redux/reducer/userListReducer";
import { entriesPerPageValue } from "../utils/constantData";

const UserList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLimit, setPageLimit] = useState(5);
  const dispatch = useDispatch();
  const { userList, loading } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getUserList({ page: pageNumber, limit: pageLimit }));
  }, [pageNumber, pageLimit]);

  const handleChangePerPage = (e) => {
    setPageNumber(1);
    setPageLimit(parseInt(e.target.value, 10));
  };

  return (
    <div className="w-[90%] max-w-4xl mx-auto mt-8 p-0 py-4 px-2 sm:p-8 bg-gray-100 rounded shadow-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">User List</h2>
      <div className="mb-4 text-sm sm:text-base flex items-center">
        <label htmlFor="perPage ">Entries per page:</label>
        <select
          id="perPage"
          value={pageLimit}
          onChange={handleChangePerPage}
          className="ml-2 border rounded px-1 py-1"
        >
          {entriesPerPageValue.map((value, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            );
          })}
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
          {loading ? (
            <tr>
              <td colSpan="3" className="text-center py-4">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              </td>
            </tr>
          ) : (
            userList &&
            userList?.map((user, index) => (
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
            ))
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1 || loading}
          className={` ${
            pageNumber === 1 || loading ? "bg-gray-400" : "bg-blue-500"
          } text-white w-[90px] text-xs sm:text-base py-2 px-4 rounded ${
            pageNumber === 1 || loading ? "bg-gray-400" : "hover:bg-blue-600"
          } transition duration-200`}
        >
          Previous
        </button>
        <div className="text-xs sm:text-base">Page {pageNumber}</div>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={userList?.length < pageLimit || loading}
          className={` text-white ${
            userList?.length < pageLimit || loading
              ? "bg-gray-400"
              : "bg-blue-500"
          } py-2 px-4 text-xs w-[90px] sm:text-base  rounded ${
            userList?.length < pageLimit || loading
              ? "bg-gray-400"
              : "hover:bg-blue-600"
          } transition duration-200`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
