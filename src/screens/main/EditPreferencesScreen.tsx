import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { ProfileStackParamList } from '../../navigation/types';
import * as auth from '../../api/auth';
import { styles } from '../../styles/main/EditPreferencesScreen.styles';
import { OnboardingAnswers } from '../onboarding/OnboardingContext';

type EditPreferencesScreenNavigationProp = NativeStackNavigationProp<ProfileStackParamList, 'EditPreferences'>;

const CUISINES = [
  { label: 'Italian', emoji: '🇮🇹' },
  { label: 'Mexican', emoji: '🇲🇽' },
  { label: 'Japanese', emoji: '🇯🇵' },
  { label: 'Chinese', emoji: '🇨🇳' },
  { label: 'Indian', emoji: '🇮🇳' },
  { label: 'Korean', emoji: '🇰🇷' },
  { label: 'Thai', emoji: '🇹🇭' },
  { label: 'Vietnamese', emoji: '🇻🇳' },
  { label: 'Greek', emoji: '🇬🇷' },
  { label: 'French', emoji: '🇫🇷' },
  { label: 'American', emoji: '🇺🇸' },
  { label: 'Spanish', emoji: '🇪🇸' },
  { label: 'Brazilian', emoji: '🇧🇷' },
  { label: 'Moroccan', emoji: '🇲🇦' },
  { label: 'Turkish', emoji: '🇹🇷' },
  { label: 'Vegetarian / Plant-Based', emoji: '🌱' },
];

const DIETS = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Gluten-Free',
  'Dairy-Free',
  'Low-Carb / Keto',
  'High-Protein',
  'Halal',
  'Kosher',
  'No specific diet',
];

const ALLERGIES = [
  'Nut-Free',
  'Gluten-Free',
  'Dairy-Free',
  'Egg-Free',
  'Shellfish-Free',
  'Soy-Free',
  'Other',
];

type Tab = 'Cuisines' | 'Diets' | 'Allergies';

interface UserPreferences {
  cuisines: string[];
  diets: string[];
  allergies: string[];
  allergyOther?: string;
}

const EditPreferencesScreen = () => {
  const navigation = useNavigation<EditPreferencesScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<Tab>('Cuisines');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initialPreferences, setInitialPreferences] = useState<UserPreferences>({
    cuisines: [],
    diets: [],
    allergies: [],
    allergyOther: '',
  });
  const [preferences, setPreferences] = useState<UserPreferences>({
    cuisines: [],
    diets: [],
    allergies: [],
    allergyOther: '',
  });

  // Check if preferences have changed
  const hasUnsavedChanges = () => {
    return (
      JSON.stringify(preferences) !== JSON.stringify(initialPreferences)
    );
  };

  // Handle back button press
  const handleBackPress = useCallback(() => {
    if (hasUnsavedChanges()) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
      return true; // Prevent default back action
    }
    return false; // Allow default back action
  }, [preferences, initialPreferences, navigation]);

  // Set up back button handler
  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => subscription.remove();
    }, [handleBackPress])
  );

  // Set up navigation options to prevent swipe back
  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  const loadUserPreferences = async () => {
    try {
      const userData = await auth.getUser();
      if (userData.preferences) {
        const loadedPreferences = {
          cuisines: userData.preferences.cuisines || [],
          diets: userData.preferences.diets || [],
          allergies: userData.preferences.allergies || [],
          allergyOther: userData.preferences.allergyOther || '',
        };
        setInitialPreferences(loadedPreferences);
        setPreferences(loadedPreferences);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load preferences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await auth.updatePreferences(preferences);
      setInitialPreferences(preferences); // Update initial preferences after successful save
      Alert.alert('Success', 'Preferences saved successfully');
      navigation.goBack();
    } catch (error: any) {
      console.error('Error saving preferences:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error || error.message || 'Failed to save preferences'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (hasUnsavedChanges()) {
      Alert.alert(
        'Discard Changes',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  const toggleItem = (category: keyof UserPreferences, item: string) => {
    setPreferences(prev => {
      const current = prev[category] as string[];
      const updated = current.includes(item)
        ? current.filter(i => i !== item)
        : [...current, item];
      return { ...prev, [category]: updated };
    });
  };

  const renderTabButton = (tab: Tab) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
      onPress={() => setActiveTab(tab)}
    >
      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const renderCuisines = () => (
    <ScrollView style={styles.tabContent}>
      {CUISINES.map(cuisine => (
        <TouchableOpacity
          key={cuisine.label}
          style={[
            styles.optionRow,
            preferences.cuisines.includes(cuisine.label) && styles.selectedOption,
          ]}
          onPress={() => toggleItem('cuisines', cuisine.label)}
        >
          <Text style={styles.optionText}>
            {cuisine.label} {cuisine.emoji}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderDiets = () => (
    <ScrollView style={styles.tabContent}>
      {DIETS.map(diet => (
        <TouchableOpacity
          key={diet}
          style={[
            styles.optionRow,
            preferences.diets.includes(diet) && styles.selectedOption,
          ]}
          onPress={() => toggleItem('diets', diet)}
        >
          <Text style={styles.optionText}>{diet}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderAllergies = () => (
    <ScrollView style={styles.tabContent}>
      {ALLERGIES.map(allergy => (
        <View key={allergy}>
          <TouchableOpacity
            style={[
              styles.optionRow,
              preferences.allergies.includes(allergy) && styles.selectedOption,
            ]}
            onPress={() => toggleItem('allergies', allergy)}
          >
            <Text style={styles.optionText}>{allergy}</Text>
          </TouchableOpacity>
          {allergy === 'Other' && preferences.allergies.includes('Other') && (
            <TextInput
              style={styles.otherInput}
              placeholder="Please specify other allergies"
              value={preferences.allergyOther}
              onChangeText={text =>
                setPreferences(prev => ({ ...prev, allergyOther: text }))
              }
            />
          )}
        </View>
      ))}
    </ScrollView>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#C84B31" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Preferences</Text>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving || !hasUnsavedChanges()}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        {renderTabButton('Cuisines')}
        {renderTabButton('Diets')}
        {renderTabButton('Allergies')}
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
        </View>
      ) : (
        <>
          {activeTab === 'Cuisines' && renderCuisines()}
          {activeTab === 'Diets' && renderDiets()}
          {activeTab === 'Allergies' && renderAllergies()}
        </>
      )}
    </SafeAreaView>
  );
};

export default EditPreferencesScreen; 