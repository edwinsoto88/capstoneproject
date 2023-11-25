import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider, updateEmail, sendEmailVerification } from "firebase/auth";

export const MyAccount = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, "users", userId);

        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error getting document: ", error);
        }
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const reauthenticate = async (password) => {
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is signed in.");
      return;
    }

    const credentials = EmailAuthProvider.credential(user.email, password);
    try {
      await reauthenticateWithCredential(user, credentials);
    } catch (error) {
      console.error("Error reauthenticating: ", error);
      // Handle re-authentication error here
      if (error.code === 'auth/wrong-password') {
        console.log('Invalid reauthentication: Wrong password entered.');
      }
      throw error; // Propagate the error for proper handling in the calling function
    }
  };

  const isEmailVerified = (user) => {
    try {
      return user && user.emailVerified;
    } catch (error) {
      console.error('Error fetching email verification status:', error);
      return false;
    }
  };

  const handleResetEmail = async () => {
    try {
      const password = prompt("Please enter your password to reset your email:");
      if (!password) {
        console.error("Password is required.");
        return;
      }
    
      await reauthenticate(password);
    
      const newEmail = prompt("Enter your new email:");
      if (newEmail) {
        const user = auth.currentUser;
        const emailVerified = isEmailVerified(user);
    
        if (emailVerified) {
          try {
            await updateEmail(user, newEmail);
            console.log("Email updated successfully.");
            await sendEmailVerification(user);
            alert("A verification email has been sent to the new email address.");
          } catch (error) {
            console.error("Error updating email or sending verification: ", error);
            // Handle error here
            throw error; // Propagate the error for proper handling in calling function
          }
        } else {
          alert("Please verify your new email address before updating.");
        }
      }
    } catch (error) {
      console.error("Error handling:", error);
      // Handle prompt error or reauthentication error here
    }
  };

  const handleResetPhoneNumber = async () => {
    // Logic for resetting phone number
    // Add your implementation here
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wrapper">
      <h2>My Account</h2>
      <div className="input-box">
        <p>First Name: {userData.firstname}</p>
        <p>Last Name: {userData.lastname}</p>
        <p>Email: {userData.email}</p>
        <p>Phone Number: {userData.phonenumber}</p>
        <p>Role: {userData.role}</p>
        <button onClick={handleResetEmail}>Reset Email</button>
        <button onClick={handleResetPhoneNumber}>Reset Phone Number</button>
      </div>
    </div>
  );
};

export default MyAccount;
