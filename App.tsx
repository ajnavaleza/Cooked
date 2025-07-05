import React, { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppNavigator from './src/navigation/AppNavigator';
import { OnboardingProvider } from './src/screens/onboarding/OnboardingContext';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const loadResources = useCallback(async () => {
    try {
      // Load fonts
      await Font.loadAsync({
        'Obviously Narrow Medium': require('./src/assets/Obviously Narrow Medium.ttf'),
        'Obviously Narrow Semibold': require('./src/assets/Obviously Narrow Semibold.ttf'),
      });
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
    }
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  React.useEffect(() => {
    loadResources();
  }, [loadResources]);

  if (!appIsReady) {
    return null;
  }

  return (
    <OnboardingProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style="light" />
        <AppNavigator />
      </View>
    </OnboardingProvider>
  );
}
