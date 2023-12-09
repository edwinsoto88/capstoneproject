import React from "react";
import backgroundOne from "../Assets/carandstreet.png";
import backgroundTwo from "../Assets/redlocationicon.png";
import backgroundThree from "../Assets/redlocationicon.png";
import img1 from "../Assets/city-driver-bro-1.png";
import img2 from "../Assets/city-skyline-bro-1.png";
import img3 from "../Assets/navigation-bro-1.png";


export const Home = () => {
  return (
    <div className="flex-container">
      <div className="boxes">
        <div className="box1-container">
            <img className="white-background-1" alt="White background" src={backgroundOne}/>
            <img className="city-driver-img" alt="A driver leaning on a car" src={img1}/>
            <div className="request-ride-heading">Request Ride</div>
            <p className="request-ride-p">
              Request a ride get picked up by a nearby community driver
            </p>
        </div>
        <div className="box2-container">
            <img className="white-background-2" alt="White background" src={backgroundTwo}/>
            <img className="city-skyline-img" alt="A view of a park with a city in the background" src={img2}/>
            <div className="confirm-driver-heading">Confirm Your Driver</div>
            <p className="confirm-driver-p">
              Know your driver in advance and be able to view current location in
              real time on the map
            </p>
        </div>
        <div className="box3-container">
            <img className="white-background-3" alt="White background" src={backgroundThree}/>
            <img className="navigation-bro" alt="Guy using gps to navigate" src={img3}/>
            <div className="track-ride-heading">Track your ride</div>
            <p className="track-ride-p">
              Huge drivers network helps you find comforable, safe and cheap ride
            </p>
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

export default Home;
