import React, { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react';
import { LocationData, GeofenceZone, Alert } from '../api/location';

interface LocationState {
  currentLocation: LocationData | null;
  geofenceZones: GeofenceZone[];
  alerts: Alert[];
  trackingEnabled: boolean;
  isLoading: boolean;
}

type LocationAction =
  | { type: 'SET_LOCATION'; payload: LocationData }
  | { type: 'SET_GEOFENCE_ZONES'; payload: GeofenceZone[] }
  | { type: 'SET_ALERTS'; payload: Alert[] }
  | { type: 'ADD_ALERT'; payload: Alert }
  | { type: 'TOGGLE_TRACKING' }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: LocationState = {
  currentLocation: null,
  geofenceZones: [],
  alerts: [],
  trackingEnabled: localStorage.getItem('trackingEnabled') === 'true',
  isLoading: false,
};

const locationReducer = (state: LocationState, action: LocationAction): LocationState => {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'SET_GEOFENCE_ZONES':
      return { ...state, geofenceZones: action.payload };
    case 'SET_ALERTS':
      return { ...state, alerts: action.payload };
    case 'ADD_ALERT':
      return { ...state, alerts: [action.payload, ...state.alerts] };
    case 'TOGGLE_TRACKING':
      const newTrackingState = !state.trackingEnabled;
      localStorage.setItem('trackingEnabled', String(newTrackingState));
      return { ...state, trackingEnabled: newTrackingState };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

interface LocationContextType extends LocationState {
  setCurrentLocation: (location: LocationData) => void;
  setGeofenceZones: (zones: GeofenceZone[]) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  toggleTracking: () => void;
  setLoading: (loading: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);

  // Stable functions with useCallback
  const setCurrentLocation = useCallback((location: LocationData) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  }, []);

  const setGeofenceZones = useCallback((zones: GeofenceZone[]) => {
    dispatch({ type: 'SET_GEOFENCE_ZONES', payload: zones });
  }, []);

  const setAlerts = useCallback((alerts: Alert[]) => {
    dispatch({ type: 'SET_ALERTS', payload: alerts });
  }, []);

  const addAlert = useCallback((alert: Alert) => {
    dispatch({ type: 'ADD_ALERT', payload: alert });
  }, []);

  const toggleTracking = useCallback(() => {
    dispatch({ type: 'TOGGLE_TRACKING' });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  // Initialize tracking state from localStorage once
  useEffect(() => {
    const storedTracking = localStorage.getItem('trackingEnabled') === 'true';
    if (storedTracking !== state.trackingEnabled) {
      dispatch({ type: 'TOGGLE_TRACKING' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  // Watch geolocation when tracking is enabled
  useEffect(() => {
    if (!state.trackingEnabled || !navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString(),
          accuracy: position.coords.accuracy,
        };
        setCurrentLocation(locationData);
      },
      (error) => console.error('Location tracking error:', error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [state.trackingEnabled, setCurrentLocation]);

  const value: LocationContextType = {
    ...state,
    setCurrentLocation,
    setGeofenceZones,
    setAlerts,
    addAlert,
    toggleTracking,
    setLoading,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
