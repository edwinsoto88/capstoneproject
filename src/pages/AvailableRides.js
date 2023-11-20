import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, addDoc, getDoc, doc, getDocs, updateDoc, } from "firebase/firestore";
import { db, auth } from "../firebase"; // Import Firebase authentication and database
import { useJsApiLoader, GoogleMap, Marker, Polyline, } from "@react-google-maps/api";

export const AvailableRides = () => {
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
    padding-bottom: 20px;
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
    top: px;
    left: 945px;
    width: 162px;
    height: 47px;
  }
  
  .my-rides {
    position: absolute;
    top: 45px;
    left: 1088px;
    width: 140px;
    height: 47px;
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

  .rectangle-parent {
    position: relative;
    top: 95px;
    left: 0px; /* Adjust the left property as needed */
    width: 1257px; /* Adjust the width as needed */
    height: 63px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: grey; /* Set the background color to grey */
    z-index: 1; /* Set a z-index value for the .rectangle-parent */
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr;
  }

  .name, .requestType, .terminal, .destination, .available-seats, .date, .time, .price, .accept-ride {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 52px;
    z-index: 2;
    top: 5px;
  }
  
  .name { width: 100%; } /* Adjusted for grid layout */
  .requestType { width: 100%; }
  .terminal { width: 100%; } /* More space for terminal */
  .destination { width: 100%; } /* More space for destination */
  .available-seats { width: 100%; }
  .date { width: 100%; }
  .time { width: 100%; }
  .price { width: 100%; }
  /* Adjust the width of .rectangle-parent if necessary */
  .rectangle-parent {
    width: 1257px;
  }
  
  .myrides-box {
    flex: 1;
    padding: 0px;
    position: absolute;
    left: 0;
    top: 158px;
    border-radius: 0px;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr;
    color: white; /* Text color */
    position: relative;
    align-items: flex-start; /* Center vertically */
    justify-content: center;
  }
  
  .data-set {
    display: contents;
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
    transform: translateY(-6px); 
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
  
  .rectangles {
    position: absolute;
    top: 260px;
    left: 0;
    width: 100%;
    height: 440px;
  }
  
  .rectangles-child {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ccc;
    width: 125.92px;
    height: 100px;
  }
  
  .rectangles-item {
    position: absolute;
    top: 0;
    left: 143.08px;
    background-color: #ddd;
    width: 125.92px;
    height: 100px;
  }
  
  .accept-ride {
    position: absolute;
    top: 3px; /* Align with the top position of other data items */
    left: 1120px; /* Adjust the left position to align with the last column */
    font-size: 12px;
    color: #fff;
  }
  
  .rectangles-inner {
    position: absolute;
    top: 120px;
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

  const [rideRequests, setRideRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [acceptedRides, setAcceptedRides] = useState([]); // State for accepted rides
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef);
        const userSnapshots = await getDocs(usersQuery);

        const promises = [];

        userSnapshots.forEach((userDoc) => {
          const rideRequestsRef = collection(userDoc.ref, "rideRequests");
          const rideRequestsQuery = query(rideRequestsRef);
          const promise = getDocs(rideRequestsQuery).then(
            (rideRequestsSnapshot) => {
              const rideRequestsData = rideRequestsSnapshot.docs.map(
                (rideRequestDoc) => ({
                  userId: userDoc.id, // Include the userId associated with this ride request
                  id: rideRequestDoc.id,
                  ...rideRequestDoc.data(),
                })
              );
              return rideRequestsData;
            }
          );

          promises.push(promise);
        });

        const allRideRequests = await Promise.all(promises);
        const flattenedRideRequests = allRideRequests.flat().map((request) => {
          const requestDateTime = new Date(`${request.date} ${request.time}`);
          const expiryDateTime = new Date(
            requestDateTime.getTime() + 2 * 60 * 60 * 1000
          ); // Adds 2 hours
          return { ...request, expiryDateTime };
        });

        console.log("Fetched Ride Requests:", flattenedRideRequests);
        setRideRequests(flattenedRideRequests);
      } catch (error) {
        console.error("Error fetching ride requests:", error);
      }
    };

    fetchData();
  }, []);

  const createRectangles = () => {
    const now = new Date();
    return rideRequests
      .filter((request) => now < request.expiryDateTime)
      .filter((request) => {
        // Filter logic: return true for items that match the search query
        return Object.values(request).some((value) => {
          if (typeof value === "string" || value instanceof String) {
            return value.toLowerCase().includes(searchQuery.toLowerCase());
          }
          return false;
        });
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
              <div className="data-item accept-ride">
                <button onClick={() => acceptRide(request.id)}>
                  Accept Ride
                </button>
              </div>
            </div>
          </div>
        );
      });
  };
  const acceptRide = async (offerId) => {
    try {
      console.log("Received offerId:", offerId); // Log the received offerId

      // Fetch the current user
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in");
        return;
      }

      const usersRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersRef);

      for (const userDoc of usersSnapshot.docs) {
        const rideRequestsRef = collection(userDoc.ref, "rideRequests");
        const rideRequestDoc = doc(rideRequestsRef, offerId);
        const rideRequestSnapshot = await getDoc(rideRequestDoc);

        if (rideRequestSnapshot.exists()) {
          // If the ride request exists, proceed to accept it
          const rideRequestData = rideRequestSnapshot.data();

          // Update the status to 'Accepted' in the ride request
          await updateDoc(rideRequestDoc, { status: "Accepted" });

          // Store accepted ride details in the current user's AcceptedRides sub-collection
          const acceptedRidesRef = collection(
            doc(db, "users", user.uid),
            "AcceptedRides"
          );
          await addDoc(acceptedRidesRef, rideRequestData);

          console.log("Ride accepted and added to AcceptedRides of the current user:", user.uid);
          navigate("/MyRides"); // Redirect to MyRides page after accepting the ride
          return; // Exit the loop once the ride is accepted
        }
      }
      console.log("Ride not found.");
    } catch (error) {
      console.error("Error accepting ride:", error);
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
          </div>
          <div className="rectangle-parent">
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
                {createRectangles(1000)}
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
  );
};
export default AvailableRides;
