import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


// Create custom icons for different statuses
const createIcon = (color) =>
  new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="
      width: 12px;
      height: 12px;
      background-color: ${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

const touristIcon = createIcon('#2196F3');
const alertIcon = createIcon('#F44336');
const safeIcon = createIcon('#4CAF50');

const Heatmap= ({ heatmapData }) => {
  // Mock tourist locations for demonstration
  const mockTourists = heatmapData || [
    { id: 1, lat: 28.6139, lng: 77.2090, name: 'Red Fort Area', status: 'safe', count: 15 },
    { id: 2, lat: 28.5562, lng: 77.1000, name: 'Qutub Minar', status: 'safe', count: 8 },
    { id: 3, lat: 28.6129, lng: 77.2295, name: 'India Gate', status: 'alert', count: 3 },
    { id: 4, lat: 28.6562, lng: 77.2410, name: 'Lotus Temple', status: 'safe', count: 12 },
    { id: 5, lat: 28.6478, lng: 77.2167, name: 'Connaught Place', status: 'alert', count: 2 },
  ];

  const getIcon = (status) => {
    switch (status) {
      case 'alert':
        return alertIcon;
      case 'safe':
        return safeIcon;
      default:
        return touristIcon;
    }
  };

  const getPopupColor = (status) => {
    switch (status) {
      case 'alert':
        return '#F44336';
      case 'safe':
        return '#4CAF50';
      default:
        return '#2196F3';
    }
  };

  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {mockTourists.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={getIcon(location.status)}
          >
            <Popup>
              <div style={{ minWidth: '200px', padding: '8px' }}>
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    color: getPopupColor(location.status),
                    fontWeight: 'bold',
                  }}
                >
                  {location.name}
                </h4>
                <div style={{ marginBottom: '4px' }}>
                  <strong>Tourists:</strong> {location.count}
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: getPopupColor(location.status),
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {location.status}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Heatmap;