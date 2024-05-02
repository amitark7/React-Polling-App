import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addPoll,
  getSinglePoll,
  updatePoll,
} from "../redux/reducer/pollListReducer";
import { validateAddEditForm } from "../utils/validationCheck";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ConfimationModal from "../component/ConfimationModal";
import ErrorComponent from "../component/ErrorComponent";
import {
  addOption,
  deleteOption,
  updateOption,
} from "../redux/reducer/optionReducer";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

const AddEditPoll = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [newPollData, setNewPollData] = useState({
    title: "",
    optionTitle: "",
  });
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({ title: "", optionTitle: "" });
  const [showModal, setShowModal] = useState(false);
  const [editOption, setEditOption] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getSinglePollAndUpdate = async () => {
    if (state) {
      setNewPollData({ ...newPollData, title: state.title });
      setOptions(state.optionList);
    } else {
      const result = await dispatch(getSinglePoll(id));
      if (result?.payload?.status === 200) {
        setNewPollData({ ...newPollData, title: result?.payload?.data?.title });
        setOptions(result?.payload?.data?.optionList);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getSinglePollAndUpdate();
    }
  }, []);

  const handleOptionChange = (e) => {
    setNewPollData({ ...newPollData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleAddOption = async () => {
    const { newErrors, isVallid } = validateAddEditForm(newPollData);
    if (isVallid) {
      setOptions([...options, { optionTitle: newPollData.optionTitle }]);
      if (id) {
        if (editOption) {
          const editedIndex = options.findIndex(
            (option) => option.id === editOption.id
          );
          const newOptions = [...options];
          newOptions[editedIndex].optionTitle = newPollData.optionTitle;
          setOptions(newOptions);
          dispatch(
            updateOption({
              id: editOption.id,
              editedOption: newPollData.optionTitle,
            })
          );
        } else {
          await dispatch(
            addOption({
              id,
              optionTitle: newPollData.optionTitle,
            })
          );
        }
      }
      setNewPollData({ ...newPollData, optionTitle: "" });
    } else {
      setErrors(newErrors);
    }
  };

  const handleDeleteOption = (index) => {
    if (id) {
      const deleteOptionId = options[index].id;
      dispatch(deleteOption(deleteOptionId));
    }
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleUpdateOption = (index) => {
    const option = options[index];
    setNewPollData({ ...newPollData, optionTitle: options[index].optionTitle });
    setEditOption(option);
  };

  const handleShowModal = (data) => {
    if (data?.payload?.status === 200) {
      setShowModal(true);
    }
  };

  const onFormSubmit = async () => {
    const newPoll = {
      title: newPollData.title,
      options,
    };
    const { newErrors, isVallid } = validateAddEditForm({
      options,
      title: newPollData.title,
    });
    if (isVallid) {
      let result = {};
      if (id) {
        if (state.title !== newPollData.title) {
          result = await dispatch(updatePoll({ id, newPoll }));
        }
        setShowModal(true);
      } else {
        result = await dispatch(addPoll(newPoll));
        handleShowModal(result);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="w-[90%]  mx-auto mt-8 p-8 bg-gray-100 rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Update" : "Create"} Poll
      </h2>
      <div>
        <div className="mb-4">
          <label htmlFor="question" className="block mb-1">
            Question
          </label>
          <input
            type="text"
            id="question"
            name="title"
            className="w-full px-4 py-2 border rounded"
            value={newPollData.title}
            onChange={handleOptionChange}
          />
          <ErrorComponent errorMessage={errors.title} />
        </div>
        <div className="form-add-option">
          <p className="add-option">Option</p>
          <div className="flex mb-3">
            <input
              id="option"
              name="optionTitle"
              className="border rounded-l-md p-2 w-full"
              value={newPollData.optionTitle}
              onChange={handleOptionChange}
              placeholder="Enter Option"
            />
            <button
              className="border-l border-gray-300 bg-blue-500 text-white p-2 rounded-r-md"
              onClick={() => handleAddOption()}
            >
              <IoIosAddCircle />
            </button>
          </div>
          <ErrorComponent errorMessage={errors.optionTitle} />
        </div>
        <div className="flex gap-2 mb-2">
          {options.map((item, index) => (
            <div
              className="flex bg-white items-center border rounded-lg p-2"
              key={index}
            >
              {item.optionTitle}
              <button
                className="ml-1"
                onClick={() => handleUpdateOption(index)}
              >
                <MdModeEditOutline />
              </button>
              <button className="" onClick={() => handleDeleteOption(index)}>
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => onFormSubmit()}
        >
          Submit
        </button>
      </div>
      {showModal && (
        <ConfimationModal
          modalTitle={"Successfully"}
          modalSubTitle={`Poll ${
            id ? "updated" : "created"
          } successfully. ok to redirect polling page`}
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
