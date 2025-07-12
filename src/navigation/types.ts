import type { OnboardingStackParamList } from '../screens/onboarding/OnboardingNavigator';

export type MainStackParamList = {
  MainTabs: undefined;
  RecipeDetails: { recipeId: number };
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditPreferences: {
    currentPreferences: {
      cuisines?: string[];
      diets?: string[];
      allergies?: string[];
      recipeTypes?: string[];
      allergyOther?: string;
    };
    onSave: (updatedPreferences: any) => void;
  };
  EditProfile: {
    currentProfile: { name?: string; birthday?: string };
    onSave: (profile: { name?: string; birthday?: string }) => void;
  };
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