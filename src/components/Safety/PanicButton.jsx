import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import { Warning as Emergency, Phone } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLocationOperations } from '../../hooks/useLocation';
import axios from 'axios';

export const PanicButton = () => {
  const { t } = useTranslation();
  const { triggerPanicAlert } = useLocationOperations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      //here we need to call backend function 
      await axios.get("http://localhost:3000/api/v2/send-alert")
      await triggerPanicAlert();
      setOpen(false);
      // In a real app, this would trigger immediate emergency response
    } catch (error) {
      console.error('Failed to trigger panic alert:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="error"
        size="large"
        startIcon={<Emergency />}
        onClick={handleClick}
        sx={{
          minHeight: 60,
          fontSize: '1.1rem',
          fontWeight: 'bold',
          borderRadius: 3,
          boxShadow: 3,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' },
          },
          '&:hover': {
            animation: 'none',
            transform: 'scale(1.05)',
          },
        }}
        fullWidth
      >
        {t('dashboard.panicButton')}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="panic-dialog-title"
        aria-describedby="panic-dialog-description"
      >
        <DialogTitle id="panic-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
          <Phone sx={{ mr: 1, color: 'error.main' }} />
          Emergency Alert
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="panic-dialog-description">
            {t('dashboard.panicConfirm')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            {t('common.cancel')}
          </Button>
          <Button 
            onClick={handleConfirm} 
            color="error" 
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Emergency />}
          >
            {loading ? t('common.loading') : 'TRIGGER ALERT'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};