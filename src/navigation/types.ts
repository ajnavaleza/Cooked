import { NavigatorScreenParams } from '@react-navigation/native';

interface UserPreferences {
  cuisines?: string[];
  diets?: string[];
  allergies?: string[];
  recipeTypes?: string[];
  allergyOther?: string;
}

export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  RecipeDetails: { recipeId: string };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditPreferences: undefined;
  EditProfile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  'My Recipes': undefined;
  Profile: undefined;
  RecipeDetails: { recipeId: string };
};

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  CreateAccount: undefined;
  LoginLoading: undefined;
  Main: undefined;
  Onboarding: undefined;
}; 