import { spoonacularApi, transformSpoonacularRecipe, SpoonacularRecipe } from './spoonacular';
import API from './index';

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

class RecipeService {
  private cache: Map<string, Recipe[]> = new Map();
  private cacheTimeout = 5 * 60 * 1000;
  private cacheTimestamps: Map<string, number> = new Map();

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
      console.error('Error searching recipes:', error);
      return this.getFallbackRecipes(limit);
    }
  }

  // Get random recipes
  async getRandomRecipes(tags?: string, count: number = 6): Promise<Recipe[]> {
    try {
      console.log(`[RecipeService] Getting ${count} random recipes with tags: ${tags || 'none'}`);
      
      const cacheKey = `random_${tags || 'all'}_${count}`;
      const cachedData = this.getCacheData(cacheKey);
      
      if (cachedData) {
        console.log(`[RecipeService] Returning ${cachedData.length} cached recipes`);
        return cachedData;
      }

      console.log('[RecipeService] Making API call to get random recipes...');
      const result = await spoonacularApi.getRandomRecipes({
        tags,
        number: count,
        include_nutrition: true,
      });

      console.log(`[RecipeService] API returned ${result.recipes?.length || 0} recipes`);
      
      if (!result.recipes || result.recipes.length === 0) {
        console.warn('[RecipeService] API returned no recipes, using fallback');
        return this.getFallbackRecipes(count).recipes;
      }

      const recipes = result.recipes.map(recipe => ({
        ...transformSpoonacularRecipe(recipe),
        source: 'spoonacular' as const,
      }));

      console.log(`[RecipeService] Transformed ${recipes.length} recipes:`, recipes.map(r => ({ title: r.title, source: r.source })));

      this.setCacheData(cacheKey, recipes);
      return recipes;
    } catch (error: any) {
      console.error('[RecipeService] Error getting random recipes:', error);
      console.error('[RecipeService] Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
      console.log('[RecipeService] Returning fallback recipes');
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
      console.error('Error getting recipe by ID:', error);
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
      console.error('Error getting personalized recipes:', error);
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
      console.error('Error searching recipes by ingredients:', error);
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
      console.error('Error getting recipe suggestions:', error);
      return [];
    }
  }

  // Save user's favorite recipes
  async saveFavoriteRecipe(userId: string, recipeId: string): Promise<boolean> {
    try {
      await API.post('/user/favorites', { recipeId });
      return true;
    } catch (error) {
      console.error('Error saving favorite recipe:', error);
      return false;
    }
  }

  // Get user's favorite recipes
  async getFavoriteRecipes(userId: string): Promise<Recipe[]> {
    try {
      const response = await API.get('/user/favorites');
      const favoriteRecipes = await Promise.all(
        response.data.favorites.map(async (recipeId: string) => {
          return await this.getRecipeById(recipeId);
        })
      );
      return favoriteRecipes.filter(recipe => recipe !== null) as Recipe[];
    } catch (error) {
      console.error('Error getting favorite recipes:', error);
      return [];
    }
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

export const recipeService = new RecipeService();
export default recipeService; 