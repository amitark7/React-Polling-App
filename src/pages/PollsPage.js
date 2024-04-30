import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PollItem from "../component/PollItem";
import {
  deleteSinglePoll,
  getPollList,
} from "../redux/reducer/pollListReducer";
import ConfimationModal from "../component/ConfimationModal";
import ChartModal from "../component/ChartModal";

const PollsPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [polls, setPolls] = useState([]);
  const { pollList, loading } = useSelector((state) => state.pollList);
  const [showPollChart, setShowPollChart] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const dispatch = useDispatch();

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

  const showPollChartModal = (poll) => {
    setShowPollChart(true);
    setSelectedPoll(poll);
  };

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
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  ) : (
    <div>
      {polls?.map((poll, index) => {
        return (
          <PollItem
            key={index}
            poll={poll}
            showPollChartModal={showPollChartModal}
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
        <ChartModal data={selectedPoll} setShowPollChart={setShowPollChart} />
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
