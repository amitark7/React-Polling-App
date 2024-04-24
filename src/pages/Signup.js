import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ValidateForm } from "../utils/ValidationCheck";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/reducer/authReducer";
import { roleFetch } from "../redux/reducer/rollFetchReducer";
import { BiHide, BiShow } from "react-icons/bi";

const Signup = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { role } = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    roleId: "",
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNavigate = () => {
    navigate("/");
    setShowModal(false);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = ValidateForm(userData);
    if (isFormValid.isValid) {
      const result = await dispatch(signupUser(userData));
      if (result.payload?.ok) {
        setShowModal(true);
      } else {
        setErrors({ ...errors, email: "Email already registered" });
      }
    } else {
      setErrors(isFormValid.errors);
    }
  };

  useEffect(() => {
    dispatch(roleFetch());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center z-10">
          <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-50"></div>
          <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto flex flex-col items-center">
            <div className="modal-content py-6 text-left px-4">
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold mb-3">Successfully !</p>
              </div>
              <p className="mb-3">
                User signup Succesfully! Click Ok to Redirect Login Page.
              </p>
              <div className="mt-7 flex justify-end">
                <button
                  onClick={handleNavigate}
                  className="px-4 py-2 text-gray-800 rounded-md bg-green-300 hover:bg-green-400"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="border bg-white w-[90%] sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[25%] py-4 md:py-4 px-5 text-center rounded-lg mx-auto mt-6 xl:mt-10 shadow-lg">
        <h1 className="text-3xl font-semibold">Signup</h1>
        <form className="flex flex-col my-6 text-black text-left">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-2 ${
              errors.firstName ? "border-red-700" : ""
            }`}
            value={userData.firstName}
            onChange={(e) => formOnChange(e)}
          />
          {errors.firstName && (
            <p className="text-red-700 text-xs">{errors.firstName}</p>
          )}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
              errors.lastName ? "border-red-700" : ""
            }`}
            value={userData.lastName}
            onChange={(e) => formOnChange(e)}
          />
          {errors.lastName && (
            <p className="text-red-700 text-xs">{errors.lastName}</p>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
              errors.email ? "border-red-700" : ""
            }`}
            value={userData.email}
            onChange={(e) => formOnChange(e)}
          />
          {errors.email && (
            <p className="text-red-700 text-xs">{errors.email}</p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
                errors.password ? "border-red-700" : ""
              }`}
              value={userData.password}
              onChange={(e) => formOnChange(e)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-700 text-xs">{errors.password}</p>
          )}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
                errors.confirmPassword ? "border-red-700" : ""
              }`}
              value={userData.confirmPassword}
              onChange={(e) => formOnChange(e)}
            />
            <button
              type="button"
              className="absolute inset-y-0 top-1 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <BiHide /> : <BiShow />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-700 text-xs">{errors.confirmPassword}</p>
          )}
          <select
            name="roleId"
            id="roleId"
            className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
              errors.role ? "border-red-700" : ""
            }`}
            onChange={formOnChange}
            value={userData.role}
          >
            <option value="">Select Role</option>
            {role?.map((role, index) => {
              return (
                <option key={index} value={`${role.id}`}>
                  {role.name}
                </option>
              );
            })}
          </select>
          {errors.roleId && (
            <p className="text-red-700 text-xs">{errors.roleId}</p>
          )}
        </form>
        <button
          onClick={onFormSubmit}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-400" : "bg-blue-500"
          } py-2 text-xl rounded-md mb-4 font-semibold`}
        >
          {loading ? "Loading..." : "Signup"}
        </button>
        <p className="text-base">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
