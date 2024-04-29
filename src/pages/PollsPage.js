import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PollItem from "../component/PollItem";
import {
  deleteSinglePoll,
  getPollList,
} from "../redux/reducer/pollListReducer";

import ConfimationModal from "../component/ConfimationModal";
import { ClipLoader, MoonLoader } from "react-spinners";
import ChartModal from "../component/ChartModal";

const PollsPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [polls, setPolls] = useState([]);
  const { pollList, loading } = useSelector((state) => state.pollList);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgb(0, 137, 167)",
        borderWidth: 1,
      },
    ],
  });
  const [showPollChart, setShowPollChart] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const dispatch = useDispatch();

  const viewPollVoteChart = (pollData) => {
    const optionList = pollData.optionList.map(
      ({ optionTitle, voteCount }) => ({ optionTitle, voteCount })
    );
    const labels = optionList.map((items) => items.optionTitle);
    setChartData({
      labels: labels,
      datasets: [
        {
          label: pollData.title,
          data: optionList.map((items) => items.voteCount.length),
          backgroundColor: "rgb(0, 137, 167)",
        },
      ],
    });
    setShowPollChart(true);
  };

  useEffect(() => {
    dispatch(getPollList(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (pageNumber === 1) {
      setPolls(pollList);
    } else {
      setPolls([...polls, ...pollList]);
    }
  }, [pollList]);

  const showDeleteModal = (poll) => {
    setSelectedPoll(poll);
    setShowDeletedModal(true);
  };

  const deletePoll = () => {
    dispatch(deleteSinglePoll(selectedPoll.id));
    setShowDeletedModal(false);
    setSelectedPoll(null);
    setPolls(polls.filter((poll) => poll.id !== selectedPoll.id));
  };

  return loading ? (
    <div className="text-center mx-auto w-full mt-10">
      <ClipLoader size={60} color="#36d7b7" />
    </div>
  ) : (
    <div>
      {polls?.map((poll, index) => {
        return (
          <PollItem
            key={index}
            poll={poll}
            viewPollVoteChart={viewPollVoteChart}
            showDeleteModal={showDeleteModal}
          />
        );
      })}
      <div className="text-center">
        <button
          onClick={() => setPageNumber((prevPageNumber) => prevPageNumber + 1)}
          className={`mx-auto w-[120px] py-2 mt-10 px-4 ${
            loading ? "bg-gray-400" : "bg-blue-400"
          } rounded-md mb-10`}
          disabled={loading}
        >
          Load More
        </button>
      </div>

      {showPollChart && (
        <ChartModal data={chartData} setShowPollChart={setShowPollChart} />
      )}
      {showDeletedModal && (
        <ConfimationModal
          btnOkText={"Delete"}
          btnCancelText={"Cancel"}
          onBtnCancleClick={() => setShowDeletedModal(false)}
          modalTitle={"Delete"}
          modalSubTitle={"Are You Sure? you want delete this item "}
          onBtnOkClick={deletePoll}
          btnColor={"bg-red-500"}
        />
      )}
    </div>
  );
};

export default PollsPage;
