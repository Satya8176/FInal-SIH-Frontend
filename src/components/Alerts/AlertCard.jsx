import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { CheckCircle, Error, Warning, Info } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

export const AlertCard = ({
  alert,
  onResolve,
  getAlertIcon,
  getAlertColor,
}) => {
  const { t } = useTranslation();

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <Error color="error" />;
      case 'high':
        return <Warning color="warning" />;
      case 'medium':
        return <Info color="info" />;
      case 'low':
        return <CheckCircle color="success" />;
      default:
        return <Info />;
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card
      sx={{
        mb: 2,
        border: alert.resolved ? 'none' : `2px solid`,
        borderColor: alert.resolved ? 'transparent' : `${getAlertColor(alert.severity)}.main`,
        opacity: alert.resolved ? 0.7 : 1,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="h6" sx={{ mr: 1 }}>
                {getAlertIcon(alert.type)}
              </Typography>
              <Typography variant="h6" component="h3">
                {t(`alerts.${alert.type}`)}
              </Typography>
              {getSeverityIcon(alert.severity)}
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {alert.message}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip
                size="small"
                label={alert.severity.toUpperCase()}
                color={getAlertColor(alert.severity)}
                variant="outlined"
              />
              <Chip
                size="small"
                label={alert.resolved ? t('alerts.resolved') : t('alerts.unresolved')}
                color={alert.resolved ? 'success' : 'warning'}
                variant={alert.resolved ? 'filled' : 'outlined'}
              />
            </Box>

            <Typography variant="caption" color="text.secondary">
              {formatTimestamp(alert.timestamp)}
            </Typography>

            {alert.location && (
              <Typography variant="caption" display="block" color="text.secondary">
                Location: {alert.location.latitude.toFixed(6)}, {alert.location.longitude.toFixed(6)}
              </Typography>
            )}
          </Box>

          {!alert.resolved && onResolve && (
            <IconButton color="success" onClick={() => onResolve(alert.id)} sx={{ ml: 1 }}>
              <CheckCircle />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
