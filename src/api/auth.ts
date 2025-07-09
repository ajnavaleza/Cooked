import API from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingAnswers } from '../screens/onboarding/OnboardingContext';

interface AuthResponse {
  token: string;
  user: {
    email: string;
    name?: string;
    birthday?: string;
    preferences: OnboardingAnswers;
  };
}

const saveToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

export const register = async (email: string, password: string, name?: string, birthday?: string): Promise<AuthResponse> => {
  const res = await API.post('/auth/register', { email, password, name, birthday });
  await saveToken(res.data.token);
  return res.data;
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await API.post('/auth/login', { email, password });
  await saveToken(res.data.token);
  return res.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};

export const getUser = async () => {
  const res = await API.get('/user/me');
  return res.data;
};

export const updatePreferences = async (preferences: OnboardingAnswers) => {
  const res = await API.put('/user/preferences', { preferences });
  return res.data;
};

export const updateProfile = async (updates: { name?: string; email?: string; birthday?: string }) => {
  const res = await API.put('/user/profile', updates);
  return res.data;
}; 