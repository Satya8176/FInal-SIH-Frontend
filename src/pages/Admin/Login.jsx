import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper,
} from '@mui/material';
import { Shield, Login as LoginIcon } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { adminApiService } from '../../api/adminApi';
import useAdminStore from '../../store/adminStore';

const AdminLogin = () => {
  const navigate = useNavigate();
  const login = useAdminStore((state) => state.login);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // local loading state
  const [error, setError] = useState(null);

  const loginMutation = useMutation({
    mutationFn: (creds) => adminApiService.login(creds),
    onMutate: () => {
      setLoading(true);
      setError(null);
    },
    onSuccess: (data) => {
      login(data.user);
      navigate('/admin/dashboard');
    },
    onError: (err) => {
      setError(err.message || 'Login failed');
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Shield sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
            <Typography variant="h4" fontWeight="bold" color="#1976d2" gutterBottom>
              Smart Tourist Safety
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Admin Portal
            </Typography>
          </Box>

          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" fontWeight="600" gutterBottom>
                    Administrator Login
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Access the administrative dashboard
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  name="username"
                  label="Username"
                  value={credentials.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                  sx={{
                    py: 1.5,
                    fontWeight: 'bold',
                    borderRadius: 2,
                    background: 'linear-gradient(45deg, #1976d2, #1565c0)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #1565c0, #0d47a1)',
                    },
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>

                <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Demo Credentials:
                  </Typography>
                  <Typography variant="body2" align="center" sx={{ fontFamily: 'monospace' }}>
                    Username: <strong>admin</strong> | Password: <strong>admin123</strong>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;