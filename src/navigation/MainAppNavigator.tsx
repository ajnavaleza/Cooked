import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { typography } from '../styles/typography';

// Lazy load screens
const HomeScreen = React.lazy(() => import('../screens/main/HomeScreen'));
const ExploreScreen = React.lazy(() => import('../screens/main/ExploreScreen'));
const RecipesScreen = React.lazy(() => import('../screens/main/RecipesScreen'));
const ProfileScreen = React.lazy(() => import('../screens/main/ProfileScreen'));
const EditPreferencesScreen = React.lazy(() => import('../screens/main/EditPreferencesScreen'));
const EditProfileScreen = React.lazy(() => import('../screens/main/EditProfileScreen'));

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Loading component for lazy loaded screens
const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#C84B31" />
    <Text style={styles.loadingText}>Loading...</Text>
  </View>
);

// Wrapper component for lazy loaded screens
const LazyScreen = ({ component: Component, ...props }: any) => (
  <Suspense fallback={<LoadingScreen />}>
    <Component {...props} />
  </Suspense>
);

const TabNavigator = () => {
  return (
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
          marginBottom: 0,
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
        children={(props) => <LazyScreen component={RecipesScreen} {...props} />}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "folder" : "folder-outline"} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={(props) => <LazyScreen component={ProfileScreen} {...props} />}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const MainAppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen
        name="EditPreferences"
        children={(props) => <LazyScreen component={EditPreferencesScreen} {...props} />}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        children={(props) => <LazyScreen component={EditProfileScreen} {...props} />}
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: typography.fonts.regular,
  },
});

export default MainAppNavigator; 