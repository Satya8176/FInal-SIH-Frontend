import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from '../../context/LocationContext';
import { useLocationOperations } from '../../hooks/useLocation';

// Fix for default markers in React Leaflet
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const getZoneColor = (type) => {
  switch (type) {
    case 'safe':
      return '#4CAF50';
    case 'warning':
      return '#FF9800';
    case 'danger':
      return '#F44336';
    default:
      return '#2196F3';
  }
};

export const TouristMap = () => {
  const { t } = useTranslation();
  const { currentLocation, geofenceZones } = useLocation();
  const { } = useLocationOperations();

  // Default to New Delhi if no location is available
  const defaultCenter = [28.6139, 77.2090];
  const mapCenter = currentLocation 
    ? [currentLocation.latitude, currentLocation.longitude]
    : defaultCenter;

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Current location marker */}
        {currentLocation && (
          <Marker position={[currentLocation.latitude, currentLocation.longitude]}>
            <Popup>
              <Typography variant="body2">
                {t('map.yourLocation')}
              </Typography>
              <Typography variant="caption">
                Lat: {currentLocation.latitude.toFixed(6)}<br />
                Lng: {currentLocation.longitude.toFixed(6)}
              </Typography>
            </Popup>
          </Marker>
        )}

        {/* Geofence zones */}
        {geofenceZones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            color={getZoneColor(zone.type)}
            fillColor={getZoneColor(zone.type)}
            fillOpacity={0.3}
          >
            <Popup>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  {zone.name}
                </Typography>
                <Chip
                  size="small"
                  label={t(`map.${zone.type}Zone`)}
                  color={zone.type === 'safe' ? 'success' : zone.type === 'warning' ? 'warning' : 'error'}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2">
                  {zone.description}
                </Typography>
              </Box>
            </Popup>
          </Polygon>
        ))}
      </MapContainer>
    </Box>
  );
};