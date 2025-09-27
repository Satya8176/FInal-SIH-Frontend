import { useState, useEffect, useMemo } from 'react';
import { Alert } from '../api/location';

export const useAlerts = (alerts: Alert[]) => {
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);

  // Calculate unread count using useMemo (avoids unnecessary state updates)
  const unreadCount = useMemo(
    () => alerts.filter(alert => !alert.resolved).length,
    [alerts]
  );

  // Initialize filteredAlerts once when alerts change
  useEffect(() => {
    setFilteredAlerts(alerts);
  }, [alerts]);

  const filterAlerts = (severity?: string, resolved?: boolean) => {
    let filtered = alerts;

    if (severity) {
      filtered = filtered.filter(alert => alert.severity === severity);
    }

    if (resolved !== undefined) {
      filtered = filtered.filter(alert => alert.resolved === resolved);
    }

    setFilteredAlerts(filtered);
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'panic':
        return '🚨';
      case 'geofence_breach':
        return '⚠️';
      case 'route_deviation':
        return '📍';
      case 'inactive':
        return '😴';
      case 'sudden_stop':
        return '🛑';
      default:
        return '📢';
    }
  };

  const getAlertColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'error';
      case 'high':
        return 'warning';
      case 'medium':
        return 'info';
      case 'low':
        return 'success';
      default:
        return 'info';
    }
  };

  return {
    unreadCount,
    filteredAlerts,
    filterAlerts,
    getAlertIcon,
    getAlertColor,
  };
};
