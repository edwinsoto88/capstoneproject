import React from 'react';
import { Link } from "react-router-dom";
const Modal = ({ show, children, handleClose }) => {
    
    const css = `
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  }

`;

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
