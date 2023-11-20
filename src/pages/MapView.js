    import React from 'react';
    import { Map } from './Map'; // Adjust import path as necessary
    
    const MapView = () => {
      const mapData = JSON.parse(localStorage.getItem('mapData'));
    
      return (
        <div>
          <Map terminal={mapData?.terminal} destination={mapData?.destination} />
        </div>
      );
    };
    
    export default MapView;