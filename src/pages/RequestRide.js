import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import { collection, query, onSnapshot, addDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase"; // Import Firebase authentication and database



export const RequestRide = () => {
const css = `
  .footer-section-child {
    position: relative;
    top: 0;
    width: 1612px;
    left: -100px;
    background-color: #333;
    height: 64px;
  }
  .unt-rides {
    position: absolute;
    top: 20px;
    left: 539px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 151px;
    height: 24px;
    color: white;
  }
  .background-image-icon,
  .footer-section {
    position: absolute;
    top: 1016px;
    left: 0;
    width: 1512px;
    height: 64px;
  }
  .dashboard-box {
    position: absolute;
    top: 149px;
    left: 127px;
    width: 1257px;
    height: 717px;
    text-align: left;
    font-size: 18px;
  }
  .background-image-icon {
    background-image: url("/Images/backgroundImage.png");
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 64px;
    height: 113%;
    object-fit: cover;
    opacity: 0.9;
  }
  .dashboard-user-interaction {
    position: absolute;
    top: 1.09px;
    left: 0;
    border-radius: 10px;
    background-color: #e2e2e2;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid #000;
    box-sizing: border-box;
    width: 1257px;
    height: 780.91px;
  }
  .mini-nav-border {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px 10px 0 0;
    background-color: #333;
    width: 1257px;
    height: 95.09px;
  }
  .available-rides,
  .create-ride-offer,
  .my-rides {
    position: absolute;
    top: 45px;
    left: 802px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 137px;
    height: 47px;
    background: transparent;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    white-space: nowrap;
  }
  
  .create-ride-offer {
    position: absolute;
    top: 45px;
    left: 945px; /* Adjusted the left property */
    width: 162px;
    height: 47px;
  }
  
  .my-rides {
    position: absolute;
    top: 45px;
    left: 1088px; /* Adjusted the left property */
    width: 140px;
    height: 47px;
  }
  
  .search-bar-child {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    background-color: #d9d9d9;
    width: 250.77px;
    height: 37.16px;
  }
  .search-rides {
    position: absolute;
    top: -5.0px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 250.14px;
    height: 30.88px;
    background-color: transparent;
  }
  .search-bar {
    position: absolute;
    top: 29.51px;
    left: 29.63px;
    width: 250.77px;
    height: 37.16px;
    text-align: center;
    font-size: 16px;
    color: #7e7e7e;
  }
  .dashboard-border {
    position: absolute;
    top: 0;
    left: 0;
    width: 1257px;
    height: 717px;
  }
  .form-fields-create-ride-offe-child,
  .form-fields-create-ride-offe-item {
    position: absolute;
    top: 2.17px;
    left: 1.08px;
    background-color: #fff;
    border: 1px solid #000;
    box-sizing: border-box;
    width: 525.92px;
    height: 57.48px;
  }
  .form-fields-create-ride-offe-item {
    top: 87.84px;
  }
  .form-fields-create-ride-offe-child1,
  .form-fields-create-ride-offe-child2,
  .form-fields-create-ride-offe-inner,
  .rectangle-div {
    position: absolute;
    top: 173.51px;
    left: 0;
    background-color: #fff;
    border: 1px solid #000;
    box-sizing: border-box;
    width: 525.92px;
    height: 57.48px;
  }
  .form-fields-create-ride-offe-child1,
  .form-fields-create-ride-offe-child2,
  .rectangle-div {
    top: 259.18px;
  }
  .form-fields-create-ride-offe-child1,
  .form-fields-create-ride-offe-child2 {
    top: 344.85px;
    left: 1.08px;
  }
  .form-fields-create-ride-offe-child2 {
    top: 530px;
    left: 170.28px;
    border-radius: 10px;
    background-color: #00853e;
    width: 186.44px;
  }
  .available-seats,
.date,
.destination,
.name,
.terminal,
.time {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.available-seats {
  top: 253px; /* New position */
  left: 2px;
  width: 523px;
  height: 54.7px;
}

.date {
  top: 338px; /* New position */
  left: 2px;
  width: 261.5px;
  height: 54.7px;
}

.time{
  top: 338px; /* New position */
  left: 264.7px;
  width: 261.5px;
  height: 54.7px;
}

.destination,
.name,
.terminal {
  top: 167.43px;
  left: 1.08px;
  width: 523px;
  height: 54.5px;
}

.name,
.terminal {
  top: 82px;
  left: 2px;
  width: 523px;
  height: 53.8px;
}

.name {
  top: -5px; /* Adjust the value to move it up or down */
  left: 2.36px;
  width: 523px;
  height: 54.64px;
}

.terminal {
  /* Add specific styles for .terminal if needed */
}


  
  /* Styles for the request type dropdown */


  .request-type {
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 16px;
    top: 0px;
  }
  
  .dropdown-container {
    position: relative;
    display: inline-block;
    top: 432px;
    left: 0px;
  }
  
  .dropdown-content {
    width: 528px;
    height: 55px;
    padding: 5px;
    border: 1px solid #000; /* Black border */
    border-radius: 0px;
    background-color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center; /* Center vertically */
    justify-content: space-between; /* Center horizontally and create space around content */
    text-align: center; /* Center text */
  }
  
  /* Styles for the dropdown arrow */
  .dropdown-container::after {
    content: "\f120"; /* Unicode for down arrow icon */
    font-family: FontAwesome;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none;
  }
  
  

  .form-fields-create-ride-offe {
    position: absolute;
    top: 147px;
    left: 365px;
    width: 527px;
    height: 550px;
    font-size: 16px;
    color: #9c9b9b;
  }
  
  .submit-ride-offer {
    z-index: 1;
    position: absolute;
    top: 532px;
    left: 173px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 181px;
    height: 55px;
    background-color: transparent;
  }
  .input-field {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s;
  }
  
  .input-field:hover,
  .input-field:focus {
    border-color: #007bff;
  }
  
  `;
  const [rideRequestData, setRideRequestData] = useState({
    name: "",
    terminal: "",
    destination: "",
    availableSeats: "",
    date: "",
    time: "",         // Added time field
    requestType: "Ride Offer",
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if the user is authenticated
    const user = auth.currentUser;
  
    if (!user) {
      // User is not authenticated, handle accordingly (e.g., redirect to login page)
      return; // Return early to prevent further execution
    }
  
    // Get the UID of the authenticated user
    const uid = user.uid;
  
    const rideRequestsRef = collection(db, 'users', uid, 'rideRequests');
    const q = query(rideRequestsRef);
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requestsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRideRequestData(requestsData);
    });
  
    return () => {
      unsubscribe();
    };
  }, []);
  
  const handleRequestTypeChange = (event) => {
    const selectedOption = event.target.value;
    const type = selectedOption === "driver" ? "Ride Offer" : "Ride Request";
    setRideRequestData({ ...rideRequestData, requestType: type });
  };
  

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submitting:", rideRequestData); // Debugging line

  const inputDate = new Date(rideRequestData.date);

  if (!isDateWithinRange(inputDate)) {
    alert('Date must be within the next 3 days.');
    return;
  }
  // Check if the user is authenticated
  const user = auth.currentUser;

  if (!user) {
    // User is not authenticated, handle accordingly (e.g., redirect to login page)
    setMessage("User is not authenticated. Please log in."); // Set the error message
    return; // Return early to prevent further execution
  }

  // Get the UID of the authenticated user
  const uid = user.uid;

  // Create a reference to the user's document in Firestore
  const userDocRef = doc(db, "users", uid);

  // Save the ride request data to the user's document
  try {
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      // If the user document exists, add the ride request data to the subcollection
      const rideRequestsRef = collection(userDocRef, "rideRequests");

      await addDoc(rideRequestsRef, {
        name: rideRequestData.name,
        terminal: rideRequestData.terminal,
        destination: rideRequestData.destination,
        availableSeats: rideRequestData.availableSeats,
        date: rideRequestData.date,
        time: rideRequestData.time,
        requestType: rideRequestData.requestType,
      });

      console.log("Ride request saved successfully!");

      // Alert the user that the ride has been created
      alert("Ride has been created successfully!");

      // Reset the ride request form or perform any other desired actions
      setRideRequestData({
        name: "",
        terminal: "",
        destination: "",
        availableSeats: "",
        date: "",
        time: "",         // Added time field
        requestType: "",
      });
    } else {
      console.error("User document does not exist.");
      setMessage("Error creating ride. Please try again."); // Set the error message
    }
  } catch (error) {
    console.error("Error adding ride request: ", error);
    setMessage("An error occurred while creating the ride. Please try again later."); // Set the error message
  }
};

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRideRequestData({ ...rideRequestData, [name]: value });
  };


  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };
  
  const isDateWithinRange = (inputDate) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 3);
  
    return inputDate >= today && inputDate <= maxDate;
  };
  
  const formatInputDate = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    const chars = numbers.split('');
    return chars.reduce((acc, curr, idx) => {
      if (idx === 2 || idx === 4) {
        return `${acc}/${curr}`;
      }
      return acc + curr;
    }, '');
  };
  
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const formattedDate = formatInputDate(value);
    setRideRequestData({ ...rideRequestData, [name]: formattedDate });
  };


  return (
    <div className="mask-group">
      <style>{css}</style>
      <img
          className="background-image-icon"
          alt=""
        />
      <div className="dashboard-create-ride-offer">
        <div className="footer-section">
          <div className="footer-section-child" />
          <b className="unt-rides">© 2023 UNT Rides</b>
        </div>
        <div className="dashboard-box">
          <div className="dashboard-border">
            <div className="dashboard-user-interaction" />
            <div className="mini-nav-border" />
            <Link to="/AvailableRides">
              <button className="available-rides">Available Rides</button>
            </Link>
            <Link to="/RequestRide">
              <button className="create-ride-offer">Create Ride Offer</button>
            </Link>
            <Link to="/MyRides">
              <button className="my-rides">My Rides</button>
            </Link>
            <div className="search-bar">
              <div className="search-bar-child" />
              <input type="text" className="search-rides" placeholder="Search Rides" />
            </div>
          </div>
          <div className="form-fields-create-ride-offe">
            <div className="form-fields-create-ride-offe-child" />
            <div className="form-fields-create-ride-offe-item" />
            <div className="form-fields-create-ride-offe-inner" />
            <div className="rectangle-div" />
            <div className="form-fields-create-ride-offe-child1" />
            <div className="form-fields-create-ride-offe-child2" />
        <form onSubmit={handleSubmit}>  
        <div className="form-fields">
          <input
            type="text"
            className="name"
            name="name"
            placeholder="Name"
            value={rideRequestData.name}
            onChange={handleInputChange}
            required // Make the field compulsory
            pattern="[A-Za-z\s]+" // Allow alphabets and spaces
          />
          <input
            type="text"
            className="terminal"
            name="terminal"
            placeholder="Terminal"
            value={rideRequestData.terminal}
            onChange={handleInputChange}
            required // Make the field compulsory
            pattern="[A-Za-z0-9\s\W]+" // Allow letters, numbers, spaces, and symbols
          />
          <input
            type="text"
            className="destination"
            name="destination"
            placeholder="Destination"
            value={rideRequestData.destination}
            onChange={handleInputChange}
            required // Make the field compulsory
            pattern="[A-Za-z0-9\s\W]+" // Allow letters, numbers, spaces, and symbols
          />
          <input
            type="number" // Use type="number" to enforce numbers
            className="available-seats"
            name="availableSeats"
            value={rideRequestData.availableSeats}
            onChange={handleInputChange}
            placeholder="Available Seats"
            required // Make the field compulsory
            min="0" // Set a minimum value (0)
            max="7" // Set a maximum value (7)
          />
          <input
            type="text"
            className="date"
            name="date"
            value={rideRequestData.date}
            onChange={handleDateChange}
            placeholder="MM/DD/YYYY"
            required
            pattern="\d{2}/\d{2}/\d{4}"
            maxLength="10"
          />
          <input
            type="time" // Specify the type as 'time'
            className="time"
            name="time"
            value={rideRequestData.time} // Bind the value to your state
            placeholder="Time for Ride"
            onChange={handleInputChange} // Use the same change handler
            required // Make the field compulsory
          />
          <li className="request-type">
          <div className="dropdown-container">
          <select
            className="dropdown-content"
            name="requestType"
            value={rideRequestData.requestType} // Directly use requestType for the value
            onChange={handleInputChange}
          >
            <option value="Ride Offer">Post as a Driver</option>
            <option value="Ride Request">Post as a Passenger</option>
          </select>
          </div>
          </li>
          <button className="submit-ride-offer" type="submit"> Submit Ride Offer </button>
          {/* Display the message */}
          {message && (
                <div className="message">
                  {message}
                </div>
              )}
          </div>
        </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RequestRide;
