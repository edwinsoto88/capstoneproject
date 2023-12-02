import React, { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ForgotPassword from '../pages/ForgotPassword';


const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Error Modal"
      ariaHideApp={false}
    >
      <div className="error-modal">
        <h2>Error!</h2>
        <p>{errorMessage}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};
const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Success Modal"
      ariaHideApp={false}
      style={{
        overlay: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "auto",
          maxWidth: "40%", // You can adjust the maximum width as needed
          maxHeight: "30%",
          padding: "20px",
          textAlign: "center",
          left: "30%", // Adjust this value to shift the box to the right
        },
      }}
    >
      <div className="success-modal-container">
        <div className="success-modal-content">
          <h2>Success!</h2>
          <p>
            You have successfully logged in! You will be redirected to the
            dashboard shortly.
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
};

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsSuccessModalOpen(true);
        // Optional: You can close the modal and redirect after a delay
        setTimeout(() => {
          setIsSuccessModalOpen(false);
          navigate("/");
        }, 5000); // Adjust the timing as needed
      })
      .catch((error) => {
        setIsErrorModalOpen(true);
        setErrorMessage("Error during login: " + error.message);
      });
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
  };

  return (
    <div className="wrapper">
      <h2>Login</h2>
      <form onSubmit={signIn}>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="input-box button">
          <input type="Submit" value="Login" />
        </div>
        <div className="text">
          <h3>
            Don't have an account? <Link to="/registration">Register here</Link>
          </h3>
        </div>
        <div className="text">
        <h3>
        Forgot Password? <Link to ="/forgotpassword">Reset password</Link>
       </h3>
        </div>
      </form>
      {isSuccessModalOpen && (
        <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
      )}
      {isErrorModalOpen && (
        <ErrorModal
          isOpen={isErrorModalOpen}
          onClose={closeErrorModal}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};