import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendResetEmail = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsResetEmailSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="wrapper">
      <h2>Forgot Password</h2>
      {!isResetEmailSent ? (
        <form onSubmit={sendResetEmail}>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="input-box button">
            <input type="submit" value="Reset Password" />
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      ) : (
        <p>
          Password reset email sent! Please check your email for instructions or{" "}
          <Link to="/login">go back to login</Link>.
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;

