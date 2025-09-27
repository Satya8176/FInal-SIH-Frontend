import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI, LoginData, RegisterData } from '../api/auth';

export const useAuthOperations = () => {
  const { login, logout, setLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: LoginData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(data);
      login(response.user, response.token);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.register(data);
      login(response.user, response.token);
    } catch (err) {
      setError('Registration failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await authAPI.logout();
      logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    error,
    setError,
  };
};