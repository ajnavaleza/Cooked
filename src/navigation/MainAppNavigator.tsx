import React, { Suspense } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import type { ProfileStackParamList } from './types';
import { typography } from '../styles/typography';

// Lazy load screens
const HomeScreen = React.lazy(() => import('../screens/main/HomeScreen'));
const ExploreScreen = React.lazy(() => import('../screens/main/ExploreScreen'));
const RecipesScreen = React.lazy(() => import('../screens/main/RecipesScreen'));
const ProfileScreen = React.lazy(() => import('../screens/main/ProfileScreen'));
const EditPreferencesScreen = React.lazy(() => import('../screens/main/EditPreferencesScreen'));

const Tab = createBottomTabNavigator();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

// Custom tab bar icon component
interface TabBarIconProps {
  focused: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, icon, label }) => (
  <View style={styles.tabBarItem}>
    <Ionicons
      name={icon}
      size={28}
      color={focused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)'}
      style={styles.tabBarIcon}
    />
    <Text 
      style={[
        styles.tabBarLabel,
        { color: focused ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)' }
      ]}
      numberOfLines={1}
    >
      {label}
    </Text>
  </View>
);

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

// Profile Stack Navigator
const ProfileStackNavigator = () => (
  <ProfileStack.Navigator 
    screenOptions={{
      headerShown: false,
      presentation: 'card',
      animation: Platform.OS === 'ios' ? 'default' : 'fade',
      contentStyle: { backgroundColor: '#FFFFFF' },
    }}
  >
    <ProfileStack.Screen
      name="ProfileMain"
      children={(props) => <LazyScreen component={ProfileScreen} {...props} />}
      options={{
        gestureEnabled: true,
      }}
    />
    <ProfileStack.Screen
      name="EditPreferences"
      children={(props) => <LazyScreen component={EditPreferencesScreen} {...props} />}
      options={{
        gestureEnabled: false,
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    />
  </ProfileStack.Navigator>
);

const MainAppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#C84B31',
          borderTopWidth: 0,
          elevation: 0,
          height: 90,
          paddingBottom: 12,
          paddingTop: 20,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.8)',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        children={(props) => <LazyScreen component={HomeScreen} {...props} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="home-outline" label="Home" />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Explore"
        children={(props) => <LazyScreen component={ExploreScreen} {...props} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="grid-outline" label="Explore" />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Recipes"
        children={(props) => <LazyScreen component={RecipesScreen} {...props} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="book-outline" label="Recipes" />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon="person-outline" label="Profile" />
          ),
          tabBarLabel: () => null,
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
  tabBarItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 70,
  },
  tabBarIcon: {
    marginBottom: 6,
  },
  tabBarLabel: {
    fontSize: 14,
    fontFamily: typography.fonts.semiBold,
    textAlign: 'center',
  },
});

export default MainAppNavigator; 