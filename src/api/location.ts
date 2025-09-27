import api from './auth';

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: string;
  accuracy?: number;
}

export interface GeofenceZone {
  id: string;
  name: string;
  type: 'safe' | 'warning' | 'danger';
  coordinates: [number, number][];
  description: string;
}

export interface Alert {
  id: string;
  type: 'inactive' | 'route_deviation' | 'sudden_stop' | 'geofence_breach' | 'panic';
  message: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location?: LocationData;
  resolved: boolean;
}

// Mock location data
const mockGeofenceZones: GeofenceZone[] = [
  {
    id: 'zone_1',
    name: 'High Crime Area - Old City',
    type: 'danger',
    coordinates: [
      [28.6139, 77.2090],
      [28.6150, 77.2100],
      [28.6160, 77.2110],
      [28.6170, 77.2105],
      [28.6155, 77.2085],
    ],
    description: 'High crime rate reported in this area. Exercise caution.',
  },
  {
    id: 'zone_2',
    name: 'Tourist Safe Zone - Connaught Place',
    type: 'safe',
    coordinates: [
      [28.6304, 77.2177],
      [28.6320, 77.2200],
      [28.6310, 77.2210],
      [28.6295, 77.2190],
    ],
    description: 'Well-monitored tourist area with security presence.',
  },
];

export const locationAPI = {
  updateLocation: async (location: LocationData): Promise<{ success: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Location updated:', location);
    return { success: true };
  },

  getGeofenceZones: async (): Promise<GeofenceZone[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockGeofenceZones;
  },

  triggerPanicAlert: async (location: LocationData): Promise<{ alertId: string }> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('PANIC ALERT TRIGGERED:', location);
    
    return {
      alertId: 'alert_' + Date.now(),
    };
  },

  getAlerts: async (): Promise<Alert[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return [
      {
        id: 'alert_1',
        type: 'route_deviation',
        message: 'You have deviated from your planned route',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        severity: 'medium',
        resolved: false,
      },
      {
        id: 'alert_2',
        type: 'inactive',
        message: 'No movement detected for 30 minutes',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        severity: 'low',
        resolved: true,
      },
    ];
  },
};