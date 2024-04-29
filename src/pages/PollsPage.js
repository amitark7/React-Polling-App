import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PollItem from "../component/PollItem";
import {
  deleteSinglePoll,
  getPollList,
} from "../redux/reducer/pollListReducer";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import ConfimationModal from "../component/ConfimationModal";

const PollsPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
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

  const showDeleteModal = (poll) => {
    setSelectedPoll(poll);
    setShowDeletedModal(true);
  };

  const deletePoll = () => {
    dispatch(deleteSinglePoll(selectedPoll.id));
    setShowDeletedModal(false);
    setSelectedPoll(null);
    dispatch(getPollList(pageNumber));
  };

  return (
    <div>
      {pollList?.map((poll, index) => {
        return (
          <PollItem
            key={index}
            poll={poll}
            viewPollVoteChart={viewPollVoteChart}
            showDeleteModal={showDeleteModal}
          />
        );
      })}
      {pollList?.length % 10 === 0 && (
        <button
          onClick={() => setPageNumber((prevPageNumber) => prevPageNumber + 1)}
          className="mx-auto w-[120px] py-2 ml-[15%] mt-10 px-4 bg-blue-400 rounded-md mb-10"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
      {showPollChart && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div
            className="modal-overlay fixed inset-0 bg-gray-500 opacity-50"
            onClick={() => setShowPollChart(false)}
          ></div>
          <div className="modal-container p-4 bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto flex flex-col items-center">
            <h3 className="mb-4">Result of Single Poll</h3>
            <Bar data={chartData} />
          </div>
        </div>
      )}
      {showDeletedModal && (
        <ConfimationModal
          btnOkText={"Delete"}
          btnCancelText={"Cancel"}
          onBtnCancleClick={() => setShowDeletedModal(false)}
          modalTitle={"Delete"}
          modalSubTitle={"Are You Sure? you want delete this item "}
          onBtnOkClick={deletePoll}
        />
      )}
    </div>
  );
};

export default PollsPage;
