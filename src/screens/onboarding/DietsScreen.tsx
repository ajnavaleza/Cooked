import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from './OnboardingContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from './OnboardingNavigator';
import styles from '../../styles/onboarding/DietsScreen.styles';

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

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Diets'>;

const DietsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { answers, setAnswers } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(answers.diets);

  const toggleDiet = (diet: string) => {
    setSelected(prev => prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]);
  };

  const handleSubmit = () => {
    setAnswers(prev => {
      const updated = { ...prev, diets: selected };
      console.log('Onboarding data after diets:', updated);
      return updated;
    });
    navigation.navigate('Recipes');
  };

  const handleSkip = () => {
    setAnswers(prev => {
      const updated = { ...prev, diets: ['No specific diet'] };
      console.log('Onboarding data after diets (skipped):', updated);
      return updated;
    });
    navigation.navigate('Recipes');
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#E0E6F6' }]} />
      </View>
      <Text style={styles.header}>Hi there!</Text>
      <Text style={styles.subheader}>
        Let's personalize your experience by learning about your food preferences.
      </Text>
      <View style={styles.quizBox}>
        <Text style={styles.quizTitle}>Do you follow any specific diets?</Text>
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {DIETS.map((d, i) => (
            <TouchableOpacity
              key={d}
              style={[styles.checkboxRow, selected.includes(d) && styles.selectedRow]}
              onPress={() => toggleDiet(d)}
            >
              <View style={[styles.checkbox, selected.includes(d) && styles.checkedBox]} />
              <Text style={styles.optionText}>{d}</Text>
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

export default DietsScreen; 