import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocationOn,
  Person,
  Visibility,
  Warning as Emergency,
  CheckCircle,
  Schedule,
} from '@mui/icons-material';

const AlertTable = () => {
  // Mock alert data
  const alerts = [
    {
      id: 'ALT-001',
      touristId: 'TID-0001',
      type: 'Medical Emergency',
      severity: 'critical',
      status: 'in_progress',
      location: 'Red Fort, Delhi',
      time: '10:30 AM',
      responseTeam: 'Team Alpha',
    },
    {
      id: 'ALT-002',
      touristId: 'TID-0045',
      type: 'Lost Tourist',
      severity: 'medium',
      status: 'pending',
      location: 'Connaught Place',
      time: '09:15 AM',
      responseTeam: 'Team Beta',
    },
    {
      id: 'ALT-003',
      touristId: 'TID-0123',
      type: 'Theft Report',
      severity: 'high',
      status: 'resolved',
      location: 'India Gate',
      time: '08:45 AM',
      responseTeam: 'Team Gamma',
    },
    {
      id: 'ALT-004',
      touristId: 'TID-0078',
      type: 'Natural Hazard',
      severity: 'low',
      status: 'pending',
      location: 'Qutub Minar',
      time: '07:20 AM',
      responseTeam: 'Team Delta',
    },
  ];

  const getSeverityColor = (severity) => {
    const colors = {
      low: '#4CAF50',
      medium: '#FF9800',
      high: '#F44336',
      critical: '#9C27B0',
    };
    return colors[severity] || '#757575';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FF9800',
      in_progress: '#2196F3',
      resolved: '#4CAF50',
    };
    return colors[status] || '#757575';
  };

  const getStatusIcon = (status) => {
    if (status === 'pending') return <Schedule />;
    if (status === 'in_progress') return <Emergency />;
    if (status === 'resolved') return <CheckCircle />;
    return undefined;
  };

  return (
    <TableContainer sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell><strong>Alert ID</strong></TableCell>
            <TableCell><strong>Tourist</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Severity</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Location</strong></TableCell>
            <TableCell><strong>Time</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map((alert) => (
            <TableRow key={alert.id} hover>
              <TableCell>
                <Typography variant="body2" fontFamily="monospace" fontWeight="bold">
                  {alert.id}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" fontFamily="monospace">
                    {alert.touristId}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="500">
                  {alert.type}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={alert.severity}
                  size="small"
                  sx={{
                    bgcolor: getSeverityColor(alert.severity),
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={alert.status.replace('_', ' ')}
                  size="small"
                  icon={getStatusIcon(alert.status)}
                  sx={{
                    bgcolor: getStatusColor(alert.status),
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                  }}
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    {alert.location}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2">
                  {alert.time}
                </Typography>
              </TableCell>
              <TableCell>
                <Tooltip title="View Details">
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AlertTable;