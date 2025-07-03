import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { OnboardingProvider } from './src/screens/onboarding/OnboardingContext';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Obviously Narrow Medium': require('./src/assets/Obviously Narrow Medium.ttf'),
    'Obviously Narrow Semibold': require('./src/assets/Obviously Narrow Semibold.ttf'),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <OnboardingProvider>
      <StatusBar style="light" />
      <AppNavigator />
    </OnboardingProvider>
  );
}
