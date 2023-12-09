import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, query, where, getDocs, deleteDoc, getDoc, updateDoc, collectionGroup } from 'firebase/firestore';
import { db, auth } from "../firebase"; // Import Firebase authentication and database
import { getAuth } from 'firebase/auth';
import { useJsApiLoader, GoogleMap, Marker, Polyline, } from "@react-google-maps/api";
import { Map } from "./Map"; 
import Modal from "./Modal"; 

export const MyRides = () => {
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
    background-image: url("/Images/backgroundImage.png");
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

  .name, .requestType, .terminal, .destination, .available-seats, .date, .time, .price, .cancelRide, .ViewMap, ViewMap {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    z-index: 2;
    top: 5px;
    color: white;
  }

  .name { 
    left: 25px; 
    width: 100px; 
  }
  
  .requestType { 
    left: 150px; 
    width: 150px; 
  }
  
  .terminal { 
    left: 325px; 
    width: 150px; /* More space for terminal */
  }
  
  .destination { 
    left: 500px; 
    width: 150px; /* More space for destination */
  }
  
  .available-seats { 
    left: 625px; 
    width: 100px; 
  }
  
  .date { 
    left: 750px; 
    width: 100px; 
  }
  
  .time { 
    left: 875px; 
    width: 100px; 
  }
  .price{
    left: 1000px; 
    width: 100px; 
  }

  .cancelRide {
    left: 1160px; /* Adjust the left position to align with the last column */
    top: 7px; /* Align with the top position of other data items */
  }

  .ViewMap 
  {
    position: absolute;
    left: 1100px; /* Adjust the left position to align with the last column */
  } 
  
  .viewMap {
    position: absolute;
    top: 17px; /* Align with the top position of other data items */
    left: 1100px; /* Adjust the left position to align with the last column */
    font-size: 12px;
    color: #fff;
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
    height: 685px;
  }

  .scroll-frame {
    width: 100%;
    height: 685px;
    overflow-y: auto;
    border: 1px solid #ccc;
  }

  .data-box {
    width: 100%;
    height: 100px;
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
  const [mapData, setMapData] = useState({ terminal: "", destination: "" });

  const [rideRequests, setRideRequests] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRideForMap, setSelectedRideForMap] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    console.log("rideRequests updated", rideRequests);
  }, [rideRequests]);
  

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
        // Set the requestType based on the original requestType of the ride
        requestType: doc.data().requestType === "Offered" ? "Offer Accepted" : "Request Accepted",
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
        const currentUser = auth.currentUser;
        const now = new Date();
    return rideRequests
        .filter((request) => {
          return Object.values(request).some((value) =>
            value != null && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          );
        })
    
      .map((request) => {
        const isOwnRide = currentUser && request.userId === currentUser.uid;
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
              <div className="data-item price">
                <div className="label"></div>
                <div className="value">
                  {request.price ? `$${request.price}` : "N/A"}
                </div>
              </div>
              <div className="data-item">
                <div className="label"></div>
 
              </div>
              <div className="data-item viewMap">
                <button onClick={() => handleViewMap(request)}>
                Map
                 </button>
               </div>
               <div className="data-item cancelRide">
              {isOwnRide ? (
                <button disabled>Your Ride</button>
              ) : (
                <buttonc onClick={() => cancelRide(request.id, request.requestType)}>
                  Cancel </buttonc>
              )}
              </div>
            </div>
          </div>
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
{
  /*
  const cancelRide = async (uniqueID) => {
    try {
      console.log("Received uniqueID:", uniqueID);
  
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in");
        return;
      }
  
      // Remove the ride from the user's AcceptedRides
      const acceptedRidesRef = collection(db, "users", user.uid, "AcceptedRides");
      const acceptedRidesSnapshot = await getDocs(acceptedRidesRef);
  
      for (const acceptedRideDoc of acceptedRidesSnapshot.docs) {
        const acceptedRideData = acceptedRideDoc.data();
  
        if (acceptedRideData.uniqueID === uniqueID) {
          await deleteDoc(acceptedRideDoc.ref);
          console.log("Ride removed from AcceptedRides of the current user:", uniqueID);
          break; // Found and removed, exit the loop
        }
      }
  
      // Increment available seats in AcceptedRides of other users
      const allUsersRef = collection(db, "users");
      const allUsersSnapshot = await getDocs(allUsersRef);
  
      for (const userDoc of allUsersSnapshot.docs) {
        if (userDoc.id !== user.uid) {
          const otherUserAcceptedRidesRef = collection(userDoc.ref, "AcceptedRides");
          const otherUserAcceptedRidesSnapshot = await getDocs(otherUserAcceptedRidesRef);
  
          for (const otherAcceptedRideDoc of otherUserAcceptedRidesSnapshot.docs) {
            const otherAcceptedRideData = otherAcceptedRideDoc.data();
  
            if (otherAcceptedRideData.uniqueID === uniqueID) {
              const availableSeats = otherAcceptedRideData.availableSeats || 0;
              await updateDoc(otherAcceptedRideDoc.ref, { availableSeats: availableSeats + 1 });
              console.log("Available seats incremented by 1 in AcceptedRides of another user:", uniqueID);
              break; // Found and updated, exit the loop
            }
          }
        }
      }
  
      // Increment available seats by 1 in rideRequests
      const allUsersRequestsRef = collection(db, "users");
      const allUsersRequestsSnapshot = await getDocs(allUsersRequestsRef);
  
      for (const userDoc of allUsersRequestsSnapshot.docs) {
        const rideRequestsRef = collection(userDoc.ref, "rideRequests");
        const rideRequestsSnapshot = await getDocs(rideRequestsRef);
  
        for (const rideRequestDoc of rideRequestsSnapshot.docs) {
          const rideRequestData = rideRequestDoc.data();
  
          if (rideRequestData.uniqueID === uniqueID) {
            const availableSeats = rideRequestData.availableSeats || 0;
            await updateDoc(rideRequestDoc.ref, { availableSeats: availableSeats + 1 });
            console.log("Available seats incremented by 1 for ride in rideRequests:", uniqueID);
            break; // Found and updated, exit the loop
          }
        }
      }
  
      // Exit the function after successful removal and seat increments
      navigate("/MyRides");
    } catch (error) {
      console.error("Error canceling ride:", error);
    }
  };
*/}

const cancelRide = async (uniqueID) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in");
      return;
    }


    const userRef = doc(collection(db, "users"), user.uid);
    const acceptedRidesRef = collection(userRef, "AcceptedRides");

    // Directly access the document using the uniqueID
    const docRef = doc(acceptedRidesRef, uniqueID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const cancelledUniqueID = docSnap.data().uniqueID;
      const cancelledRideData = docSnap.data();

      console.log("Found ride in AcceptedRides:", cancelledUniqueID);
      await deleteDoc(docRef);

      alert("Your ride has been cancelled!");

      // Update seats in all users' rideRequests subcollections
      const allUsersRef = collection(db, "users");
      const snapshot = await getDocs(allUsersRef);

      snapshot.forEach(async (userDoc) => {
        console.log("Checking user:", userDoc.id); // Log user ID for verification
        const rideRequestsRef = collection(userDoc.ref, "RideRequests");
        const rideRequestRef = doc(rideRequestsRef, cancelledUniqueID);
        const rideRequestSnap = await getDoc(rideRequestRef);

        if (rideRequestSnap.exists()) {
          const rideRequestData = rideRequestSnap.data();
          const updatedSeats = rideRequestData.seats + 1;

          await updateDoc(rideRequestRef, { seats: updatedSeats });
          console.log("Updated seats for ride request:", cancelledUniqueID);
        } else {
          console.log("Ride request not found for user:", userDoc.id);
        }
      });
    } else {
      console.log("Ride not found in AcceptedRides.");
    }
  } catch (error) {
    console.error("Error canceling ride:", error);
  }
};





  
  return (
    <div className="mask-group">
      <style>{css}</style>
      <img className="background-image-icon" alt="" />
      <div className="dashboard-create-ride-offer">
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
              <div className="name">Name</div>
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
      </div>
      <div className="footer-section">
        <div className="footer-section-child">
          <b className="unt-rides">© 2023 UNT Rides</b>
        </div>
      </div>
      <Modal show={isModalOpen} handleClose={handleCloseModal}>
        <Map
          terminal={selectedRideForMap?.terminal}
          destination={selectedRideForMap?.destination}
        />
      </Modal>
    </div>
  );
};

export default MyRides;