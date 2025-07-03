import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { OnboardingProvider } from './src/screens/onboarding/OnboardingContext';

export default function App() {
  return (
    <OnboardingProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </OnboardingProvider>
  );
}
