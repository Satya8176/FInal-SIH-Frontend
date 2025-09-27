import { useEffect } from 'react';
import { useLocation } from '../context/LocationContext';
import { locationAPI } from '../api/location';

export const useLocationOperations = () => {
  const {
    currentLocation,
    geofenceZones,
    alerts,
    setGeofenceZones,
    setAlerts,
    addAlert,
    setLoading,
  } = useLocation();

  useEffect(() => {
    const loadGeofenceZones = async () => {
      try {
        setLoading(true);
        const zones = await locationAPI.getGeofenceZones();
        setGeofenceZones(zones);
      } catch (error) {
        console.error('Failed to load geofence zones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGeofenceZones();
  }, [setGeofenceZones, setLoading]);

  useEffect(() => {
    const loadAlerts = async () => {
      try {
        const alertsData = await locationAPI.getAlerts();
        setAlerts(alertsData);
      } catch (error) {
        console.error('Failed to load alerts:', error);
      }
    };

    loadAlerts();
  }, [setAlerts]);

  const triggerPanicAlert = async () => {
    if (!currentLocation) {
      throw new Error('Current location not available');
    }

    try {
      const response = await locationAPI.triggerPanicAlert(currentLocation);
      
      const panicAlert = {
        id: response.alertId,
        type: 'panic' as const,
        message: 'EMERGENCY: Panic button activated',
        timestamp: new Date().toISOString(),
        severity: 'critical' as const,
        location: currentLocation,
        resolved: false,
      };

      addAlert(panicAlert);
      
      return response.alertId;
    } catch (error) {
      console.error('Failed to trigger panic alert:', error);
      throw error;
    }
  };

  return {
    currentLocation,
    geofenceZones,
    alerts,
    triggerPanicAlert,
  };
};