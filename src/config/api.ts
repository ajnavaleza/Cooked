import Constants from 'expo-constants';

const getApiBaseUrl = () => {
  return Constants.expoConfig?.extra?.API_BASE_URL || 'https://cooked-production.up.railway.app/api';
};

export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  SPOONACULAR_API_KEY: (Constants.expoConfig?.extra?.SPOONACULAR_API_KEY || '').trim(),
  SPOONACULAR_BASE_URL: 'https://api.spoonacular.com/recipes',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  RATE_LIMIT: {
    MAX_REQUESTS_PER_MINUTE: 150,
    DELAY: 1000 / (150 / 60), // Delay between requests
  },
  BATCH: {
    SIZE: 10,
    DELAY: 2000,
  },
  FEATURES: {
    CACHE: true,
    OFFLINE_MODE: false,
    DEBUG: false,
  },
}; 