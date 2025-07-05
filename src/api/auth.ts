import API from './index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingAnswers } from '../screens/onboarding/OnboardingContext';
import { API_CONFIG } from '../config/api';

interface AuthResponse {
  token: string;
  user: {
    email: string;
    name?: string;
    birthday?: string;
    preferences: OnboardingAnswers;
  };
}

export const register = async (email: string, password: string, name?: string, birthday?: string): Promise<AuthResponse> => {
  const res = await API.post('/auth/register', { email, password, name, birthday });
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

export const updateUser = async (updates: { preferences?: any }) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    // Send the preferences object directly
    const response = await fetch(`${API_CONFIG.BASE_URL}/user/me/preferences`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferences: updates.preferences }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || 'Failed to update user');
      } catch (e) {
        throw new Error(`Failed to update user: ${errorText}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (name: string, birthday: string) => {
  const res = await API.put('/user/me/profile', { name, birthday });
  return res.data;
}; 