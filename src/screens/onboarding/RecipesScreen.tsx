import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from './OnboardingContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from './OnboardingNavigator';
import styles from '../../styles/onboarding/RecipesScreen.styles';

const RECIPES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Desserts',
  'Drinks & Smoothies',
  'Appetizers',
  'Soups & Salads',
  'Side Dishes',
  'One-Pot / One-Pan',
  'Meal Prep / Make-Ahead',
  'Vegan / Vegetarian',
  'High-Protein / Low-Carb',
  'Comfort Food',
  'Microwave / Dorm-Friendly',
];

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Recipes'>;

const RecipesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { answers, setAnswers } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(answers.recipeTypes);

  const toggleRecipe = (recipe: string) => {
    setSelected(prev => prev.includes(recipe) ? prev.filter(r => r !== recipe) : [...prev, recipe]);
  };

  const handleSubmit = () => {
    setAnswers(prev => {
      const updated = { ...prev, recipeTypes: selected };
      return updated;
    });
    navigation.navigate('Allergies');
  };

  const handleSkip = () => {
    setAnswers(prev => {
      const updated = { ...prev, recipeTypes: ['Dinner', 'Lunch'] };
      return updated;
    });
    navigation.navigate('Allergies');
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
      </View>
      <Text style={styles.header}>Hi there!</Text>
      <Text style={styles.subheader}>
        Let's personalize your experience by learning about your food preferences.
      </Text>
      <View style={styles.quizBox}>
        <Text style={styles.quizTitle}>What types of recipes are you most interested in?</Text>
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {RECIPES.map((r, i) => (
            <TouchableOpacity
              key={r}
              style={[styles.checkboxRow, selected.includes(r) && styles.selectedRow]}
              onPress={() => toggleRecipe(r)}
            >
              <View style={[styles.checkbox, selected.includes(r) && styles.checkedBox]} />
              <Text style={styles.optionText}>{r}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecipesScreen; 