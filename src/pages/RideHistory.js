import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase"; // Import your Firebase configuration
import backgroundImg from "../Assets/backgroundImage.png";

export const RideHistory = () => {

  const css = `
  .mask-group {
    position: relative;
    width: 100%;
    height: 1080px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    font-family: Inter;
  }

  .dashboard-box {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1257px;
    height: 717px;
    text-align: left;
    font-size: 18px;
    padding-bottom: 25px;
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

  .dashboard-create-ride-offer {
   display: flex;
   flex-direction: column;
   align-items: center;
   min-height: 100vh;
  }

  .background-image-icon {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("./Assets/backgroundImage.png");
    background-size: cover;
    background-position: center;
    opacity: 0.9;
    z-index: -1;
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

  .terminal, .destination, .available-seats, .requestType, .date, .time, .price {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    z-index: 2;
    top: 5px;
    color: white;
  }

  .requestType { 
    left: 90px; 
    width: 150px; 
  }
  
  .terminal { 
    left: 275px; 
    width: 150px; /* More space for terminal */
  }
  
  .destination { 
    left: 470px; 
    width: 150px; /* More space for destination */
  }
  
  .available-seats { 
    left: 655px; 
    width: 100px; 
  }
  
  .date { 
    left: 790px; 
    width: 100px; 
  }
  
  .time { 
    left: 960px; 
    width: 100px; 
  }
  .price{
    left : 1100px;
    width: 100px;
  }
  
  .rectangles {
    top: 147px;
    left: 1.9px;
    height: 509px;
  }

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
    height: 90px;
    border: 1px solid #000;
    margin-bottom: 3px;
    background-color: #333; /* Background color for better contrast */
    color: white; /* Text color */
    position: relative;
    align-items: flex-start; /* Center vertically */
    justify-content: center;
  }

  .data-set {
    display: flex;
    flex-direction: row; /* Arrange data items horizontally */
    flex-wrap: nowrap; /* Prevent wrapping to the next line */
    align-items: center;
    justify-content: space-between;
    width: 100%; /* Expand to fill the available width */
  }

  .data-item {
    margin: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    transform: translateY(-10px); 
  }

  .label {
    font-weight: bold;
  }

  .value {
    margin-top: 5px;
  }

  .data-box:hover {
    background-color: none;
    box-shadow: 0px 10px 20px 5px rgba(156, 100, 89, 0.8);
  }
  
  /* Assigning specific flex-grow values */
  .data-item.name { flex-grow: 2; } /* More space for name */
  .data-item.terminal { flex-grow: 1; }
  .data-item.destination { flex-grow: 1; }
  .data-item.available-seats { flex-grow: 1; }
  .data-item.departure-time { left: calc(0px + 5 * (128px + 98px)); } /* More space for date and time */

  .footer-section {
    position: absolute;
    top: 1016px;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background-color: #333;
  }

  .footer-section-child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .unt-rides {
    color: white;
  }
  
  `;
  
  const [rideRequests, setRideRequests] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRideForMap, setSelectedRideForMap] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewMap = (ride) => {
    setSelectedRideForMap(ride);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRideForMap(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
  
        // Fetch ride requests for the current user
        const userRideRequestsRef = collection(db, "users", uid, "rideRequests");
        const userPostedRidesQuery = query(userRideRequestsRef);
        const userPostedRidesSnapshot = await getDocs(userPostedRidesQuery);
        const userPostedRidesData = userPostedRidesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        // Fetch accepted rides for the current user
        const userAcceptedRidesRef = collection(db, "users", uid, "AcceptedRides");
        const userAcceptedRidesSnapshot = await getDocs(userAcceptedRidesRef);
        const userAcceptedRidesData = userAcceptedRidesSnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
            requestType: "Accepted" // Set requestType to "Accepted" for accepted rides
          })
        );
  
        // Combine both ride requests and accepted rides
        const combinedRides = [
          ...userPostedRidesData,
          ...userAcceptedRidesData,
        ];
        setRideRequests(combinedRides);
      }
    };
  
    fetchData();
  }, []);

  const createRectangles = () => {
    return rideRequests
    .filter((request) => {
      // Filter logic: return true for items that match the search query
      return Object.values(request).some((value) =>
      value != null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    .map((request) => {
      return (
        <div className="data-box" key={request.id}>
          <div className="data-set">
          <div className="data-item requestType">
            <div className="label"></div>
            <div className="value">{request.requestType}</div>
          </div>
          <div className="data-item terminal">
            <div className="label"></div>
            <div className="value">{request.terminal}</div>
          </div>
          <div className="data-item destination">
            <div className="label"></div>
            <div className="value">{request.destination}</div>
          </div>
          <div className="data-item available-seats">
            <div className="label"></div>
            <div className="value">{request.availableSeats}</div>
          </div>
          <div className="data-item date">
            <div className="label"></div>
            <div className="value">{request.date}</div>
          </div>
          <div className="data-item time">
            <div className="label"></div>
            <div className="value">{request.time}</div>
          </div>
          <div className="data-item price">
              <div className="label"></div>
              <div className="value">
                {request.price ? `$${request.price}` : "N/A"}
              </div>
          </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mask-group">
      <style>{css}</style>
      <img className="background-image-icon" alt="" style={{backgroundImage:`url(${backgroundImg})`}}/>
      <div className="dashboard-create-ride-offer">
        <div className="dashboard-box">
          <div className="dashboard-border">
            <div className="dashboard-user-interaction"></div>
            <div className="mini-nav-border"></div>
            <div className="search-bar">
              <div className="search-bar-child"></div>
              <input
                type="text"
                className="search-rides"
                placeholder="Search Rides"
                value={searchQuery}
                onChange={handleSearchChange} // Handle input changes
              />
            </div>
            <div className="rectangle-parent">
              <div className="group-child"></div>
              <div className="requestType">Request Type</div>
              <div className="terminal">Terminal</div>
              <div className="destination">Destination</div>
              <div className="available-seats">Seats</div>
              <div className="date">Date</div>
              <div className="time">Time</div>
              <div className="price">Price</div>
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
        <div className="footer-section">
          <div className="footer-section-child">
            <b className="unt-rides">© 2023 UNT Rides</b>
          </div>
        </div>
      </div>
    </div>
  );
  };
  

export default RideHistory;
