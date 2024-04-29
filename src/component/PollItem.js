import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { ADMIN_ID } from "../utils/constantData";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { votedPollOption } from "../redux/reducer/pollListReducer";

const PollItem = ({ poll, viewPollVoteChart, showDeleteModal }) => {
  const [userData, setUserData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(
    JSON.parse(localStorage.getItem(`poll_${poll.title}`)) || false
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  useEffect(() => {
    const votedStatus =
      JSON.parse(localStorage.getItem(`poll_${poll.title}`)) || false;
    if (votedStatus) {
      const votedOption = JSON.parse(
        localStorage.getItem(`poll_${poll.title}_option`)
      );
      setSelectedOption(votedOption);
    }
  }, [poll.title]);

  const submitVote = (e) => {
    e.preventDefault();
    if (!voted) {
      localStorage.setItem(`poll_${poll.title}`, JSON.stringify(true));
      localStorage.setItem(
        `poll_${poll.title}_option`,
        JSON.stringify(selectedOption)
      );
      if (selectedOption) {
        dispatch(votedPollOption(selectedOption));
        setVoted(true);
      }
    }
  };

  return (
    <div className="w-[70%] mx-auto mt-8 p-3 md:p-8 bg-gray-100 rounded shadow-lg">
      <div className="flex justify-between flex-col  gap-2 sm:flex-row items-center mb-4">
        <h2 className="text-xl font-semibold">{poll.title}</h2>
        {userData.roleId === ADMIN_ID && (
          <div className="flex gap-4">
            <FaTrashAlt
              onClick={() => showDeleteModal(poll)}
              className="text-red-500 cursor-pointer"
            />
            <Link to={`/editpoll/${poll.id}`}>
              <FaEdit className="text-blue-500 cursor-pointer" />
            </Link>
            <IoBarChart
              onClick={() => viewPollVoteChart(poll)}
              className="text-green-500 cursor-pointer"
            />
          </div>
        )}
      </div>
      <form onSubmit={submitVote}>
        {poll.optionList?.map((option, index) => (
          <div key={index} className="mb-2">
            <input
              type="radio"
              id={`option${index}`}
              name="pollOption"
              value={option.id}
              checked={option.id === selectedOption}
              onChange={() => setSelectedOption(option.id)}
              disabled={voted}
            />
            <label htmlFor={`option${index}`} className="ml-2">
              {option.optionTitle}
            </label>
          </div>
        ))}
        <button
          type="submit"
          className={`w-full ${
            voted ? "bg-gray-400" : "bg-blue-500"
          } text-white py-2 px-4 rounded ${
            !voted && "hover:bg-blue-600"
          } transition duration-200`}
          disabled={voted}
        >
          {voted ? "Voted" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PollItem;
