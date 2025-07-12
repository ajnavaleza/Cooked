import axios from 'axios';
import { API_CONFIG } from '../config/api';

export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  summary: string;
  diets: string[];
  analyzedInstructions: {
    steps: {
      number: number;
      step: string;
    }[];
  }[];
  extendedIngredients: {
    amount: number;
    unit: string;
    name: string;
  }[];
  nutrition?: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  };
}

const spoonacularAPI = axios.create({
  baseURL: API_CONFIG.SPOONACULAR_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  params: {
    apiKey: API_CONFIG.SPOONACULAR_API_KEY,
  },
});

// Add error handling
spoonacularAPI.interceptors.response.use(
  response => response,
  error => {
    throw error;
  }
);

// API functions
export const spoonacularApi = {
  searchRecipes: async (params: {
    query?: string;
    cuisine?: string;
    diet?: string;
    type?: string;
    intolerances?: string;
    includeIngredients?: string;
    excludeIngredients?: string;
    fillIngredients?: boolean;
    addRecipeInformation?: boolean;
    addRecipeNutrition?: boolean;
    number?: number;
    offset?: number;
    sort?: string;
    sortDirection?: 'asc' | 'desc';
  }) => {
    const response = await spoonacularAPI.get('/complexSearch', { params });
    return response.data;
  },

  getRandomRecipes: async (params: {
    limitLicense?: boolean;
    tags?: string;
    number?: number;
    include_nutrition?: boolean;
  } = {}) => {
    const response = await spoonacularAPI.get('/random', { params });
    return response.data;
  },

  getRecipeInformation: async (id: number, params: {
    includeNutrition?: boolean;
    addWinePairing?: boolean;
    addTasteData?: boolean;
  } = {}): Promise<SpoonacularRecipe> => {
    const response = await spoonacularAPI.get(`/${id}/information`, { params });
    return response.data;
  },

  getSimilarRecipes: async (id: number, number: number = 3) => {
    const response = await spoonacularAPI.get(`/${id}/similar`, {
      params: { number }
    });
    return response.data;
  },
};

export default spoonacularApi; 