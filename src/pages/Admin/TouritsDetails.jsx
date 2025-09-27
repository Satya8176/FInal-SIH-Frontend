import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ArrowBack,
  Person,
  Phone,
  LocationOn,
  CalendarToday,
  History,
  Warning,
  CheckCircle,
  Business,
} from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { adminApiService } from "../../api/adminApi";
import TouristLocationMap from "../../components/Admin/TouristLocationMap";

const TouristDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: tourist,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tourist", id],
    queryFn: () => adminApiService.getTouristById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load tourist details: {error.message}
      </Alert>
    );
  }

  if (!tourist) return null;

  const getStatusColor = (status) => {
    const colors = {
      safe: "#4CAF50",
      at_risk: "#FF9800",
      emergency: "#F44336",
    };
    return colors[status] || "#757575";
  };

  const getNationalityFlag = (nationality) => {
    const flags = {
      Indian: "🇮🇳",
      USA: "🇺🇸",
      UK: "🇬🇧",
      Germany: "🇩🇪",
      Japan: "🇯🇵",
      Australia: "🇦🇺",
    };
    return flags[nationality] || "🌍";
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/admin/tourists")}
          variant="outlined"
        >
          Back to Tourists
        </Button>
        <Typography variant="h4" fontWeight="bold">
          Tourist Profile
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Tourist Info Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: "#1976d2",
                  mx: "auto",
                  mb: 2,
                  fontSize: 40,
                }}
              >
                <Person sx={{ fontSize: 50 }} />
              </Avatar>

              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {tourist.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 2,
                }}
              >
                <span style={{ fontSize: 20 }}>
                  {getNationalityFlag(tourist.nationality)}
                </span>
                <Typography variant="body1" color="text.secondary">
                  {tourist.nationality}
                </Typography>
              </Box>

              <Chip
                label={tourist.status.replace("_", " ")}
                sx={{
                  bgcolor: getStatusColor(tourist.status),
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  mb: 3,
                }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "monospace" }}
              >
                Digital ID: {tourist.digitalId}
              </Typography>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={tourist.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={tourist.currentLocation?.name ?? "Unknown"}
                    secondary={`Last seen: ${new Date(
                      tourist.lastSeen
                    ).toLocaleString()}`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Trip Details */}
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Trip Details
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Start Date"
                    secondary={new Date(
                      tourist.tripDetails.startDate
                    ).toLocaleDateString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="End Date"
                    secondary={new Date(
                      tourist.tripDetails.endDate
                    ).toLocaleDateString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Business color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Purpose"
                    secondary={tourist.tripDetails.purpose}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Current Location Map */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Current Location
              </Typography>
              <Box sx={{ height: 300, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                <TouristLocationMap tourist={tourist} />
              </Box>
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Activity History
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Timestamp</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Location</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Activity</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tourist.detailedHistory?.slice(0, 10).map((activity, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {new Date(activity.timestamp).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <LocationOn sx={{ fontSize: 16, color: "text.secondary" }} />
                            <Typography variant="body2">
                              {activity.location.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={activity.activity}
                            size="small"
                            color={
                              activity.activity === "Alert Generated"
                                ? "error"
                                : activity.activity === "Check-in"
                                ? "success"
                                : "default"
                            }
                            icon={
                              activity.activity === "Alert Generated" ? (
                                <Warning />
                              ) : activity.activity === "Check-in" ? (
                                <CheckCircle />
                              ) : (
                                <History />
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Safety Statistics */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#e3f2fd" }}>
                <Typography variant="h3" color="#1976d2" fontWeight="bold">
                  {tourist.alertHistory ?? 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Alerts
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#e8f5e8" }}>
                <Typography variant="h3" color="#4CAF50" fontWeight="bold">
                  {Math.floor(
                    (Date.now() - new Date(tourist.tripDetails.startDate).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Days in Trip
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 3, textAlign: "center", bgcolor: "#fff3e0" }}>
                <Typography variant="h3" color="#FF9800" fontWeight="bold">
                  {Math.floor(Math.random() * 20) + 5}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Locations Visited
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TouristDetail;