import Constants from 'expo-constants';

const getApiBaseUrl = () => {
  // Use environment variable if available, otherwise fallback to local
  const deployedUrl = Constants.expoConfig?.extra?.API_BASE_URL;
  const localUrl = 'http://192.168.1.154:5000';
  
  return deployedUrl || localUrl;
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  SPOONACULAR_API_KEY: (Constants.expoConfig?.extra?.SPOONACULAR_API_KEY || '').trim(),
  SPOONACULAR_BASE_URL: 'https://api.spoonacular.com/recipes',
  LOCAL_API_URL: getApiBaseUrl(),
  LOCAL_API_BASE_URL: getApiBaseUrl(),
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 150,
  REQUEST_DELAY: 1000 / (150 / 60), // Delay between requests
  // Batch settings
  MAX_BATCH_SIZE: 10,
  BATCH_DELAY: 2000,
  // Feature flags
  ENABLE_CACHE: true,
  ENABLE_OFFLINE_MODE: false,
  DEBUG_MODE: false,
}; 