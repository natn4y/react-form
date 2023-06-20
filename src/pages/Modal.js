import React from 'react';

const Modal = ({ closeModal, children }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-md p-8">
        {children}
        <button
          type="button"
          className="w-full py-2 mt-4 text-white bg-black rounded-md"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
