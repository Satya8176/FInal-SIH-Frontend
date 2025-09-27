import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Visibility,
  Edit,
  GetApp,
  CheckCircle,
  Schedule,
  LocationOn,
  Person,
  Refresh,
  Warning,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApiService } from '../../api/adminApi';

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
  if (status === 'in_progress') return <Warning />;
  if (status === 'resolved') return <CheckCircle />;
  return null;
};

const Incidents = () => {
  const queryClient = useQueryClient();
  const [currentTab, setCurrentTab] = useState('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('pending');
  const [eFIRDialogOpen, setEFIRDialogOpen] = useState(false);

  // 🔹 Query for fetching incidents
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['incidents', currentTab, page + 1, rowsPerPage],
    queryFn: () => adminApiService.getIncidents(currentTab, page + 1, rowsPerPage),
    keepPreviousData: true,
  });

  // 🔹 Mutation for updating incident status
  const updateStatusMutation = useMutation({
    mutationFn: ({ incidentId, status }) =>
      adminApiService.updateIncidentStatus(incidentId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      setStatusDialogOpen(false);
      setSelectedIncident(null);
    },
  });

  // 🔹 Mutation for generating eFIR
  const generateEFIRMutation = useMutation({
    mutationFn: (incidentId) => adminApiService.generateEFIR(incidentId),
    onSuccess: (response) => {
      alert(`E-FIR generated successfully! Number: ${response.efirNumber}`);
      setEFIRDialogOpen(false);
      setSelectedIncident(null);
    },
  });

  const handleTabChange = (_event, newValue) => {
    setCurrentTab(newValue);
    setPage(0);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdateStatus = (incident) => {
    setSelectedIncident(incident);
    setNewStatus(incident.status);
    setStatusDialogOpen(true);
  };

  const handleGenerateEFIR = (incident) => {
    setSelectedIncident(incident);
    setEFIRDialogOpen(true);
  };

  const confirmStatusUpdate = () => {
    if (selectedIncident && newStatus) {
      updateStatusMutation.mutate({
        incidentId: selectedIncident.id,
        status: newStatus,
      });
    }
  };

  const confirmEFIRGeneration = () => {
    if (selectedIncident) {
      generateEFIRMutation.mutate(selectedIncident.id);
    }
  };

  const tabsData = [
    { value: 'all', label: 'All Incidents', count: data?.total || 0 },
    {
      value: 'pending',
      label: 'Pending',
      count: data?.data?.filter((i) => i.status === 'pending').length || 0,
    },
    {
      value: 'in_progress',
      label: 'In Progress',
      count: data?.data?.filter((i) => i.status === 'in_progress').length || 0,
    },
    {
      value: 'resolved',
      label: 'Resolved',
      count: data?.data?.filter((i) => i.status === 'resolved').length || 0,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Incident Response Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor and respond to tourist safety incidents
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<Refresh />} onClick={() => refetch()}>
          Refresh Data
        </Button>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={handleTabChange}>
          {tabsData.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {tab.label}
                  <Chip
                    label={tab.count}
                    size="small"
                    color={tab.value === 'pending' ? 'warning' : 'default'}
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell><strong>Incident ID</strong></TableCell>
              <TableCell><strong>Tourist</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Severity</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Reported</strong></TableCell>
              <TableCell><strong>Response Time</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.map((incident) => (
                <TableRow key={incident.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontFamily="monospace" fontWeight="bold">
                      {incident.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2" fontFamily="monospace">
                        {incident.touristId}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{incident.type}</TableCell>
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
                    <Chip
                      label={incident.status.replace('_', ' ')}
                      size="small"
                      icon={getStatusIcon(incident.status)}
                      sx={{
                        bgcolor: getStatusColor(incident.status),
                        color: 'white',
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="body2">{incident.location.address}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(incident.reportedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={incident.estimatedResponseTime}
                      size="small"
                      color={incident.status === 'resolved' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="Update Status">
                        <IconButton onClick={() => handleUpdateStatus(incident)} color="primary" size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Generate E-FIR">
                        <IconButton onClick={() => handleGenerateEFIR(incident)} color="secondary" size="small">
                          <GetApp />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="View Details">
                        <IconButton color="default" size="small">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data?.total || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* Update Status Dialog */}
      <Dialog open={statusDialogOpen} onClose={() => setStatusDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Incident Status</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Incident ID: {selectedIncident?.id}
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} label="Status">
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmStatusUpdate} variant="contained" disabled={updateStatusMutation.isPending}>
            {updateStatusMutation.isPending ? <CircularProgress size={20} /> : 'Update Status'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* E-FIR Dialog */}
      <Dialog open={eFIRDialogOpen} onClose={() => setEFIRDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate E-FIR</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            This will generate an Electronic First Information Report for the selected incident.
          </Alert>
          <Typography variant="body2" gutterBottom><strong>Incident ID:</strong> {selectedIncident?.id}</Typography>
          <Typography variant="body2" gutterBottom><strong>Type:</strong> {selectedIncident?.type}</Typography>
          <Typography variant="body2" gutterBottom><strong>Severity:</strong> {selectedIncident?.severity}</Typography>
          <Typography variant="body2"><strong>Tourist ID:</strong> {selectedIncident?.touristId}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEFIRDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={confirmEFIRGeneration}
            variant="contained"
            color="secondary"
            disabled={generateEFIRMutation.isPending}
          >
            {generateEFIRMutation.isPending ? <CircularProgress size={20} /> : 'Generate E-FIR'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Incidents;