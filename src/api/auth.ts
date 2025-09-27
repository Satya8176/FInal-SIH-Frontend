import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.tourist-safety.gov.in';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  emergencyContact: string;
  kycDocument?: File;
  itinerary?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  digitalTouristId: string;
  kycStatus: 'pending' | 'verified' | 'rejected';
  tripExpiryDate?: string;
  emergencyContact: string;
  safetyScore: number;
}

// Mock API calls - replace with actual endpoints
export const authAPI = {
  login: async (data: LoginData): Promise<{ token: string; user: User }> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    return {
      token: 'mock_jwt_token_' + Date.now(),
      user: {
        id: 'user_123',
        email: data.email,
        name: 'John Doe',
        phone: '+91-9876543210',
        digitalTouristId: '0x' + Math.random().toString(16).substr(2, 40),
        kycStatus: 'verified',
        tripExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        emergencyContact: '+91-9876543211',
        safetyScore: 85,
      },
    };
  },

  register: async (data: RegisterData): Promise<{ token: string; user: User }> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      token: 'mock_jwt_token_' + Date.now(),
      user: {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: data.name,
        phone: data.phone,
        digitalTouristId: '0x' + Math.random().toString(16).substr(2, 40),
        kycStatus: 'pending',
        tripExpiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        emergencyContact: data.emergencyContact,
        safetyScore: 0,
      },
    };
  },

  logout: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('authToken');
  },

  refreshToken: async (): Promise<{ token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { token: 'refreshed_token_' + Date.now() };
  },
};

export default api;