import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/main/ProfileScreen.styles';
import * as auth from '../../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProfileStackParamList, RootStackParamList } from '../../navigation/types';

type ProfileScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;
type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface UserData {
  email: string;
  name?: string;
  birthday?: string;
  preferences?: {
    cuisines?: string[];
    diets?: string[];
    allergies?: string[];
    recipeTypes?: string[];
    allergyOther?: string;
  };
}

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const rootNavigation = useNavigation<RootNavigationProp>();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'created' | 'saved'>('created');

  const loadUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      const userData = await auth.getUser();
      setUser(userData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    loadUserProfile();
  }, []);

  // Reload data when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadUserProfile();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('token');
              await AsyncStorage.removeItem('userData');
              
              // Navigate back to Landing screen
              rootNavigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Landing' }],
                })
              );
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    if (user?.preferences) {
      navigation.navigate('EditPreferences', {
        currentPreferences: user.preferences,
        onSave: (updatedPreferences: UserData['preferences']) => {
          setUser(prev => prev ? { ...prev, preferences: updatedPreferences } : null);
        }
      });
    }
  };

  const handleEditPersonalInfo = () => {
    navigation.navigate('EditProfile', {
      currentProfile: { name: user?.name, birthday: user?.birthday },
      onSave: (updatedProfile: { name?: string; birthday?: string }) => {
        setUser(prev => prev ? { ...prev, ...updatedProfile } : null);
      }
    });
  };

  const renderPreferenceChips = (items: string[] | undefined, title: string) => {
    if (!items || items.length === 0) return null;

    return (
      <View style={styles.preferenceSection}>
        <Text style={styles.preferenceTitle}>{title}</Text>
        <View style={styles.chipContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.chip}>
              <Text style={styles.chipText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C84B31" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="person-circle-outline" size={80} color="#ccc" />
          <Text style={styles.errorTitle}>Not Logged In</Text>
          <Text style={styles.errorText}>Please log in to view your profile</Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => rootNavigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={100} color="#C84B31" />
          </View>
          
          {user && (
            <>
              <Text style={styles.userName}>
                {user.name || user.email?.split('@')[0]?.replace(/[^a-zA-Z0-9]/g, '') || 'User'}
              </Text>
              <Text style={styles.userEmail}>@{user.email?.split('@')[0] || 'user'}</Text>
              {user.birthday && (
                <Text style={styles.userBirthday}>🎂 {user.birthday}</Text>
              )}
              
              <TouchableOpacity style={styles.editButton} onPress={handleEditPersonalInfo}>
                <Text style={styles.editButtonText}>Edit profile</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'created' && styles.activeTab]}
            onPress={() => setActiveTab('created')}
          >
            <Text style={[styles.tabText, activeTab === 'created' && styles.activeTabText]}>
              Created
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
              Saved
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content Based on Active Tab */}
        {activeTab === 'created' && (
          <View style={styles.tabContent}>
            {/* User Preferences Section */}
            {user.preferences && (
              <View style={styles.preferencesContainer}>
                <View style={styles.preferencesHeader}>
                  <Text style={styles.sectionTitle}>Your Food Preferences</Text>
                  <TouchableOpacity onPress={handleEditProfile} style={styles.editPreferencesButton}>
                    <Ionicons name="pencil" size={16} color="#C84B31" />
                    <Text style={styles.editPreferencesText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                
                {renderPreferenceChips(user.preferences.cuisines, 'Favorite Cuisines')}
                {renderPreferenceChips(user.preferences.diets, 'Dietary Preferences')}
                {renderPreferenceChips(user.preferences.allergies, 'Allergies & Restrictions')}
                {renderPreferenceChips(user.preferences.recipeTypes, 'Recipe Types')}
                
                {user.preferences.allergyOther && (
                  <View style={styles.preferenceSection}>
                    <Text style={styles.preferenceTitle}>Other Allergies</Text>
                    <Text style={styles.otherAllergyText}>{user.preferences.allergyOther}</Text>
                  </View>
                )}
              </View>
            )}

            {/* No Recipes Message */}
            <View style={styles.emptyState}>
              <Ionicons name="restaurant-outline" size={60} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No recipes... yet.</Text>
              <Text style={styles.emptyStateText}>
                Browse and create your first dish to get cooking.
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'saved' && (
          <View style={styles.tabContent}>
            <View style={styles.emptyState}>
              <Ionicons name="bookmark-outline" size={60} color="#ccc" />
              <Text style={styles.emptyStateTitle}>No saved recipes... yet.</Text>
              <Text style={styles.emptyStateText}>
                Save recipes you love to find them easily later.
              </Text>
            </View>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#C84B31" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen; 