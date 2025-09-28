import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Switch,
  FormControlLabel,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { LocationOn, Security, TrackChanges } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useLocation } from '../context/LocationContext';
import TouristMap from '../components/Map/TouristMap';
import { PanicButton } from '../components/Safety/PanicButton';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { currentLocation, trackingEnabled, toggleTracking } = useLocation();

  const safetyScore = user?.safetyScore || 0;

  const getSafetyScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3, mx: '20vw', width: '100%'}}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('dashboard.title')}
      </Typography>

      <Grid container spacing={3}>
        {/* Safety Score Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Security color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  {t('dashboard.safetyScore')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography
                  variant="h3"
                  color={`${getSafetyScoreColor(safetyScore)}.main`}
                >
                  {safetyScore}
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ ml: 1 }}>
                  /100
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={safetyScore}
                color={getSafetyScoreColor(safetyScore)}
                sx={{ height: 8, borderRadius: 4 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Location Status Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  {t('dashboard.currentLocation')}
                </Typography>
              </Box>
              {currentLocation ? (
                <Box>
                  <Typography variant="body2" color="success.main">
                    Lat: {currentLocation.latitude.toFixed(6)}
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Lng: {currentLocation.longitude.toFixed(6)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Updated: {new Date(currentLocation.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Location unavailable
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Tracking Control Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrackChanges color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Location Tracking
                </Typography>
              </Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={trackingEnabled}
                    onChange={toggleTracking}
                    color="primary"
                  />
                }
                label={
                  trackingEnabled
                    ? t('dashboard.trackingEnabled')
                    : t('dashboard.trackingDisabled')
                }
              />
              {!trackingEnabled && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Enable tracking for enhanced safety monitoring
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Tourist Map */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1, p: 0, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1, height: '100%', width: '100%' }}>
                <TouristMap />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Panic Button */}
        <Grid item xs={12} md={4}>
          <Box sx={{ height: 450, display: 'flex', flexDirection: 'column' }}>
            <Card sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <CardContent sx={{ width: '100%' }}>
                <PanicButton 
                />
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Use only in genuine emergencies. This will alert authorities immediately.
                </Alert>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
