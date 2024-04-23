import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const formOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const onFormSubmit = async () => {
    let formValid = true;
    const errors = {};

    if (!userData.email) {
      errors.email = "Email is required";
      formValid = false;
    }

    if (!userData.password) {
      errors.password = "Password is required";
      formValid = false;
    }

    if (formValid) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const jsonData = await response.json();
      if (jsonData) {
        localStorage.setItem("user", JSON.stringify(jsonData.user));
        localStorage.setItem("token", JSON.stringify(jsonData.token));
        navigate("/polling");
      }
    } else {
      setError(errors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="border bg-white w-[25%] py-10 px-5 text-center rounded-lg mx-auto mt-20 shadow-lg">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form className="flex flex-col my-6 text-black text-left">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            className={`w-full rounded-md py-3 pl-2 outline-none border-2 mt-4 ${
              error.email ? "border-red-500" : ""
            }`}
            value={userData.email}
            onChange={(e) => formOnChange(e)}
          />
          {error.email && <p className="text-red-500">{error.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full rounded-md py-3 pl-2 outline-none border-2 mt-4 ${
              error.password ? "border-red-500" : ""
            }`}
            value={userData.password}
            onChange={(e) => formOnChange(e)}
          />
          {error.password && <p className="text-red-500">{error.password}</p>}
        </form>
        <button
          onClick={onFormSubmit}
          className="w-full bg-blue-400 py-2 text-xl rounded-md mb-4 font-semibold"
        >
          Login
        </button>
        <p className="text-base">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
