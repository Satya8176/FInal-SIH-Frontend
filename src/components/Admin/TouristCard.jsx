import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Person,
  LocationOn,
  Phone,
  Visibility,
  Warning as Emergency,
} from '@mui/icons-material';

const TouristCard = ({ tourist, onView, onEmergencyAlert }) => {
  const getStatusColor = (status) => {
    const colors = {
      safe: '#4CAF50',
      at_risk: '#FF9800',
      emergency: '#F44336',
    };
    return colors[status] || '#757575';
  };

  const getNationalityFlag = (nationality) => {
    const flags = {
      Indian: '🇮🇳',
      USA: '🇺🇸',
      UK: '🇬🇧',
      Germany: '🇩🇪',
      Japan: '🇯🇵',
      Australia: '🇦🇺',
    };
    return flags[nationality] || '🌍';
  };

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48 }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {tourist.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <span>{getNationalityFlag(tourist.nationality)}</span>
                <Typography variant="body2" color="text.secondary">
                  {tourist.nationality}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Chip
            label={tourist.status.replace('_', ' ')}
            sx={{
              bgcolor: getStatusColor(tourist.status),
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'capitalize',
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
            ID: {tourist.digitalId}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2">{tourist.phone}</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2">{tourist.currentLocation?.name}</Typography>
        </Box>

        <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
          Last seen: {new Date(tourist.lastSeen).toLocaleString()}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={`${tourist.alertHistory} alerts`}
            size="small"
            color={tourist.alertHistory > 2 ? 'error' : 'default'}
            variant="outlined"
          />

          <Box>
            <Tooltip title="View Details">
              <IconButton size="small" onClick={() => onView?.(tourist)}>
                <Visibility />
              </IconButton>
            </Tooltip>

            {tourist.status !== 'safe' && (
              <Tooltip title="Emergency Alert">
                <IconButton size="small" color="error" onClick={() => onEmergencyAlert?.(tourist)}>
                  <Emergency />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TouristCard;