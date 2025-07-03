import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api';

const API = axios.create({
  baseURL: API_CONFIG.LOCAL_API_BASE_URL,
});

// Add token to all requests
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API; 