import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Define types for the store state
interface AdminUser {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface Tourist {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

interface Incident {
  id: string;
  type: string;
  severity: string;
  // Add other fields as needed
}

interface AdminStore {
  // Authentication
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (userData: AdminUser) => void;
  logout: () => void;

  // Dashboard data
  activeTourists: number;
  activeIncidents: number;
  highRiskAreas: number;
  responseTime: string;
  updateDashboardMetrics: () => void;

  // Tourists data
  tourists: Tourist[];
  selectedTourist: Tourist | null;
  setTourists: (tourists: Tourist[]) => void;
  setSelectedTourist: (tourist: Tourist) => void;

  // Incidents data
  incidents: Incident[];
  setIncidents: (incidents: Incident[]) => void;

  // Map data
  mapCenter: [number, number];
  mapZoom: number;
  showHeatmap: boolean;
  setMapCenter: (center: [number, number]) => void;
  setMapZoom: (zoom: number) => void;
  toggleHeatmap: () => void;
}

const useAdminStore = create<AdminStore>()(
  devtools(
    (set) => ({
      // Authentication
      isAuthenticated: false,
      adminUser: null,
      login: (userData) => set({ isAuthenticated: true, adminUser: userData }),
      logout: () => set({ isAuthenticated: false, adminUser: null }),

      // Dashboard data
      activeTourists: 0,
      activeIncidents: 0,
      highRiskAreas: 0,
      responseTime: '5.2 min',
      updateDashboardMetrics: () =>
        set((state) => ({
          activeTourists: state.activeTourists + Math.floor(Math.random() * 10) - 5,
          activeIncidents: Math.max(0, state.activeIncidents + Math.floor(Math.random() * 3) - 1),
          highRiskAreas: Math.max(0, state.highRiskAreas + Math.floor(Math.random() * 2) - 1),
        })),

      // Tourists data
      tourists: [],
      selectedTourist: null,
      setTourists: (tourists) => set({ tourists }),
      setSelectedTourist: (tourist) => set({ selectedTourist: tourist }),

      // Incidents data
      incidents: [],
      setIncidents: (incidents) => set({ incidents }),

      // Map data
      mapCenter: [28.6139, 77.2090],
      mapZoom: 12,
      showHeatmap: true,
      setMapCenter: (center) => set({ mapCenter: center }),
      setMapZoom: (zoom) => set({ mapZoom: zoom }),
      toggleHeatmap: () => set((state) => ({ showHeatmap: !state.showHeatmap })),
    }),
    { name: 'admin-store' }
  )
);

export default useAdminStore;
