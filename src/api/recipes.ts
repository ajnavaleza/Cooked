import { spoonacularApi, transformSpoonacularRecipe, SpoonacularRecipe } from './spoonacular';
import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api';

// Recipe types
export interface Recipe {
  id: string;
  title: string;
  image: string;
  servingSize: number;
  minutes: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  description: string;
  cuisines?: string[];
  dishTypes?: string[];
  diets?: string[];
  healthScore?: number;
  likes?: number;
  instructions?: any[];
  ingredients?: any[];
  nutrition?: any;
  source: 'spoonacular' | 'local';
}

export interface RecipeFilters {
  query?: string;
  cuisine?: string;
  diet?: string;
  type?: string;
  intolerances?: string;
  maxReadyTime?: number;
  minHealthScore?: number;
  sort?: 'popularity' | 'healthiness' | 'price' | 'time' | 'random';
}

export interface PaginatedRecipes {
  recipes: Recipe[];
  totalResults: number;
  offset: number;
  hasMore: boolean;
}

class RecipeAPI {
  private cache: Map<string, Recipe[]> = new Map();
  private cacheTimeout = 5 * 60 * 1000;
  private cacheTimestamps: Map<string, number> = new Map();
  protected api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.LOCAL_API_BASE_URL,
    });

    this.api.interceptors.request.use(async (config) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  private isCacheValid(key: string): boolean {
    const timestamp = this.cacheTimestamps.get(key);
    if (!timestamp) return false;
    return Date.now() - timestamp < this.cacheTimeout;
  }

  private setCacheData(key: string, data: Recipe[]): void {
    this.cache.set(key, data);
    this.cacheTimestamps.set(key, Date.now());
  }

  private getCacheData(key: string): Recipe[] | null {
    if (this.isCacheValid(key)) {
      return this.cache.get(key) || null;
    }
    return null;
  }

  // Search recipes
  async searchRecipes(filters: RecipeFilters = {}, page: number = 0, limit: number = 12): Promise<PaginatedRecipes> {
    try {
      const cacheKey = `search_${JSON.stringify(filters)}_${page}_${limit}`;
      const cachedData = this.getCacheData(cacheKey);
      
      if (cachedData) {
        return {
          recipes: cachedData,
          totalResults: cachedData.length * 10,
          offset: page * limit,
          hasMore: cachedData.length === limit,
        };
      }

      const params: any = {
        query: filters.query,
        cuisine: filters.cuisine,
        diet: filters.diet,
        type: filters.type,
        intolerances: filters.intolerances,
        maxReadyTime: filters.maxReadyTime,
        minHealthScore: filters.minHealthScore,
        addRecipeInformation: true,
        fillIngredients: true,
        number: limit,
        offset: page * limit,
        sort: filters.sort || 'popularity',
        sortDirection: 'desc',
      };

      Object.keys(params).forEach(key => 
        params[key] === undefined && delete params[key]
      );

      const result = await spoonacularApi.searchRecipes(params);
      const recipes = result.results.map(recipe => ({
        ...transformSpoonacularRecipe(recipe),
        source: 'spoonacular' as const,
      }));

      this.setCacheData(cacheKey, recipes);

      return {
        recipes,
        totalResults: result.totalResults,
        offset: result.offset,
        hasMore: result.offset + recipes.length < result.totalResults,
      };
    } catch (error) {
      return this.getFallbackRecipes(limit);
    }
  }

  // Get random recipes
  async getRandomRecipes(tags?: string, count: number = 6): Promise<Recipe[]> {
    try {
      const cacheKey = `random_${tags || 'all'}_${count}`;
      const cachedData = this.getCacheData(cacheKey);
      
      if (cachedData) {
        return cachedData;
      }

      const result = await spoonacularApi.getRandomRecipes({
        tags,
        number: count,
        include_nutrition: true,
      });
      
      if (!result.recipes || result.recipes.length === 0) {
        return this.getFallbackRecipes(count).recipes;
      }

      const recipes = result.recipes.map(recipe => ({
        ...transformSpoonacularRecipe(recipe),
        source: 'spoonacular' as const,
      }));

      this.setCacheData(cacheKey, recipes);
      return recipes;
    } catch (error: any) {
      return this.getFallbackRecipes(count).recipes;
    }
  }

  // Get recipe details by ID
  async getRecipeById(id: string): Promise<Recipe | null> {
    try {
      const cacheKey = `recipe_${id}`;
      const cachedData = this.getCacheData(cacheKey);
      
      if (cachedData && cachedData.length > 0) {
        return cachedData[0];
      }

      const recipe = await spoonacularApi.getRecipeInformation(parseInt(id), {
        includeNutrition: true,
      });

      const transformedRecipe = {
        ...transformSpoonacularRecipe(recipe),
        source: 'spoonacular' as const,
      };

      this.setCacheData(cacheKey, [transformedRecipe]);
      return transformedRecipe;
    } catch (error) {
      return null;
    }
  }

  // Get personalized recipes based on user preferences
  async getPersonalizedRecipes(userPreferences: {
    cuisines?: string[];
    diets?: string[];
    recipeTypes?: string[];
    allergies?: string[];
  }, limit: number = 12): Promise<Recipe[]> {
    try {
      const cacheKey = `personalized_${JSON.stringify(userPreferences)}_${limit}`;
      const cachedData = this.getCacheData(cacheKey);
      
      if (cachedData) {
        return cachedData;
      }

      const cuisineQuery = userPreferences.cuisines?.join(',');
      const dietQuery = userPreferences.diets?.join(',');
      const typeQuery = userPreferences.recipeTypes?.join(',');
      const intolerancesQuery = userPreferences.allergies?.join(',');

      const params: any = {
        cuisine: cuisineQuery,
        diet: dietQuery,
        type: typeQuery,
        intolerances: intolerancesQuery,
        addRecipeInformation: true,
        fillIngredients: true,
        number: limit,
        sort: 'popularity',
        sortDirection: 'desc',
      };

      Object.keys(params).forEach(key => 
        params[key] === undefined && delete params[key]
      );

      const result = await spoonacularApi.searchRecipes(params);
      const recipes = result.results.map(recipe => ({
        ...transformSpoonacularRecipe(recipe),
        source: 'spoonacular' as const,
      }));

      this.setCacheData(cacheKey, recipes);
      return recipes;
    } catch (error) {
      return this.getFallbackRecipes(limit).recipes;
    }
  }

  // Search recipes by ingredients
  async searchByIngredients(ingredients: string[], limit: number = 12): Promise<Recipe[]> {
    try {
      const cacheKey = `ingredients_${ingredients.join(',')}_${limit}`;
      const cachedData = this.getCacheData(cacheKey);
      
      if (cachedData) {
        return cachedData;
      }

      const result = await spoonacularApi.searchRecipesByIngredients(ingredients, {
        number: limit,
        ignorePantry: false,
      });

      const detailedRecipes = await Promise.all(
        result.map(async (recipe) => {
          try {
            const detailed = await spoonacularApi.getRecipeInformation(recipe.id);
            return {
              ...transformSpoonacularRecipe(detailed),
              source: 'spoonacular' as const,
            };
          } catch (error) {
            return {
              id: recipe.id.toString(),
              title: recipe.title,
              image: recipe.image,
              servingSize: 4,
              minutes: 30,
              difficulty: 'Medium' as const,
              description: `Recipe using ${recipe.usedIngredientCount} of your ingredients`,
              likes: recipe.likes,
              source: 'spoonacular' as const,
            };
          }
        })
      );

      this.setCacheData(cacheKey, detailedRecipes);
      return detailedRecipes;
    } catch (error) {
      return this.getFallbackRecipes(limit).recipes;
    }
  }

  // Get recipe autocomplete suggestions
  async getRecipeSuggestions(query: string): Promise<{ id: string; title: string }[]> {
    try {
      const result = await spoonacularApi.autocompleteRecipeSearch(query, 10);
      return result.map(item => ({
        id: item.id.toString(),
        title: item.title,
      }));
    } catch (error) {
      return [];
    }
  }

  // Save user's favorite recipes
  async saveFavoriteRecipe(userId: string, recipeId: string): Promise<boolean> {
    try {
      await this.api.post('/user/favorites', { recipeId });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Get user's favorite recipes
  async getFavoriteRecipes(userId: string): Promise<Recipe[]> {
    try {
      const response = await this.api.get('/user/favorites');
      const favoriteRecipes = await Promise.all(
        response.data.favorites.map(async (recipeId: string) => {
          return await this.getRecipeById(recipeId);
        })
      );
      return favoriteRecipes.filter((recipe: Recipe | null) => recipe !== null) as Recipe[];
    } catch (error) {
      return [];
    }
  }

  // Save recipe to user's saved recipes
  async saveRecipe(recipeData: {
    title: string;
    difficulty: 'Easy' | 'Intermediate' | 'Advanced';
    recipeId: string;
    sourceType: 'spoonacular' | 'custom';
  }) {
    const response = await this.api.post('/user/recipes', recipeData);
    return response.data;
  }

  // Get user's saved recipes
  async getSavedRecipes() {
    const response = await this.api.get('/user/recipes');
    return response.data;
  }

  // Delete user's saved recipe
  async deleteSavedRecipe(recipeId: string) {
    const response = await this.api.delete(`/user/recipes/${recipeId}`);
    return response.data;
  }

  // Fallback recipes
  private getFallbackRecipes(limit: number): PaginatedRecipes {
    const fallbackRecipes: Recipe[] = [
      {
        id: 'fallback-1',
        title: 'Quick Pasta Salad',
        image: 'https://via.placeholder.com/300x200?text=Pasta+Salad',
        servingSize: 4,
        minutes: 15,
        difficulty: 'Easy' as const,
        description: 'A simple and delicious pasta salad perfect for students.',
        source: 'local' as const,
      },
      {
        id: 'fallback-2',
        title: 'Microwave Mac and Cheese',
        image: 'https://via.placeholder.com/300x200?text=Mac+and+Cheese',
        servingSize: 1,
        minutes: 5,
        difficulty: 'Easy' as const,
        description: 'Quick and easy mac and cheese made in the microwave.',
        source: 'local' as const,
      },
      {
        id: 'fallback-3',
        title: 'Peanut Butter Sandwich',
        image: 'https://via.placeholder.com/300x200?text=PB+Sandwich',
        servingSize: 1,
        minutes: 3,
        difficulty: 'Easy' as const,
        description: 'Classic peanut butter and jelly sandwich.',
        source: 'local' as const,
      },
    ].slice(0, limit);

    return {
      recipes: fallbackRecipes,
      totalResults: fallbackRecipes.length,
      offset: 0,
      hasMore: false,
    };
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheTimestamps.clear();
  }
}

export const recipeApi = new RecipeAPI();
export default recipeApi; 