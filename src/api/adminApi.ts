// DashboardStats type for dashboard metrics
export interface DashboardStats {
  activeTourists: number;
  activeIncidents: number;
  highRiskAreas: number;
  responseTime: string;
  recentActivity: Incident[];
}
import axios, { AxiosInstance } from 'axios';

// Types
export interface TouristLocation {
  lat: number;
  lng: number;
  name?: string;
  address?: string;
}

export interface TripDetails {
  startDate: Date;
  endDate: Date;
  purpose: string;
}

export interface Tourist {
  id: string;
  name: string;
  digitalId: string;
  phone: string;
  nationality: string;
  currentLocation: TouristLocation;
  lastSeen: Date;
  status: 'safe' | 'at_risk' | 'emergency';
  alertHistory: number;
  tripDetails: TripDetails;
  detailedHistory?: {
    timestamp: Date;
    location: TouristLocation;
    activity: string;
  }[];
}

export interface Incident {
  id: string;
  touristId: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'resolved';
  location: TouristLocation;
  reportedAt: Date;
  description: string;
  responseTeam: string;
  estimatedResponseTime: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: string;
  lastLogin: Date;
  email : string
}

// Axios instance
const API_BASE_URL = 'https://api.tourist-safety.gov.in';
const adminApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor for auth token
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Mock data generators
const generateMockTourists = (): Tourist[] => {
  const names = ['Raj Sharma', 'Priya Patel', 'John Smith', 'Sarah Johnson', 'Chen Wei', 'Maria Garcia'];
  const locations: TouristLocation[] = [
    { lat: 28.6139, lng: 77.2090, name: 'Red Fort' },
    { lat: 28.5562, lng: 77.1000, name: 'Qutub Minar' },
    { lat: 28.6129, lng: 77.2295, name: 'India Gate' },
    { lat: 28.6562, lng: 77.2410, name: 'Lotus Temple' },
  ];

  return Array.from({ length: 25 }, (_, i) => ({
    id: `TID-${String(i + 1).padStart(4, '0')}`,
    name: names[Math.floor(Math.random() * names.length)],
    digitalId: `DID-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    phone: `+91-9${Math.floor(Math.random() * 900000000 + 100000000)}`,
    nationality: Math.random() > 0.3 ? 'Indian' : ['USA', 'UK', 'Germany', 'Japan', 'Australia'][Math.floor(Math.random() * 5)],
    currentLocation: locations[Math.floor(Math.random() * locations.length)],
    lastSeen: new Date(Date.now() - Math.random() * 3600000 * 24),
    status: ['safe', 'at_risk', 'emergency'][Math.floor(Math.random() * 3)] as Tourist['status'],
    alertHistory: Math.floor(Math.random() * 5),
    tripDetails: {
      startDate: new Date(Date.now() - Math.random() * 86400000 * 7),
      endDate: new Date(Date.now() + Math.random() * 86400000 * 7),
      purpose: ['Tourism', 'Business', 'Medical', 'Education'][Math.floor(Math.random() * 4)],
    },
  }));
};

const generateMockIncidents = (): Incident[] => {
  const incidentTypes = ['Medical Emergency', 'Lost Tourist', 'Theft', 'Natural Disaster', 'Traffic Accident'];
  const severities: Incident['severity'][] = ['low', 'medium', 'high', 'critical'];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `INC-${String(i + 1).padStart(4, '0')}`,
    touristId: `TID-${String(Math.floor(Math.random() * 25) + 1).padStart(4, '0')}`,
    type: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
    severity: severities[Math.floor(Math.random() * severities.length)],
    status: ['pending', 'in_progress', 'resolved'][Math.floor(Math.random() * 3)] as Incident['status'],
    location: {
      lat: 28.6139 + (Math.random() - 0.5) * 0.1,
      lng: 77.2090 + (Math.random() - 0.5) * 0.1,
      address: 'Delhi, India',
    },
    reportedAt: new Date(Date.now() - Math.random() * 86400000 * 2),
    description: 'Automated incident report generated from safety monitoring system.',
    responseTeam: `Team-${Math.floor(Math.random() * 5) + 1}`,
    estimatedResponseTime: `${Math.floor(Math.random() * 30) + 5} min`,
  }));
};

// API service
export const adminApiService = {
  login: async (credentials: { username: string; password: string }): Promise<{ success: boolean; user: AdminUser }> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const user: AdminUser = {
        id: 'admin-001',
        username: 'admin',
        name: 'System Administrator',
        role: 'super_admin',
        lastLogin: new Date(),
         email: 'admin@example.com'
      };
      localStorage.setItem('adminToken', 'mock-jwt-token');
      return { success: true, user };
    }
    throw new Error('Invalid credentials');
  },

  logout: async (): Promise<{ success: boolean }> => {
    localStorage.removeItem('adminToken');
    return { success: true };
  },

  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      activeTourists: Math.floor(Math.random() * 100) + 150,
      activeIncidents: Math.floor(Math.random() * 10) + 5,
      highRiskAreas: Math.floor(Math.random() * 8) + 3,
      responseTime: `${(Math.random() * 5 + 3).toFixed(1)} min`,
      recentActivity: generateMockIncidents().slice(0, 5),
    };
  },

  getHeatmapData: async (): Promise<{ lat: number; lng: number; intensity: number }[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return Array.from({ length: 50 }, () => ({
      lat: 28.6139 + (Math.random() - 0.5) * 0.2,
      lng: 77.2090 + (Math.random() - 0.5) * 0.2,
      intensity: Math.random(),
    }));
  },

  getTourists: async (page = 1, limit = 10, search = '') => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const allTourists = generateMockTourists();
    const filtered = search
      ? allTourists.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.digitalId.toLowerCase().includes(search.toLowerCase()))
      : allTourists;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      data: filtered.slice(startIndex, endIndex),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  getTouristById: async (id: string): Promise<Tourist> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const tourist = generateMockTourists().find((t) => t.id === id);
    if (!tourist) throw new Error('Tourist not found');
    return {
      ...tourist,
      detailedHistory: Array.from({ length: 10 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 3600000),
        location: {
          lat: 28.6139 + (Math.random() - 0.5) * 0.1,
          lng: 77.2090 + (Math.random() - 0.5) * 0.1,
          name: ['Red Fort', 'India Gate', 'Qutub Minar'][Math.floor(Math.random() * 3)],
        },
        activity: ['Check-in', 'Alert Generated', 'Location Update'][Math.floor(Math.random() * 3)],
      })),
    };
  },

  getIncidents: async (status: 'all' | Incident['status'] = 'all', page = 1, limit = 10) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const allIncidents = generateMockIncidents();
    const filtered = status === 'all' ? allIncidents : allIncidents.filter((i) => i.status === status);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return {
      data: filtered.slice(startIndex, endIndex),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit),
    };
  },

  updateIncidentStatus: async (incidentId: string, status: Incident['status']) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { success: true, message: `Incident ${incidentId} status updated to ${status}` };
  },

  generateEFIR: async (incidentId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      efirNumber: `EFIR-${Date.now()}`,
      generatedAt: new Date(),
      downloadUrl: '#',
      message: `E-FIR generated successfully for incident ${incidentId}`,
      incidentId, // Now incidentId is used
    };
  },
};

export default adminApi;
