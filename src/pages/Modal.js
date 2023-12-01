import React from 'react';
import { Link } from "react-router-dom";

const Modal = ({ show, children, handleClose }) => {
  const css = `
    .modal {
      /* existing styles */
    }

    .modal-content {
      position: relative; /* Add this line */
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    }

    .close-button {
      position: absolute;
      top: 5px;
      right: 40px;
      border: none;
      background: none;
      cursor: pointer;
      background-color: green;
      padding: 6px;
      border-radius: 10px;
    }
  `;

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <style>{css}</style>
      <div className="modal-content">
        {children}
        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
