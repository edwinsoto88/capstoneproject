import React from "react";
import './App.css';
import Navbar from "./components/Navbar"
import "./styles.css"
import { Home } from "./pages/Home"
import { Registration } from "./pages/Registration"
import { Login } from "./pages/Login"
import { MyAccount } from "./pages/MyAccount"
import { RequestRide } from "./pages/RequestRide"
import { RideHistory } from "./pages/RideHistory"
import { AvailableRides } from "./pages/AvailableRides";
import { MyRides } from "./pages/MyRides";
import { Map } from "./pages/Map"; // Import the Map component
import { ViewMap } from "./pages/ViewMap"; // Import the Map component
import { Route, Routes } from "react-router-dom"
import Modal from './pages/Modal';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/RequestRide" element={<RequestRide />} />
          <Route path="/RideHistory" element={<RideHistory />} />
          <Route path="/AvailableRides" element={<AvailableRides />} />
          <Route path="/MyRides" element={<MyRides />} />
          <Route path="/map" element={<Map />} />
          <Route path="/Viewmap" element={<ViewMap />} /> 
          <Route path="/Modal" element={<Modal />} />
        </Routes>
      </div>
    </>
  )
}

export default App
