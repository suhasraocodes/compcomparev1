import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-neutral-900 p-5 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
