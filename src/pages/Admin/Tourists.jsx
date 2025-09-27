import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputAdornment,
  CircularProgress,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search,
  Visibility,
  LocationOn,
  Phone,
  Person,
  FilterList,
  Refresh,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { adminApiService } from '../../api/adminApi';


const getStatusColor = (status) => {
  const colors = {
    safe: '#4CAF50',
    at_risk: '#FF9800',
    emergency: '#F44336',
  };
  return colors[status] ?? '#757575';
};

const getStatusIcon = (status) => {
  if (status === 'safe') return '✓';
  if (status === 'at_risk') return '⚠️';
  if (status === 'emergency') return '🚨';
  return '?';
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
  return flags[nationality] ?? '🌍';
};


const Tourists = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['tourists', page + 1, rowsPerPage, debouncedSearch],
    queryFn: async () => {

      const res = await adminApiService.getTourists(page + 1, rowsPerPage, debouncedSearch);

      const apiList = Array.isArray(res?.data) ? (res.data) : [];

      const mapped = apiList.map((t) => ({
        id: String(t.id ?? ''),
        name: t.name ?? 'Unknown',
        digitalId: t.digitalId ?? (t).digital_id ?? '',
        phone: t.phone ?? '-',
        nationality: t.nationality ?? 'Unknown',
        currentLocation: { name: t.currentLocation?.name ?? t.current_location?.name ?? 'Unknown' },
        status: (t.status) ?? 'safe',
        lastSeen: t.lastSeen ?? (t).last_seen ?? new Date().toISOString(),
        alertHistory: Number(t.alertHistory ?? (t).alert_history ?? 0),
      }));

      return {
        total: typeof res?.total === 'number' ? res.total : mapped.length,
        data: mapped,
        page: res?.page,
        totalPages: res?.totalPages,
      };
    },
    keepPreviousData: true,
  });

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewTourist = (touristId) => {
    navigate(`/admin/tourists/${touristId}`);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Tourist Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and manage tourist profiles and their safety status
        </Typography>
      </Box>

      {/* Search and Actions */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, minWidth: 300 }}
            />
            <Button variant="outlined" startIcon={<FilterList />} sx={{ height: 56 }}>
              Filters
            </Button>
            <Button variant="outlined" startIcon={<Refresh />} onClick={() => refetch()} sx={{ height: 56 }}>
              Refresh
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Card sx={{ flex: 1, bgcolor: '#e3f2fd' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="#1976d2" fontWeight="bold">
              {data?.total ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Tourists
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, bgcolor: '#e8f5e8' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="#4CAF50" fontWeight="bold">
              {data?.data?.filter((t) => t.status === 'safe').length ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Safe Status
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, bgcolor: '#fff3e0' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="#FF9800" fontWeight="bold">
              {data?.data?.filter((t) => t.status === 'at_risk').length ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              At Risk
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, bgcolor: '#ffebee' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="#F44336" fontWeight="bold">
              {data?.data?.filter((t) => t.status === 'emergency').length ?? 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Emergency
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tourists Table */}
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                <TableCell><strong>Tourist</strong></TableCell>
                <TableCell><strong>Digital ID</strong></TableCell>
                <TableCell><strong>Contact</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Last Seen</strong></TableCell>
                <TableCell><strong>Alerts</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.map((tourist) => (
                  <TableRow key={tourist.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 40, height: 40, bgcolor: '#1976d2' }}>
                          <Person />
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="500">
                            {tourist.name}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <span>{getNationalityFlag(tourist.nationality)}</span>
                            <Typography variant="caption" color="text.secondary">
                              {tourist.nationality}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {tourist.digitalId}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">{tourist.phone}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">{tourist.currentLocation.name}</Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={String(tourist.status).replace('_', ' ')}
                        size="small"
                        icon={<span>{getStatusIcon(tourist.status)}</span>}
                        sx={{
                          bgcolor: getStatusColor(tourist.status),
                          color: 'white',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body2">
                        {new Date(tourist.lastSeen).toLocaleString()}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={tourist.alertHistory}
                        size="small"
                        color={tourist.alertHistory > 2 ? 'error' : 'default'}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>

                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton onClick={() => handleViewTourist(tourist.id)} color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={data?.total ?? 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Card>
    </Box>
  );
};

export default Tourists;