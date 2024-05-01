import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addPoll,
  getSinglePoll,
  updatePoll,
  updatePollOption,
} from "../redux/reducer/pollListReducer";
import { validateAddEditForm } from "../utils/validationCheck";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfimationModal from "../component/ConfimationModal";

const AddEditPoll = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([{ optionTitle: "" }]);
  const [errors, setErrors] = useState({ question: "", options: [] });
  const [showModal, setShowModal] = useState(false);
  const [optionsChanged, setOptionsChanged] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSinglePollAndUpdate = async () => {
    if (state) {
      setTitle(state.title);
      setOptions(state.optionList);
    } else {
      const result = await dispatch(getSinglePoll(id));
      if (result?.payload?.status === 200) {
        setTitle(result?.payload?.data?.title);
        setOptions(result?.payload?.data?.optionList);
      }
    }
  };

  useEffect(() => {
    getSinglePollAndUpdate();
  }, []);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].optionTitle = value;
    setOptions(newOptions);
    setErrors((prevErrors) => ({
      ...prevErrors,
      options: prevErrors.options.map((error, i) => (i === index ? "" : error)),
    }));
  };

  const handleAddOption = () => {
    setOptions([...options, { optionTitle: "" }]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      options: [...prevErrors.options, ""],
    }));
    setOptionsChanged(true);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
    setErrors((prevErrors) => ({
      ...prevErrors,
      options: prevErrors.options.filter((option, i) => i !== index),
    }));
    setOptionsChanged(false);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const newPoll = {
      title,
      options,
    };
    const { newErrors, isVallid } = validateAddEditForm(newPoll);
    if (isVallid) {
      let result = {};
      if (optionsChanged) {
        result = await dispatch(
          updatePollOption({
            id,
            optionTitle: options[options.length - 1],
          })
        );
      } else if (id) {
        result = await dispatch(updatePoll({ id, newPoll }));
      } else {
        result = await dispatch(addPoll(newPoll));
      }
      if (result?.payload?.status === 200) {
        setShowModal(true);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-[90%] max-w-md  mx-auto mt-8 p-8 bg-gray-100 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Update" : "Create"} Poll
      </h2>
      <form onSubmit={onFormSubmit}>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">
            Question
          </label>
          <input
            type="text"
            id="question"
            className="w-full px-4 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.question && (
            <p className="text-red-500 text-sm">{errors.question}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1">Options</label>
          {options.map((option, index) => (
            <div key={index} className="mb-2">
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded mr-2"
                  value={option.optionTitle}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveOption(index)}
                >
                  Remove
                </button>
              </div>
              {errors.options[index] && (
                <p className="text-red-500 text-sm ml-2 mb-2">
                  {errors.options[index]}
                </p>
              )}
            </div>
          ))}
          <button
            type="button"
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={handleAddOption}
          >
            Add Option
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
      {showModal && (
        <ConfimationModal
          modalTitle={"Successfully"}
          modalSubTitle={`Poll ${
            id ? "updated" : "created"
          } Successfully. ok to redirect polling page`}
          btnOkText={"Ok"}
          onBtnOkClick={() => {
            navigate("/polling");
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AddEditPoll;
