import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Lazy load screens
const HomeScreen = React.lazy(() => import('../screens/main/HomeScreen'));
const ExploreScreen = React.lazy(() => import('../screens/main/ExploreScreen'));
const RecipesScreen = React.lazy(() => import('../screens/main/RecipesScreen'));
const ProfileScreen = React.lazy(() => import('../screens/main/ProfileScreen'));

const Tab = createBottomTabNavigator();

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

const MainAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#C84B31',
        tabBarInactiveTintColor: '#666666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        children={(props) => <LazyScreen component={HomeScreen} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        children={(props) => <LazyScreen component={ExploreScreen} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Recipes"
        children={(props) => <LazyScreen component={RecipesScreen} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={(props) => <LazyScreen component={ProfileScreen} {...props} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
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
  },
});

export default MainAppNavigator; 