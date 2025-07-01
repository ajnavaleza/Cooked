import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import CuisinesScreen from './CuisinesScreen';
import DietsScreen from './DietsScreen';
import RecipesScreen from './RecipesScreen';
import AllergiesScreen from './AllergiesScreen';

export type OnboardingStackParamList = {
  Cuisines: undefined;
  Diets: undefined;
  Recipes: undefined;
  Allergies: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerShown: false,
      gestureEnabled: false,
      animation: 'fade',
      animationDuration: 800,
    }}
  >
    <Stack.Screen 
      name="Cuisines" 
      component={CuisinesScreen}
      options={{
        animation: 'fade',
        animationDuration: 800,
      }}
    />
    <Stack.Screen 
      name="Diets" 
      component={DietsScreen}
      options={{
        animation: 'fade',
        animationDuration: 800,
      }}
    />
    <Stack.Screen 
      name="Recipes" 
      component={RecipesScreen}
      options={{
        animation: 'fade',
        animationDuration: 800,
      }}
    />
    <Stack.Screen 
      name="Allergies" 
      component={AllergiesScreen}
      options={{
        animation: 'fade',
        animationDuration: 800,
      }}
    />
  </Stack.Navigator>
);

export default OnboardingNavigator; 