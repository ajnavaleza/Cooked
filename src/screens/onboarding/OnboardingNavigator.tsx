import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import CuisinesScreen from './CuisinesScreen';
import DietsScreen from './DietsScreen';
import AllergiesScreen from './AllergiesScreen';
import CompletionScreen from './CompletionScreen';

export type OnboardingStackParamList = {
  Cuisines: undefined;
  Diets: undefined;
  Allergies: undefined;
  Completion: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
  animation: 'slide_from_right',
  animationDuration: 800,
};

const OnboardingNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Cuisines" component={CuisinesScreen} />
    <Stack.Screen name="Diets" component={DietsScreen} />
    <Stack.Screen name="Allergies" component={AllergiesScreen} />
    <Stack.Screen name="Completion" component={CompletionScreen} />
  </Stack.Navigator>
);

export default OnboardingNavigator; 