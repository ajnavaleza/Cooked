import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../screens/auth/LandingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import CreateAccountScreen from '../screens/auth/CreateAccountScreen';
import LoginScreenLoading from '../screens/auth/LoginScreenLoading';
import { Platform } from 'react-native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  CreateAccount: undefined;
  LoginLoading: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
  animationTypeForReplace: 'push',
  presentation: 'card',
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  fullScreenGestureEnabled: true,
  animationDuration: 400,
};

const fadeScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
  presentation: 'transparentModal',
  gestureEnabled: false,
  animationDuration: 300,
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
      >
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="CreateAccount" 
          component={CreateAccountScreen}
        />
        <Stack.Screen 
          name="LoginLoading" 
          component={LoginScreenLoading}
          options={fadeScreenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 