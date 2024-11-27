// src/components/Modal.jsx

import React from "react";
import clsx from "clsx";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-s2 rounded-lg shadow-lg max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
