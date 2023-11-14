import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase"; // Import your Firebase configuration

export const RideHistory = () => {

  const css = `

  .footer-section-child {
    position: absolute;
    top: 0;
    left: -126px;
    background-color: #333;
    width: 1512px;
    height: 64px;
  }
  .mask-group {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    text-align: center;
    font-size: 16px;
    color: #fff;
    top: 100px;
    left: -630px;
    font-family: Inter;
  }
  
  .dashboard-create-ride-offer{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    text-align: center;
    font-size: 16px;
    color: #000; /* You can change the color according to your design */
    font-family: Inter;
    left: 50%;
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
  .background-image-icon {
    background-image: url("/Images/backgroundImage.png");
    background-size: cover;
    background-position: center;
    position: absolute;
    top: -100px;
    left: -126px;
    height: 1116px;
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
    height: 715.91px;
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
  .rectangle-parent {
    position: absolute;
    top: 95px;
    left: 1.1px;
    width: 1256px;
    height: 63.1px;
    font-size: var(--font-size-xl);
    color: var(--color-black);
    background: grey;
  }
  .group-child {
    position: absolute;
    top: 3px;
    left: 0;
    background-color: var(--color-lightgray);
    width: 1256px;
    height: 63.1px;
  }
  .name,
.terminal,
.destination,
.departure,
.seats,
.time {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 7px;
  width: 128px;
  height: 52px;
}

/* Adjust the 'left' property for each class */
.name { left: 0; } /* Starting from the very left */

.terminal { left: calc(0px + 1 * (128px + 98px)); } /* One element width plus space */

.destination { left: calc(0px + 2 * (128px + 98px)); } /* Two elements width plus space */

.seats { left: calc(0px + 3 * (128px + 98px)); } /* Four elements width plus space */

.departure { left: calc(0px + 4 * (128px + 98px)); } /* Three elements width plus space */

.time { left: calc(0px + 5 * (128px + 98px)); } /* Five elements width plus space */

  
  
  .rectangles {
    top: 147px;
    left: 1.9px;
    height: 509px;
  }

  .dashboard-box {
    text-align: center;
    font-size: 16px;
    color: #fff;
    font-family: Inter;
    left: 0px;
    top: 40px;
  }
  
  /* css for frame */
  .myrides-box {
    flex: 1;
    padding: 0px;
    position: absolute;
    left: 0;
    top: 158px; /* Adjust the top value to move the frame lower */
    border-radius: 0px; /* Sharp edges */
    background-color: white;
    box-sizing: border-box;
    width: 1257px;
    height: 680px;
  }

.scroll-frame {
  width: 100%;
  height: 685px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

.data-box {
    width: 100%;
    height: 50px;
    border: 1px solid #000;
    margin-bottom: 10px;
    background-color: #333; /* Background color for better contrast */
    color: white; /* Text color */
    position: relative;
    display: flex;
    padding: 0 10px; /* Adding padding for some space around edges */
  }
  
  .data-set {
    display: flex;
    flex-direction: row; /* Arrange data items horizontally */
    align-items: center;
    justify-content: space-between;
    width: 100%; /* Expand to fill the available width */
  }
  
  .data-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 5px; /* Adjust margin for spacing */
  }
  
  /* Assigning specific flex-grow values */
  .data-item.name { flex-grow: 2; } /* More space for name */
  .data-item.terminal { flex-grow: 1; }
  .data-item.destination { flex-grow: 1; }
  .data-item.available-seats { flex-grow: 1; }
  .data-item.departure-time { left: calc(0px + 5 * (128px + 98px)); } /* More space for date and time */
  
  .label {
    font-weight: bold;
  }
  
  .value {
    margin-top: 5px;
  }
  
  /* Optional: Add hover effect to the rectangles */
  .data-box:hover {
    background-color: #555; /* Darker background color on hover */
  }
  `;
  
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const rideRequestsRef = collection(db, 'users', uid, 'rideRequests');
        const rideRequestsQuery = query(rideRequestsRef);
        const snapshot = await getDocs(rideRequestsQuery);
        const requestsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRideRequests(requestsData);
      }
    };

    fetchData();
  }, []);

  const createRectangles = () => {
    return rideRequests.map((request) => {
      return (
        <div className="data-box" key={request.id}>
          <div className="data-set">
            <div className="data-item name">
              <div className="label"></div>
              <div className="value">{request.name}</div>
            </div>
            <div className="data-item terminal">
              <div className="label"></div>
              <div className="value">{request.terminal}</div>
            </div>
            <div className="data-item destination">
              <div className="label"></div>
              <div className="value">{request.destination}</div>
            </div>
            <div className="data-item departure-time">
              <div className="label"></div>
              <div className="value">{request.date}</div>
            </div>
            <div className="data-item available-seats">
              <div className="label"></div>
              <div className="value">{request.availableSeats}</div>
            </div>
          </div>
        </div>
      );
    });
  };


  return (
    <div className="mask-group">
      <style>{css}</style>
      <img className="background-image-icon" alt="" />
      <div className="dashboard-create-ride-offer">
        <div className="footer-section">
          <div className="footer-section-child"></div>
          <b className="unt-rides">© 2023 UNT Rides</b>
        </div>
        <div className="dashboard-box">
          <div className="dashboard-border">
            <div className="dashboard-user-interaction"></div>
            <div className="mini-nav-border"></div>
            <div className="search-bar">
              <div className="search-bar-child"></div>
              <input type="text" className="search-rides" placeholder="Search Rides" />
            </div>
            <div className="rectangle-parent">
              <div className="group-child"></div>
              <b className="name">Name</b>
              <b className="terminal">Terminal</b>
              <b className="destination">Destination</b>
              <b className="seats">Seats</b>
              <b className="departure">Date</b>
              <b className="time">Time</b>
            </div>
            <div className="myrides-box">
              <div className="scroll-frame">
                <div className="data-container" id="data-container">
                  {createRectangles()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };
  

export default RideHistory;
