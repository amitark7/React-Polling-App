import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa";
import { ADMIN_ID } from "../utils/constantData";

const PollItem = ({ poll }) => {
  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  useEffect(() => {
    const votedStatus = JSON.parse(localStorage.getItem(`poll_${poll.title}`)) || false;
    if (votedStatus) {
      const votedOption = JSON.parse(localStorage.getItem(`poll_${poll.title}_option`));
      setSelectedOption(votedOption);
    }
  }, [poll.title]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [voted, setVoted] = useState(
    JSON.parse(localStorage.getItem(`poll_${poll.title}`)) || false
  );

  const handleVote = (e) => {
    e.preventDefault();
    if (!voted) {
      localStorage.setItem(`poll_${poll.title}`, JSON.stringify(true));
      localStorage.setItem(`poll_${poll.title}_option`, JSON.stringify(selectedOption));
      setVoted(true);
    }
  };

  return (
    <div className="w-[70%] mx-auto mt-8 p-8 bg-gray-100 rounded shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{poll.title}</h2>
        {userData.roleId === ADMIN_ID && (
          <div className="flex gap-4">
            <FaTrashAlt className="text-red-500 cursor-pointer" />
            <FaEdit className="text-blue-500 cursor-pointer" />
            <FaEye className="text-green-500 cursor-pointer" />
          </div>
        )}
      </div>
      <form onSubmit={handleVote}>
        {poll.optionList?.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="radio"
              id={`option${index}`}
              name="pollOption"
              value={option.optionTitle}
              checked={option.optionTitle === selectedOption}
              onChange={handleOptionChange}
              disabled={voted}
            />
            <label htmlFor={`option${index}`} className="ml-2">
              {option.optionTitle}
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          disabled={voted}
        >
          {voted ? "Voted" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PollItem;
