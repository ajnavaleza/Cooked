import API from './index';

export interface SavedRecipe {
  recipeId: string;
}

export class RecipeService {
  // Get saved recipes
  async getSavedRecipes(): Promise<SavedRecipe[]> {
    try {
      const response = await API.get('/user/recipes/saved');
      return response.data;
    } catch (error) {
      console.error('Error getting saved recipes:', error);
      return [];
    }
  }

  // Save a recipe
  async saveRecipe(recipeId: string | number): Promise<boolean> {
    try {
      await API.post('/user/recipes/save', { recipeId: recipeId.toString() });
      return true;
    } catch (error) {
      console.error('Error saving recipe:', error);
      throw error;
    }
  }

  // Unsave a recipe
  async unsaveRecipe(recipeId: string | number): Promise<boolean> {
    try {
      await API.delete(`/user/recipes/save/${recipeId}`);
      return true;
    } catch (error) {
      console.error('Error unsaving recipe:', error);
      throw error;
    }
  }

  // Check if a recipe is saved
  async isRecipeSaved(recipeId: string | number): Promise<boolean> {
    try {
      const savedRecipes = await this.getSavedRecipes();
      return savedRecipes.some(recipe => recipe.recipeId === recipeId.toString());
    } catch (error) {
      console.error('Error checking if recipe is saved:', error);
      return false;
    }
  }
}

export const recipeService = new RecipeService(); 