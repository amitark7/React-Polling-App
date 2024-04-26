import React, { useEffect, useState } from "react";
import PollItem from "../component/PollItem";
import { useDispatch, useSelector } from "react-redux";
import { getPollList } from "../redux/reducer/pollListReducer";

const PollsPage = () => {
  const [pollsList, setPollList] = useState([
    {
      title:"Who is the winner",
      optionList:[
        {
          optionTitle:"Ram"
        },{
          optionTitle:"Shyam"
        }
      ]
    },{
      title:"Who is the loser",
      optionList:[
        {
          optionTitle:"Ram"
        },{
          optionTitle:"Shyam"
        }
      ]
    },{
      title:"Who is the winner",
      optionList:[
        {
          optionTitle:"Ram"
        },{
          optionTitle:"Shyam"
        }
      ]
    }
  ]);
  const [pageNumber, setPageNumber] = useState(1);
  const { pollList } = useSelector((state) => state.pollList);
  const dispatch = useDispatch();
  console.log(pollList);
  useEffect(() => {
    dispatch(getPollList(pageNumber));
  }, [pageNumber]);

  return (
    <div>
      {pollsList?.map((poll, index) => {
        return <PollItem key={index} poll={poll} />;
      })}
    </div>
  );
};
export default PollsPage;
