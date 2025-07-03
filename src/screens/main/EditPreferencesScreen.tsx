import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles/main/EditPreferencesScreen.styles';
import * as auth from '../../api/auth';
import { OnboardingAnswers } from '../onboarding/OnboardingContext';

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
  { label: 'Vegetarian', emoji: '🥗' },
  { label: 'Vegan', emoji: '🌱' },
  { label: 'Keto', emoji: '🥓' },
  { label: 'Paleo', emoji: '🥩' },
  { label: 'Mediterranean', emoji: '🫒' },
  { label: 'Low-Carb', emoji: '🥬' },
  { label: 'Gluten-Free', emoji: '🌾' },
  { label: 'Dairy-Free', emoji: '🥛' },
  { label: 'Pescatarian', emoji: '🐟' },
  { label: 'Intermittent Fasting', emoji: '⏰' },
  { label: 'No Specific Diet', emoji: '🍽️' },
];

const ALLERGIES = [
  { label: 'Peanuts', emoji: '🥜' },
  { label: 'Tree Nuts', emoji: '🌰' },
  { label: 'Shellfish', emoji: '🦐' },
  { label: 'Fish', emoji: '🐟' },
  { label: 'Eggs', emoji: '🥚' },
  { label: 'Dairy', emoji: '🥛' },
  { label: 'Soy', emoji: '🫘' },
  { label: 'Wheat/Gluten', emoji: '🌾' },
  { label: 'Sesame', emoji: '🫘' },
  { label: 'No Allergies', emoji: '✅' },
];

const RECIPE_TYPES = [
  { label: 'Breakfast', emoji: '🥞' },
  { label: 'Lunch', emoji: '🥗' },
  { label: 'Dinner', emoji: '🍽️' },
  { label: 'Snacks', emoji: '🥨' },
  { label: 'Desserts', emoji: '🍰' },
  { label: 'Appetizers', emoji: '🥙' },
  { label: 'Beverages', emoji: '🥤' },
  { label: 'Quick Meals', emoji: '⚡' },
];

interface EditPreferencesScreenProps {
  route: {
    params: {
      currentPreferences: OnboardingAnswers;
      onSave: (preferences: OnboardingAnswers) => void;
    };
  };
}

const EditPreferencesScreen: React.FC<EditPreferencesScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const { currentPreferences, onSave } = route.params;
  
  const [preferences, setPreferences] = useState<OnboardingAnswers>(currentPreferences);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<'cuisines' | 'diets' | 'allergies' | 'recipeTypes'>('cuisines');

  const toggleSelection = (section: keyof OnboardingAnswers, item: string) => {
    setPreferences(prev => {
      const currentValue = prev[section];
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      
      return {
        ...prev,
        [section]: currentArray.includes(item)
          ? currentArray.filter(i => i !== item)
          : [...currentArray, item]
      };
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      
      // Update preferences in backend
      await auth.updatePreferences(preferences);
      
      // Call the onSave callback to update the profile screen
      onSave(preferences);
      
      Alert.alert('Success', 'Your preferences have been updated!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Failed to update preferences. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderSection = (
    title: string,
    items: Array<{ label: string; emoji: string }>,
    section: keyof OnboardingAnswers
  ) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView contentContainerStyle={styles.optionsContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.optionRow,
              (Array.isArray(preferences[section]) ? preferences[section] : []).includes(item.label) && styles.selectedRow
            ]}
            onPress={() => toggleSelection(section, item.label)}
          >
            <View style={[
              styles.checkbox,
              (Array.isArray(preferences[section]) ? preferences[section] : []).includes(item.label) && styles.checkedBox
            ]} />
            <Text style={styles.optionText}>{item.label} {item.emoji}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Preferences</Text>
        <TouchableOpacity onPress={handleSave} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#C84B31" />
          ) : (
            <Text style={styles.saveText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {[
          { key: 'cuisines', title: 'Cuisines' },
          { key: 'diets', title: 'Diets' },
          { key: 'allergies', title: 'Allergies' },
          { key: 'recipeTypes', title: 'Types' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeSection === tab.key && styles.activeTab
            ]}
            onPress={() => setActiveSection(tab.key as any)}
          >
            <Text style={[
              styles.tabText,
              activeSection === tab.key && styles.activeTabText
            ]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {activeSection === 'cuisines' && renderSection('Favorite Cuisines', CUISINES, 'cuisines')}
        {activeSection === 'diets' && renderSection('Dietary Preferences', DIETS, 'diets')}
        {activeSection === 'allergies' && renderSection('Allergies & Restrictions', ALLERGIES, 'allergies')}
        {activeSection === 'recipeTypes' && renderSection('Recipe Types', RECIPE_TYPES, 'recipeTypes')}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditPreferencesScreen; 