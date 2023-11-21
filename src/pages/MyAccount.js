import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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
            // Handle the case where the user document does not exist
            console.log("No such document!");
          }
        } catch (error) {
          // Handle errors, e.g., permission denied
          console.error("Error getting document: ", error);
        }
      } else {
        // Handle the case where no user is signed in
        console.log("No user is signed in.");
        // You might want to redirect to the login page here
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the listener when the component unmounts
    };
  }, []); // Empty dependency array ensures the effect runs once after initial render

  if (!userData) {
    // Loading state or redirect to login page if no user data is available
    return <div>Loading...</div>;
  }

  // Render your UI with userData
  return (
    <div className="wrapper"> {/* Apply wrapper class for styling */}
      <h2>My Account</h2>
      <div className="input-box">
        <p>First Name: {userData.firstname}</p>
        <p>Last Name: {userData.lastname}</p>
        <p>Email: {userData.email}</p>
        <p>Phone Number: {userData.phonenumber}</p>
        <p>Role: {userData.role}</p>
      </div>
    </div>
  );
};

export default MyAccount;