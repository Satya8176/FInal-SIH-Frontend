import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from '../../context/LocationContext';
import { useAuthOperations } from '../../hooks/useAuth';
import { Shield } from 'lucide-react';

export const CustomAppBar = ({ onMenuClick }) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { alerts } = useLocation();
  const { handleLogout } = useAuthOperations();
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = async () => {
    handleMenuClose();
    await handleLogout();
  };

  const unreadAlerts = alerts.filter(alert => !alert.resolved).length;

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Shield size={32} style={{ marginRight: 12 }} />
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Tourist Safety App
        </Typography>

        <IconButton color="inherit">
          <Badge badgeContent={unreadAlerts} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id="primary-search-account-menu"
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem disabled>
          <Typography variant="subtitle2">
            {user?.name || 'User'}
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogoutClick}>
          {t('common.logout')}
        </MenuItem>
      </Menu>
    </AppBar>
  );
};