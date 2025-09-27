import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Badge,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from '../context/LocationContext';
import { useAlerts } from '../hooks/useAlerts';
import { AlertCard } from '../components/Alerts/AlertCard';

export const Alerts = () => {
  const { t } = useTranslation();
  const { alerts } = useLocation();
  
  // Call useAlerts here in parent, pass functions to AlertCard
  const { unreadCount, filteredAlerts, filterAlerts, getAlertIcon, getAlertColor } = useAlerts(alerts);

  const [tabValue, setTabValue] = useState(0);
  const [severityFilter, setSeverityFilter] = useState('');

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      filterAlerts(severityFilter || undefined, undefined);
    } else if (newValue === 1) {
      filterAlerts(severityFilter || undefined, false);
    } else if (newValue === 2) {
      filterAlerts(severityFilter || undefined, true);
    }
  };

  const handleSeverityFilterChange = (event) => {
    const severity = event.target.value;
    setSeverityFilter(severity);

    let resolved = undefined;
    if (tabValue === 1) resolved = false;
    if (tabValue === 2) resolved = true;

    filterAlerts(severity || undefined, resolved);
  };

  const handleResolveAlert = (alertId) => {
    console.log('Resolving alert:', alertId);
    // Ideally, call LocationContext or API to update alert resolved state
  };

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('alerts.title')}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab 
            label={
              <Badge badgeContent={alerts.length} color="primary">
                {t('alerts.allAlerts')}
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge badgeContent={unreadCount} color="error">
                {t('alerts.unreadAlerts')}
              </Badge>
            } 
          />
          <Tab label={t('alerts.resolved')} />
        </Tabs>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Severity</InputLabel>
          <Select
            value={severityFilter}
            label="Severity"
            onChange={handleSeverityFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="critical">Critical</MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {filteredAlerts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          {t('alerts.noAlerts')}
        </Typography>
      ) : (
        <Box>
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onResolve={handleResolveAlert}
              getAlertIcon={getAlertIcon}
              getAlertColor={getAlertColor}
            />
          ))}
        </Box>
      )}
    </Container>
  );
};