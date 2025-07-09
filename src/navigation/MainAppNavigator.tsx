import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import type { ProfileStackParamList, MainStackParamList } from './types';
import { typography } from '../styles/typography';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

// Lazy load screens
const HomeScreen = React.lazy(() => import('../screens/main/HomeScreen'));
const ExploreScreen = React.lazy(() => import('../screens/main/ExploreScreen'));
const SavedRecipesScreen = React.lazy(() => import('../screens/main/SavedRecipesScreen'));
const ProfileScreen = React.lazy(() => import('../screens/main/ProfileScreen'));
const EditPreferencesScreen = React.lazy(() => import('../screens/main/EditPreferencesScreen'));
const EditProfileScreen = React.lazy(() => import('../screens/main/EditProfileScreen'));
const RecipeDetailsScreen = React.lazy(() => import('../screens/main/RecipeDetailsScreen'));

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();

// Common screen options
const commonScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  presentation: 'card',
  animation: Platform.OS === 'ios' ? 'default' : 'fade_from_bottom',
  contentStyle: { backgroundColor: '#FFFFFF' },
};

// Loading component for lazy loaded screens
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#C84B31" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

// Wrapper component for lazy loaded screens
interface LazyScreenProps {
  component: React.ComponentType<any>;
  [key: string]: any;
}

const LazyScreen = ({ component: Component, ...props }: LazyScreenProps) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

// Profile Stack Navigator
const ProfileStackNavigator = () => (
  <ProfileStack.Navigator screenOptions={commonScreenOptions}>
    <ProfileStack.Screen
      name="ProfileMain"
      children={(props) => <LazyScreen component={ProfileScreen} {...props} />}
      options={{ gestureEnabled: true }}
    />
    <ProfileStack.Screen
      name="EditPreferences"
      children={(props) => <LazyScreen component={EditPreferencesScreen} {...props} />}
      options={{ gestureEnabled: false }}
    />
    <ProfileStack.Screen
      name="EditProfile"
      children={(props) => <LazyScreen component={EditProfileScreen} {...props} />}
      options={{ gestureEnabled: false }}
    />
  </ProfileStack.Navigator>
);

// Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#C84B31',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: Platform.OS === 'ios' ? 95 : 90,
        paddingBottom: Platform.OS === 'ios' ? 30 : 25,
        paddingTop: 10,
      },
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 5,
        fontFamily: typography.fonts.medium,
      },
      headerShown: false,
      tabBarLabel: () => null,
    }}
  >
    <Tab.Screen
      name="Home"
      children={(props) => <LazyScreen component={HomeScreen} {...props} />}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      children={(props) => <LazyScreen component={ExploreScreen} {...props} />}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "grid" : "grid-outline"} size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Recipes"
      children={(props) => <LazyScreen component={SavedRecipesScreen} {...props} />}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "bookmark" : "bookmark-outline"} size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainAppNavigator = () => (
  <MainStack.Navigator screenOptions={commonScreenOptions}>
    <MainStack.Screen name="MainTabs" component={TabNavigator} />
    <MainStack.Screen
      name="RecipeDetails"
      children={(props) => <LazyScreen component={RecipeDetailsScreen} {...props} />}
      options={{ animation: 'slide_from_right' }}
    />
  </MainStack.Navigator>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: typography.fonts.regular,
  },
});

export default MainAppNavigator; 