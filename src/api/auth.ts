import API from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingAnswers } from '../screens/onboarding/OnboardingContext';

interface AuthResponse {
  token: string;
  user: {
    email: string;
    preferences: OnboardingAnswers;
  };
}

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await API.post('/auth/register', { email, password });
  return res.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await API.post('/auth/login', { email, password });
  // Save token for future requests
  await AsyncStorage.setItem('token', res.data.token);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('token');
};

export const getUser = async () => {
  const res = await API.get('/user/me');
  return res.data;
};

export const updatePreferences = async (preferences: OnboardingAnswers) => {
  const res = await API.put('/user/me/preferences', { preferences });
  return res.data;
}; 