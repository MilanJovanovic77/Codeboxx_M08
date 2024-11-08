import React from "react";

const ConfirmationModal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3 text-center">
        <h2 className="text-lg font-semibold mb-4">Confirm Action</h2>
        <p className="mb-6">{message || "Are you sure you want to proceed?"}</p>
        <button
          onClick={onConfirm}
          className="bg-green-500 text-white px-4 py-2 rounded mr-4"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
