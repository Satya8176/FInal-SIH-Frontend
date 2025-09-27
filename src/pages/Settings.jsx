import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
  Box,
} from '@mui/material';
import { Language, Notifications, LocationOn } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocation } from '../context/LocationContext';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  { code: 'ml', name: 'മലയാളം (Malayalam)' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)' },
];

export const Settings = () => {
  const { t, i18n } = useTranslation();
  const { trackingEnabled, toggleTracking } = useLocation();

  const [notifications, setNotifications] = React.useState({
    push: true,
    email: true,
    sms: false,
  });

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
  };

  const handleNotificationChange = (type) => (event) => {
    setNotifications(prev => ({
      ...prev,
      [type]: event.target.checked,
    }));
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('settings.title')}
      </Typography>

      <Grid container spacing={3}>
        {/* Language Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Language sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  {t('settings.language')}
                </Typography>
              </Box>
              <FormControl fullWidth>
                <InputLabel>{t('settings.language')}</InputLabel>
                <Select
                  value={i18n.language}
                  label={t('settings.language')}
                  onChange={handleLanguageChange}
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Location Tracking Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  {t('settings.tracking')}
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
                label={t('settings.enableTracking')}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Enable real-time location tracking for enhanced safety monitoring and emergency response.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                  {t('settings.notifications')}
                </Typography>
              </Box>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.push}
                    onChange={handleNotificationChange('push')}
                    color="primary"
                  />
                }
                label={t('settings.pushNotifications')}
              />
              
              <Divider sx={{ my: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.email}
                    onChange={handleNotificationChange('email')}
                    color="primary"
                  />
                }
                label={t('settings.emailAlerts')}
              />
              
              <Divider sx={{ my: 2 }} />
              
              <FormControlLabel
                control={
                  <Switch
                    checked={notifications.sms}
                    onChange={handleNotificationChange('sms')}
                    color="primary"
                  />
                }
                label={t('settings.smsAlerts')}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};