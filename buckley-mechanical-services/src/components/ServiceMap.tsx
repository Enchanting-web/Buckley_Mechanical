import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const ServiceMap = () => {
  // Coordinates for Monroe, OH
  const position: [number, number] = [39.4389, -84.3611];
  
  // Primary service area radius (approx 25 miles in meters)
  const serviceRadius = 40233; 

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-navy-light/20 shadow-2xl relative z-10">
      <MapContainer 
        center={position} 
        zoom={9} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Service Area Circle */}
        <Circle
          center={position}
          pathOptions={{ 
            fillColor: '#CC5500', 
            fillOpacity: 0.15, 
            color: '#CC5500', 
            weight: 2,
            dashArray: '5, 10'
          }}
          radius={serviceRadius}
        />

        <Marker position={position}>
          <Popup>
            <div className="text-navy font-bold">
              Buckley Mechanical Services
              <br />
              <span className="text-xs font-normal">Monroe, OH & Surrounding Areas</span>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-dark-surface/90 backdrop-blur-md p-3 rounded-xl border border-navy-light/30 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-burnt-orange"></div>
          <span className="text-white font-bold">Primary Service Area</span>
        </div>
        <p className="text-slate-400">Serving Monroe, Middletown, Liberty Township, and more.</p>
      </div>
    </div>
  );
};

export default ServiceMap;
