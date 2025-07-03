import Constants from 'expo-constants';

// API Configuration
export const API_CONFIG = {
  // External Recipe API Configuration
  SPOONACULAR_API_KEY: (Constants.expoConfig?.extra?.SPOONACULAR_API_KEY || '').trim(),
  SPOONACULAR_BASE_URL: 'https://api.spoonacular.com',
  
  // Backend Configuration
  LOCAL_API_BASE_URL: Constants.expoConfig?.extra?.LOCAL_API_URL || 'http://192.168.1.154:5000/api',
  
  // Cache Configuration
  CACHE_TIMEOUT: 5 * 60 * 1000, // 5 minutes
  
  // Request Configuration
  REQUEST_TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 3,
};

// Environment check
export const isDevelopment = __DEV__;
export const isProduction = !__DEV__;

// Debug function to check API key
export const debugApiKey = () => {
  console.log('[API_CONFIG] Debug Info:', {
    hasExpoKey: !!Constants.expoConfig?.extra?.SPOONACULAR_API_KEY,
    finalKey: API_CONFIG.SPOONACULAR_API_KEY ? `${API_CONFIG.SPOONACULAR_API_KEY.slice(0, 8)}...` : 'MISSING',
    keyLength: API_CONFIG.SPOONACULAR_API_KEY?.length || 0
  });
};

export default API_CONFIG; 