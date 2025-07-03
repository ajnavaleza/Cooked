import axios from 'axios';
import { API_CONFIG } from '../config/api';

console.log('[Spoonacular] Initializing with API key:', API_CONFIG.SPOONACULAR_API_KEY ? `${API_CONFIG.SPOONACULAR_API_KEY.slice(0, 8)}...` : 'MISSING');

const spoonacularAPI = axios.create({
  baseURL: API_CONFIG.SPOONACULAR_BASE_URL,
  timeout: API_CONFIG.REQUEST_TIMEOUT,
  headers: {
    'x-api-key': API_CONFIG.SPOONACULAR_API_KEY,
  },
  params: {
    apiKey: API_CONFIG.SPOONACULAR_API_KEY,
  },
});

// Add request interceptor for debugging
spoonacularAPI.interceptors.request.use(
  (config) => {
    console.log('[Spoonacular] Making request to:', config.url);
    console.log('[Spoonacular] Headers:', config.headers);
    console.log('[Spoonacular] Params:', config.params);
    return config;
  },
  (error) => {
    console.error('[Spoonacular] Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
spoonacularAPI.interceptors.response.use(
  (response) => {
    console.log('[Spoonacular] Response status:', response.status);
    return response;
  },
  (error) => {
    console.error('[Spoonacular] Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Types for Spoonacular API responses
export interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  imageType: string;
  readyInMinutes: number;
  servings: number;
  aggregateLikes: number;
  spoonacularScore: number;
  healthScore: number;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  analyzedInstructions: AnalyzedInstruction[];
  extendedIngredients: ExtendedIngredient[];
  nutrition?: NutritionInfo;
}

export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}

export interface InstructionStep {
  number: number;
  step: string;
  ingredients: StepIngredient[];
  equipment: StepEquipment[];
}

export interface StepIngredient {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface StepEquipment {
  id: number;
  name: string;
  localizedName: string;
  image: string;
}

export interface ExtendedIngredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
}

export interface NutritionInfo {
  nutrients: {
    name: string;
    amount: number;
    unit: string;
    percentOfDailyNeeds: number;
  }[];
  properties: {
    name: string;
    amount: number;
    unit: string;
  }[];
  flavonoids: {
    name: string;
    amount: number;
    unit: string;
  }[];
  ingredients: {
    id: number;
    name: string;
    amount: number;
    unit: string;
    nutrients: {
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }[];
  }[];
  caloricBreakdown: {
    percentProtein: number;
    percentFat: number;
    percentCarbs: number;
  };
  weightPerServing: {
    amount: number;
    unit: string;
  };
}

export interface RecipeSearchResult {
  results: SpoonacularRecipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface RandomRecipesResult {
  recipes: SpoonacularRecipe[];
}

// API functions
export const spoonacularApi = {
  // Search recipes with various filters
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
  }): Promise<RecipeSearchResult> => {
    const response = await spoonacularAPI.get('/recipes/complexSearch', { params });
    return response.data;
  },

  // Get random recipes
  getRandomRecipes: async (params: {
    limitLicense?: boolean;
    tags?: string;
    number?: number;
    include_nutrition?: boolean;
  } = {}): Promise<RandomRecipesResult> => {
    const response = await spoonacularAPI.get('/recipes/random', { params });
    return response.data;
  },

  // Get recipe information by ID
  getRecipeInformation: async (id: number, params: {
    includeNutrition?: boolean;
    addWinePairing?: boolean;
    addTasteData?: boolean;
  } = {}): Promise<SpoonacularRecipe> => {
    const response = await spoonacularAPI.get(`/recipes/${id}/information`, { params });
    return response.data;
  },

  // Get similar recipes
  getSimilarRecipes: async (id: number, number: number = 3): Promise<{ id: number; title: string; imageType: string; readyInMinutes: number; servings: number; sourceUrl: string }[]> => {
    const response = await spoonacularAPI.get(`/recipes/${id}/similar`, {
      params: { number }
    });
    return response.data;
  },

  // Search recipes by ingredients
  searchRecipesByIngredients: async (ingredients: string[], params: {
    number?: number;
    limitLicense?: boolean;
    ranking?: number;
    ignorePantry?: boolean;
  } = {}): Promise<{
    id: number;
    title: string;
    image: string;
    imageType: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
    missedIngredients: any[];
    usedIngredients: any[];
    unusedIngredients: any[];
    likes: number;
  }[]> => {
    const response = await spoonacularAPI.get('/recipes/findByIngredients', {
      params: {
        ...params,
        ingredients: ingredients.join(',')
      }
    });
    return response.data;
  },

  // Get recipe nutrition by ID
  getRecipeNutrition: async (id: number): Promise<NutritionInfo> => {
    const response = await spoonacularAPI.get(`/recipes/${id}/nutritionWidget.json`);
    return response.data;
  },

  // Get recipe instructions
  getRecipeInstructions: async (id: number): Promise<AnalyzedInstruction[]> => {
    const response = await spoonacularAPI.get(`/recipes/${id}/analyzedInstructions`);
    return response.data;
  },

  // Get recipe ingredients
  getRecipeIngredients: async (id: number): Promise<ExtendedIngredient[]> => {
    const response = await spoonacularAPI.get(`/recipes/${id}/ingredientWidget.json`);
    return response.data.ingredients;
  },

  // Search recipes by nutrients
  searchRecipesByNutrients: async (params: {
    minCarbs?: number;
    maxCarbs?: number;
    minProtein?: number;
    maxProtein?: number;
    minCalories?: number;
    maxCalories?: number;
    minFat?: number;
    maxFat?: number;
    minAlcohol?: number;
    maxAlcohol?: number;
    minCaffeine?: number;
    maxCaffeine?: number;
    minCopper?: number;
    maxCopper?: number;
    minCalcium?: number;
    maxCalcium?: number;
    minCholine?: number;
    maxCholine?: number;
    minCholesterol?: number;
    maxCholesterol?: number;
    minFluoride?: number;
    maxFluoride?: number;
    minSaturatedFat?: number;
    maxSaturatedFat?: number;
    minVitaminA?: number;
    maxVitaminA?: number;
    minVitaminC?: number;
    maxVitaminC?: number;
    minVitaminD?: number;
    maxVitaminD?: number;
    minVitaminE?: number;
    maxVitaminE?: number;
    minVitaminK?: number;
    maxVitaminK?: number;
    minVitaminB1?: number;
    maxVitaminB1?: number;
    minVitaminB2?: number;
    maxVitaminB2?: number;
    minVitaminB5?: number;
    maxVitaminB5?: number;
    minVitaminB3?: number;
    maxVitaminB3?: number;
    minVitaminB6?: number;
    maxVitaminB6?: number;
    minVitaminB12?: number;
    maxVitaminB12?: number;
    minFiber?: number;
    maxFiber?: number;
    minFolate?: number;
    maxFolate?: number;
    minFolicAcid?: number;
    maxFolicAcid?: number;
    minIodine?: number;
    maxIodine?: number;
    minIron?: number;
    maxIron?: number;
    minMagnesium?: number;
    maxMagnesium?: number;
    minManganese?: number;
    maxManganese?: number;
    minPhosphorus?: number;
    maxPhosphorus?: number;
    minPotassium?: number;
    maxPotassium?: number;
    minSelenium?: number;
    maxSelenium?: number;
    minSodium?: number;
    maxSodium?: number;
    minSugar?: number;
    maxSugar?: number;
    minZinc?: number;
    maxZinc?: number;
    offset?: number;
    number?: number;
    random?: boolean;
    limitLicense?: boolean;
  }): Promise<SpoonacularRecipe[]> => {
    const response = await spoonacularAPI.get('/recipes/findByNutrients', { params });
    return response.data;
  },

  // Get autocomplete recipe search
  autocompleteRecipeSearch: async (query: string, number: number = 10): Promise<{ id: number; title: string; imageType: string }[]> => {
    const response = await spoonacularAPI.get('/recipes/autocomplete', {
      params: { query, number }
    });
    return response.data;
  },
};

// Helper functions to transform Spoonacular data to app format
export const transformSpoonacularRecipe = (recipe: SpoonacularRecipe) => ({
  id: recipe.id.toString(),
  title: recipe.title,
  image: recipe.image,
  servingSize: recipe.servings,
  minutes: recipe.readyInMinutes,
  difficulty: (recipe.spoonacularScore > 80 ? 'Easy' : recipe.spoonacularScore > 60 ? 'Medium' : 'Advanced') as 'Easy' | 'Medium' | 'Advanced',
  description: recipe.summary?.replace(/<[^>]*>/g, '').substring(0, 150) + '...', // Remove HTML tags and truncate
  cuisines: recipe.cuisines,
  dishTypes: recipe.dishTypes,
  diets: recipe.diets,
  healthScore: recipe.healthScore,
  likes: recipe.aggregateLikes,
  instructions: recipe.analyzedInstructions,
  ingredients: recipe.extendedIngredients,
  nutrition: recipe.nutrition,
});

export default spoonacularApi; 