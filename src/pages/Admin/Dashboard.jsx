import React, { useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Tooltip,
} from '@mui/material';
import {
  People,
  Warning,
  LocationOn,
  AccessTime,
  TrendingUp,
  Warning as Emergency,
  Refresh,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { adminApiService } from '../../api/adminApi';
import Heatmap from '../../components/Admin/Heatmap';
import AlertTable from '../../components/Admin/AlertTable';
import useAdminStore from '../../store/adminStore';

// --- Metric Card Component ---
const MetricCard = ({ title, value, icon, color, trend, loading }) => (
  <Card
    sx={{
      height: '100%',
      background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {loading ? <CircularProgress size={24} color="inherit" /> : value}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            {title}
          </Typography>
          {trend && (
            <Chip
              label={trend}
              size="small"
              sx={{
                mt: 1,
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>
        <Box sx={{ opacity: 0.7, fontSize: 40 }}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

// --- Dashboard Component ---
const Dashboard = () => {
  const updateDashboardMetrics = useAdminStore((state) => state.updateDashboardMetrics);

  // Dashboard Stats Query
  const { data: dashboardStats, isLoading, refetch } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: adminApiService.getDashboardStats,
    refetchInterval: 30000,
  });

  // Heatmap Data Query
  const { data: heatmapData, isLoading: heatmapLoading } = useQuery({
    queryKey: ['heatmapData'],
    queryFn: adminApiService.getHeatmapData,
    refetchInterval: 60000,
  });

  // Periodic update
  useEffect(() => {
    const interval = setInterval(() => {
      updateDashboardMetrics();
    }, 10000);
    return () => clearInterval(interval);
  }, [updateDashboardMetrics]);

  // Severity color helper
  const getSeverityColor = (severity) => {
    const colors = {
      low: '#4CAF50',
      medium: '#FF9800',
      high: '#F44336',
      critical: '#9C27B0',
    };
    return colors[severity] || '#757575';
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Real-Time Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitoring tourist safety across all locations
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<Refresh />} onClick={() => refetch()} sx={{ height: 'fit-content' }}>
          Refresh Data
        </Button>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Tourists"
            value={dashboardStats?.activeTourists ?? 0}
            icon={<People />}
            color="#2196F3"
            trend="+12% today"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Incidents"
            value={dashboardStats?.activeIncidents ?? 0}
            icon={<Warning />}
            color="#FF9800"
            trend="2 resolved"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="High Risk Areas"
            value={dashboardStats?.highRiskAreas ?? 0}
            icon={<LocationOn />}
            color="#F44336"
            trend="Monitoring"
            loading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg Response Time"
            value={dashboardStats?.responseTime ?? '0 min'}
            icon={<AccessTime />}
            color="#4CAF50"
            trend="15% improved"
            loading={isLoading}
          />
        </Grid>
      </Grid>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Heatmap */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: 500 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Tourist Distribution & Risk Areas
                </Typography>
                <Chip label="LIVE" color="success" size="small" icon={<TrendingUp />} />
              </Box>
              {heatmapLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Heatmap heatmapData={heatmapData} />
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: 500 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activity
              </Typography>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Incident</strong></TableCell>
                      <TableCell><strong>Severity</strong></TableCell>
                      <TableCell><strong>Time</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboardStats?.recentActivity?.map((incident) => (
                      <TableRow key={incident.id} hover>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="500">{incident.type}</Typography>
                            <Typography variant="caption" color="text.secondary">{incident.touristId}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={incident.severity}
                            size="small"
                            sx={{
                              bgcolor: getSeverityColor(incident.severity),
                              color: 'white',
                              fontWeight: 'bold',
                              textTransform: 'uppercase',
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption">{new Date(incident.reportedAt).toLocaleTimeString()}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Alerts */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight="bold">Active Alerts & Incidents</Typography>
                <Tooltip title="Emergency Response Available 24/7">
                  <Chip label="Emergency Support" color="error" icon={<Emergency />} sx={{ fontWeight: 'bold' }} />
                </Tooltip>
              </Box>
              <AlertTable />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;