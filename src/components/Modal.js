// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

export default Modal;
