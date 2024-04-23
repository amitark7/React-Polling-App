import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PrivateRoute = ({ Component, redirectTo }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      if (redirectTo === "/signup" || redirectTo === "/") {
        navigate("/polling");
      }
    } else {
      navigate(redirectTo === "/signup" ? "/signup" : "/");
    }
  }, [navigate, redirectTo]);
  return <Component />;
};
export default PrivateRoute;
