import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db, auth } from "../firebase"; // Import your Firebase configuration
import { Map } from "./Map"; // Ensure this import is correct
import { useJsApiLoader } from '@react-google-maps/api';
import Modal from './Modal'; // Adjust the path as per your folder structure

export const MyRides = () => {

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
  .group-child {
    position: absolute;
    top: 3px;
    left: 0;
    background-color: var(--color-lightgray);
    width: 1106.9px;
    height: 60.1px;
  }
  .name, .terminal, .destination, .available-seats, .requestType, .date, .time, .ViewMap {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    z-index: 2;
    top: 5px;
  }
  
  .name { 
    left: 50px; 
    width: 100px; 
  }
  
  .requestType { 
    left: 198px; 
    width: 100px; 
  }
  
  .terminal { 
    left: 323px; 
    width: 150px; /* More space for terminal */
  }
  
  .destination { 
    left: 526px; 
    width: 150px; /* More space for destination */
  }
  
  .available-seats { 
    left: 695px; 
    width: 100px; 
  }
  
  .date { 
    left: 810px; 
    width: 100px; 
  }
  
  .time { 
    left: 915px; 
    width: 100px; 
  }

  .ViewMap {
    left: 1075px;
    width: 108px;
  }

  .viewmap{
    left: 1075px;
    width: 109px;
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

  `;
  const [mapData, setMapData] = useState({ terminal: '', destination: '' });

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

const createRideElements = () => {
  // Assuming rides is an array of ride objects
  return rideRequests.map((ride, index) => (
    <Modal show={isModalOpen} handleClose={handleCloseModal}>
        <Map 
          terminal={selectedRideForMap?.terminal} 
          destination={selectedRideForMap?.destination} 
        />
      </Modal>
  ));
};

useEffect(() => {
  const fetchData = async () => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;

      // Fetch ride requests for the current user
      const userRideRequestsRef = collection(db, 'users', uid, 'rideRequests');
      const userPostedRidesQuery = query(userRideRequestsRef);
      const userPostedRidesSnapshot = await getDocs(userPostedRidesQuery);
      const userPostedRidesData = userPostedRidesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch accepted rides for the current user
      const userAcceptedRidesRef = collection(db, 'users', uid, 'AcceptedRides');
      const userAcceptedRidesSnapshot = await getDocs(userAcceptedRidesRef);
      const userAcceptedRidesData = userAcceptedRidesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Combine both ride requests and accepted rides
      const combinedRides = [...userPostedRidesData, ...userAcceptedRidesData];
      setRideRequests(combinedRides);
    }
  };

  fetchData();
}, []);

  const createRectangles = () => {
    return rideRequests
    .filter((request) => {
      // Filter logic: return true for items that match the search query
      return Object.values(request).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .map((request) => {
      return (
        <div className="data-box" key={request.id}>
          <div className="data-set">
          <div className="data-item name">
            <div className="label"></div>
            <div className="value">{request.name}</div>
          </div>
          <div className="data-item requestType">
            <div className="label"></div>
            <div className="value">{request.requestType}</div>
          </div>
          <div className="data-item terminal">
            <div className="label"></div>
            <div className="value">{request.terminal}</div>
          </div>
          <div className="map-container">
        {/* Pass terminal and destination to Map component */}
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
            <div className="data-item" key={request.id}>
       <button className="viewmap" onClick={() => setSelectedRide(request)}>View Map</button>
      </div>
          </div>
          {selectedRide && (
  <Map 
    terminal={request.terminal} 
    destination={request.destination} 
  />
)}        </div>
      );
    });
  };


  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
              <b className="ViewMap">View Map</b>
              <div className="name">Name</div>
              <div className="requestType">Request Type</div>
              <div className="terminal">Terminal</div>
              <div className="destination">Destination</div>
              <div className="available-seats">Seats</div>
              <div className="date">Date</div>
              <div className="time">Time</div>
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
  

export default MyRides;
