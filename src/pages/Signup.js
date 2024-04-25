import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/reducer/authReducer";
import { getRoleList } from "../redux/reducer/rollListFetchReducer";
import { BiHide, BiShow } from "react-icons/bi";
import ConfimationModal from "../component/ConfimationModal";
import { validateForm } from "../utils/validationCheck";
import ErrorComponent from "../component/ErrorComponent";

const Signup = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const { roleList } = useSelector((state) => state.roleList);
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

  const onFormChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleNavigate = () => {
    navigate("/");
    setShowModal(false);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm(userData);
    if (isFormValid.isValid) {
      const result = await dispatch(signupUser(userData));
      if (result.payload) {
        setShowModal(true);
      } else {
        setErrors({ ...errors, email: "Email already registered" });
      }
    } else {
      setErrors(isFormValid.errors);
    }
  };

  useEffect(() => {
    dispatch(getRoleList());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {showModal && (
        <ConfimationModal
          modalTitle={"Successfully"}
          modalSubTitle={
            "User signup Succesfully! Click Ok to Redirect Login Page."
          }
          btnOkText={"Ok"}
          onBtnOkClick={handleNavigate}
        />
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
            onChange={(e) => onFormChange(e)}
          />
          <ErrorComponent errorMessage={errors.firstName} />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
              errors.lastName ? "border-red-700" : ""
            }`}
            value={userData.lastName}
            onChange={(e) => onFormChange(e)}
          />
          <ErrorComponent errorMessage={errors.lastname} />
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
              errors.email ? "border-red-700" : ""
            }`}
            value={userData.email}
            onChange={(e) => onFormChange(e)}
          />
          <ErrorComponent errorMessage={errors.email} />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
                errors.password ? "border-red-700" : ""
              }`}
              value={userData.password}
              onChange={(e) => onFormChange(e)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </button>
          </div>
          <ErrorComponent errorMessage={errors.password} />
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
                errors.confirmPassword ? "border-red-700" : ""
              }`}
              value={userData.confirmPassword}
              onChange={(e) => onFormChange(e)}
            />
            <button
              type="button"
              className="absolute inset-y-0 top-1 right-0 flex items-center px-3 text-gray-600 focus:outline-none"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <BiHide /> : <BiShow />}
            </button>
          </div>
          <ErrorComponent errorMessage={errors.confirmPassword} />
          <select
            name="roleId"
            id="roleId"
            className={`w-full rounded-md py-2 sm:py-3 pl-2 outline-none border-2 mt-3 ${
              errors.role ? "border-red-700" : ""
            }`}
            onChange={onFormChange}
            value={userData.role}
          >
            <option value="">Select Role</option>
            {roleList?.map((role, index) => {
              return (
                <option key={index} value={`${role.id}`}>
                  {role.name}
                </option>
              );
            })}
          </select>
          <ErrorComponent errorMessage={errors.roleId} />
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
