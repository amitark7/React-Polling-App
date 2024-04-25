import React from "react";

const ConfimationModal = ({
  modalTitle,
  modalSubTitle,
  btnOkText,
  btnCancelText,
  onBtnOkClick,
  onBtnCancleClick,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-10">
      <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto flex flex-col items-center">
        <div className="modal-content py-6 text-left px-4">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold mb-3">{modalTitle}</p>
          </div>
          <p className="mb-3">{modalSubTitle}</p>
          <div className="mt-7 flex gap-4 justify-end">
            {btnCancelText && (
              <button
                onClick={onBtnCancleClick}
                className="px-4 py-2 text-gray-800 rounded-md border hover:bg-gray-400"
              >
                {btnCancelText}
              </button>
            )}
            <button
              onClick={onBtnOkClick}
              className="px-4 py-2 text-gray-800 rounded-md bg-green-300 hover:bg-green-400"
            >
              {btnOkText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfimationModal;
