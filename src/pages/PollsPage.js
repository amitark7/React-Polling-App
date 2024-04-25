import React, { useEffect } from "react";
import axiosInstance from "../utils/axiosInterceptor";

const PollsPage = () => {
  const fetchUserData = async () => {
    // Example GET request
    axiosInstance
      .post("/polling")
      .then((response) => {
        // Handle response data
      })
      .catch((error) => {
        // Handle error
      });
  };
  useEffect(() => {
    // fetchUserData();
  }, []);
  return (
    <div className="mx-auto text-center">
      <h1 className="text-3xl">This Is Poll Page</h1>
    </div>
  );
};

export default PollsPage;
