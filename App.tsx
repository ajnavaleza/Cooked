import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import { Asset } from 'expo-asset';
import { OnboardingProvider } from './src/screens/onboarding/OnboardingContext';

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadAssets() {
      try {
        // Load fonts
        await Font.loadAsync({
          'Obviously Narrow Medium': require('./src/assets/Obviously Narrow Medium.ttf'),
          'Obviously Narrow Semibold': require('./src/assets/Obviously Narrow Semibold.ttf'),
        });

        // Preload background images
        await Promise.all([
          Asset.loadAsync(require('./src/assets/auth/landing-page/landing-page.jpg')),
          Asset.loadAsync(require('./src/assets/auth/login-page/login-page.jpg')),
          Asset.loadAsync(require('./src/assets/auth/login-loading/login-loading.png')),
          Asset.loadAsync(require('./src/assets/auth/create-acc-page/create-acc.jpg')),
        ]);

        setAssetsLoaded(true);
      } catch (error) {
        console.error('Error loading assets:', error);
        setAssetsLoaded(true);
      }
    }

    loadAssets();
  }, []);

  if (!assetsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#4A3531" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <OnboardingProvider>
        <AppNavigator />
      </OnboardingProvider>
    </>
  );
}
