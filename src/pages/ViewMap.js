//This is the map that is displayed when clicking Rides > View Map
import React, { useRef, useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { collection, query, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase"; // Import your Firebase configuration

const center = { lat: 33.2148, lng: -97.1331 };

export const ViewMap = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [route, setRoute] = useState(null);
  const [originMarker, setOriginMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);

  const originRef = useRef(null);
  const destinationRef = useRef(null);
  const autocompleteService = useRef(null);

  
  useEffect(() => {
    if (isLoaded) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const onLoad = (map) => {
    setMap(map);
  };

  const onUnmount = () => {
    setMap(null);
  };

  const autoFillAddress = (ref) => {
    if (!autocompleteService.current) return;

    const input = ref.current;

    if (input) {
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          input.value = place.formatted_address;
        }
      });
    }
  };

  /*useEffect(() => {
    if (isLoaded && terminal && destination) {
      calculateRoute();
    }
  }, [isLoaded, terminal, destination]); 
    autoFillAddress(originRef);
    autoFillAddress(destinationRef);
  }, [isLoaded]);

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    */  
    useEffect(() => {
      if (isLoaded) {
          autoFillAddress(originRef);
          autoFillAddress(destinationRef);
      }
    }, [isLoaded]);
    
    async function calculateRoute() {
      if (originRef.current.value === '' || destinationRef.current.value === '') {
          return;
      }
      // Use the values from the refs
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
          origin: originRef.current.value,
          destination: destinationRef.current.value,
          travelMode: window.google.maps.TravelMode.DRIVING,
      });

    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    // Set the route on the map
    setRoute(results.routes[0].overview_path);

    // Create markers for origin and destination
    const originMarker = new window.google.maps.Marker({
      position: results.routes[0].legs[0].start_location,
      map: map,
      label: 'A', // You can customize the label here
    });

    const destinationMarker = new window.google.maps.Marker({
      position: results.routes[0].legs[0].end_location,
      map: map,
      label: 'B', // You can customize the label here
    });

    // Set origin and destination markers
    setOriginMarker(originMarker);
    setDestinationMarker(destinationMarker);

    // Center the map on the route
    const bounds = new window.google.maps.LatLngBounds();
    results.routes[0].overview_path.forEach((path) => {
      bounds.extend(path);
    });
    map.fitBounds(bounds);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
    setRoute(null);
    if (originMarker) {
      originMarker.setMap(null);
    }
    if (destinationMarker) {
      destinationMarker.setMap(null);
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            zoomControlOptions: {
              position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
            },
          }}
        >
          {route && (
            <Polyline
              path={route}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          )}

          {/* Add a button with the specified aria-label, icon, and functionality */}
          <button
            style={{
              position: 'absolute',
              bottom: '50px',
              right: '10px',
              backgroundColor: 'white',
              padding: '8px',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer', // Add cursor style to indicate clickability
            }}
            aria-label="Center Map"
            onClick={() => {
              if (map) {
                map.panTo(center);
                map.setZoom(15);
              }
            }}
          >
            <i className="fa fa-location-arrow" />
          </button>
        </GoogleMap>
      ) : (
        <div>Loading Google Maps...</div>
      )}

      <div
         style={{
          position: 'absolute',
          top: '80px',
          left: '80px',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2>Where to Next?</h2>
        <input
          type="text"
          ref={originRef}
          placeholder="Enter origin"
          style={{ fontSize: '18px' }}
          autoFocus
        />
        <input
          type="text"
          ref={destinationRef}
          placeholder="Enter destination"
          style={{ fontSize: '18px' }}
        />
        <div>
          <button
            onClick={calculateRoute}
            style={{
              fontSize: '20px',
              padding: '6px 10px',
            }}
          >
            Calculate Route
          </button>
          <button
            onClick={clearRoute}
            style={{
              fontSize: '20px',
              padding: '6px 10px',
              marginLeft: '10px',
            }}
          >
            Clear Route
          </button>
        </div>

        <div>
          <p style={{ fontSize: '16px', }}>Distance {distance}</p>
          <p style={{ fontSize: '16px' }}>Duration: {duration}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewMap;