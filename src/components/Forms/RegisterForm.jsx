import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAuthOperations } from '../../hooks/useAuth';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  phone: Yup.string()
    .matches(/^[+]?[\d\s-()]+$/, 'Invalid phone number')
    .required('Phone number is required'),
  emergencyContact: Yup.string()
    .matches(/^[+]?[\d\s-()]+$/, 'Invalid emergency contact')
    .required('Emergency contact is required'),
  itinerary: Yup.string(),
});

export const RegisterForm = ({ onSwitchToLogin }) => {
  const { t } = useTranslation();
  const { handleRegister, error, setError } = useAuthOperations();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    emergencyContact: '',
    itinerary: '',
  };

  const onSubmit = async (values) => {
    try {
      setError(null);
      const { confirmPassword, ...registerData } = values;
      await handleRegister(registerData);
    } catch (error) {
      // Error is handled in useAuthOperations
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        {t('auth.registerTitle')}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label={t('auth.name')}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  autoComplete="name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label={t('auth.email')}
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label={t('auth.password')}
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  label={t('auth.confirmPassword')}
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label={t('auth.phone')}
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  autoComplete="tel"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="emergencyContact"
                  name="emergencyContact"
                  label={t('auth.emergencyContact')}
                  value={values.emergencyContact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.emergencyContact && Boolean(errors.emergencyContact)}
                  helperText={touched.emergencyContact && errors.emergencyContact}
                  autoComplete="tel"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  fullWidth
                >
                  {t('auth.kycDocument')} (Optional)
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </Button>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="itinerary"
                  name="itinerary"
                  label={t('auth.itinerary')}
                  multiline
                  rows={3}
                  value={values.itinerary}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.itinerary && Boolean(errors.itinerary)}
                  helperText={touched.itinerary && errors.itinerary}
                  placeholder="Brief description of your travel plans..."
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
              size="large"
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  {t('common.loading')}
                </>
              ) : (
                t('auth.registerButton')
              )}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                {t('auth.hasAccount')}{' '}
                <Link
                  component="button"
                  type="button"
                  onClick={onSwitchToLogin}
                  sx={{ textDecoration: 'none' }}
                >
                  {t('auth.loginButton')}
                </Link>
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};