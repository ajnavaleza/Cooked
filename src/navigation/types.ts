import type { OnboardingStackParamList } from '../screens/onboarding/OnboardingNavigator';

export type MainStackParamList = {
  MainTabs: undefined;
  RecipeDetails: { recipeId: number };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditPreferences: undefined;
  EditProfile: undefined;
};

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Recipes: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  CreateAccount: undefined;
  LoginLoading: undefined;
  Main: undefined;
  Onboarding: undefined;
}; 