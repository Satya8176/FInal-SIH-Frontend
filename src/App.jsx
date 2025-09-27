import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { CustomAppBar } from './components/Layout/AppBar';
import { Sidebar } from './components/Layout/Sidebar';
import AppRoutes  from './routes';
import './i18n';
import 'leaflet/dist/leaflet.css';
import { requestForToken, onMessageListener } from "./firebase";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '\"Segoe UI\"',
      'Roboto',
      '\"Helvetica Neue\"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!isAuthenticated) {
    return <AppRoutes />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CustomAppBar onMenuClick={handleDrawerToggle} />
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - 240px)` },
          mt: { xs: 7, sm: 8 },
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
};

const App = () => {
  useEffect(() => {
    requestForToken(); // Get FCM Token when app starts

    onMessageListener().then((payload) => {
      console.log("Message received:", payload);
      alert(`${payload.notification.title}: ${payload.notification.body}`);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AuthProvider>
            <LocationProvider>
              <AppContent />
            </LocationProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;