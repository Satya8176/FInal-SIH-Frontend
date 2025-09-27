import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TouristLocationMap = ({ tourist }) => {
  if (!tourist || !tourist.currentLocation) {
    return (
      <div
        style={{
          height: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <p>Location data not available</p>
      </div>
    );
  }

  const { lat, lng, name } = tourist.currentLocation;

  return (
    <div
      style={{
        height: '300px',
        width: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <MapContainer center={[lat, lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[lat, lng]}>
          <Popup>
            <div style={{ minWidth: '200px', padding: '8px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#1976d2', fontWeight: 'bold' }}>
                {tourist.name}
              </h4>
              <div style={{ marginBottom: '4px' }}>
                <strong>Location:</strong> {name}
              </div>
              <div style={{ marginBottom: '4px' }}>
                <strong>Status:</strong> {tourist.status}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Last seen: {new Date(tourist.lastSeen).toLocaleString()}
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default TouristLocationMap;
