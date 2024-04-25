import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validationCheck";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/reducer/authReducer";

const Login = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const { error, loading } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const onFormSubmit = async () => {
    const isFormValid = validateForm(userData, true);
    if (isFormValid.isValid) {
      const result = await dispatch(loginUser(userData));
      if (result.payload.status === 200) {
        navigate("/polling");
      } else if (result.payload?.status === 401) {
        setErrors({ ...errors, password: "Password is incorrect" });
      } else {
        setErrors({ ...errors, email: "User data not found" });
      }
    } else {
      setErrors(isFormValid.errors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="border bg-white w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[25%] py-10 px-5 text-center rounded-lg mx-auto mt-20 shadow-lg">
        <h1 className="text-3xl font-semibold">Login</h1>
        <form className="flex flex-col my-6 text-black text-left">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            className={`w-full rounded-md py-3 pl-2 outline-none border-2 mt-4 ${
              errors.email ? "border-red-500" : ""
            }`}
            value={userData.email}
            onChange={(e) => formOnChange(e)}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full rounded-md py-3 pl-2 outline-none border-2 mt-4 ${
              errors.password ? "border-red-500" : ""
            }`}
            value={userData.password}
            onChange={(e) => formOnChange(e)}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </form>
        <button
          onClick={onFormSubmit}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-400" : "bg-blue-500"
          } py-2 text-xl rounded-md mb-4 font-semibold`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <p className="text-base">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
