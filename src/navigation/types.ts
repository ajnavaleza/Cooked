import type { OnboardingStackParamList } from '../screens/onboarding/OnboardingNavigator';

interface UserPreferences {
  cuisines?: string[];
  diets?: string[];
  allergies?: string[];
  recipeTypes?: string[];
  allergyOther?: string;
}

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditPreferences: {
    currentPreferences: UserPreferences;
    onSave: (preferences: UserPreferences) => void;
  };
  EditProfile: {
    currentProfile: {
      name?: string;
      birthday?: string;
    };
    onSave: (profile: { name?: string; birthday?: string }) => void;
  };
};

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  CreateAccount: undefined;
  LoginLoading: undefined;
  Main: undefined;
  Onboarding: undefined;
}; 