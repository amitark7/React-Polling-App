import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { ADMIN_ID } from "../utils/constantData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { votedPollOption } from "../redux/reducer/pollListReducer";
import { getUser } from "../redux/reducer/authReducer";

const PollItem = ({ poll, showPollChartModal, showDeleteModal }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [voted, setVoted] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    const votedPollStatus =
      JSON.parse(localStorage.getItem("VotedPollsOptions")) || {};
    const userVotedOption = votedPollStatus[poll.id];
    if (userVotedOption) {
      setSelectedOption(userVotedOption);
      setVoted(true);
    }
  }, [poll.id]);

  const submitVote = (e) => {
    e.preventDefault();
    if (!voted && selectedOption) {
      const votedPollStatus =
        JSON.parse(localStorage.getItem("VotedPollsOptions")) || {};
      votedPollStatus[poll.id] = selectedOption;
      localStorage.setItem(
        "VotedPollsOptions",
        JSON.stringify(votedPollStatus)
      );
      dispatch(votedPollOption(selectedOption));
      setVoted(true);
    }
  };

  return (
    <div className="w-[80%] sm:w-[48%] lg:w-[32%] 2xl:w-[24%] mt-8 min-h-[300px] bg-gray-100 rounded shadow-lg">
      {user?.roleId === ADMIN_ID && (
        <div className="flex gap-4 justify-end my-4 mr-2">
          <FaTrashAlt
            onClick={() => showDeleteModal(poll)}
            className="text-red-500 cursor-pointer"
          />
          <Link to={`/editpoll/${poll.id}`}>
            <FaEdit className="text-blue-500 cursor-pointer" />
          </Link>
          <IoBarChart
            onClick={() => showPollChartModal(poll)}
            className="text-green-500 cursor-pointer"
          />
        </div>
      )}
      <div className="px-3 pb-2 md:px-8 md:pb-8">
        <div className="flex flex-col gap-2 text-justify items-center mb-4">
          <h2 className="text-xl font-semibold">{poll.title}</h2>
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
          <div className="mx-auto w-full">
            <button
              type="submit"
              className={`w-full ${
                voted ? "bg-gray-400" : "bg-blue-500"
              } text-white mt-5  py-2 px-4 rounded ${
                !voted && "hover:bg-blue-600"
              } transition duration-200`}
              disabled={voted}
            >
              {voted ? "Voted" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PollItem;
