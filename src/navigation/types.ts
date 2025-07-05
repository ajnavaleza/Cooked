import type { OnboardingStackParamList } from '../screens/onboarding/OnboardingNavigator';

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditPreferences: undefined;
};

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  CreateAccount: undefined;
  LoginLoading: undefined;
  Onboarding: { screen?: keyof OnboardingStackParamList } | undefined;
  MainApp: {
    screen?: string;
    params?: any;
  } | undefined;
}; 