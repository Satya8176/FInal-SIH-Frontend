import React, { useState } from 'react';
import { Container, Paper, Box } from '@mui/material';
import { LoginForm } from '../components/Forms/LoginForm';
import { RegisterForm } from '../components/Forms/RegisterForm';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4,
        }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            width: '100%',
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
          }}
        >
          {isLogin ? (
            <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
          )}
        </Paper>
      </Box>
    </Container>
  );
};