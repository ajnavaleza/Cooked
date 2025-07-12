import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from './OnboardingContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from './OnboardingNavigator';
import styles from '../../styles/onboarding/CuisinesScreen.styles';

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

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Cuisines'>;

const CuisinesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { answers, setAnswers, submitOnboardingProfile } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(answers.cuisines);
  const [isLoading, setIsLoading] = useState(false);

  const toggleCuisine = (cuisine: string) => {
    setSelected(prev => prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setAnswers(prev => ({ ...prev, cuisines: selected }));
      await submitOnboardingProfile({ ...answers, cuisines: selected });
      navigation.navigate('Diets');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to save your preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      setIsLoading(true);
      setAnswers(prev => ({ ...prev, cuisines: ['Any'] }));
      await submitOnboardingProfile({ ...answers, cuisines: ['Any'] });
      navigation.navigate('Diets');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to save your preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#A9BEE8' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#E0E6F6' }]} />
        <View style={[styles.progressBar, { flex: 1, backgroundColor: '#E0E6F6' }]} />
      </View>
      <Text style={styles.header}>Hi there!</Text>
      <Text style={styles.subheader}>
        Let's personalize your experience by learning about your food preferences.
      </Text>
      <View style={styles.quizBox}>
        <Text style={styles.quizTitle}>Click on your favorite cuisines!</Text>
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {CUISINES.map((c, i) => (
            <TouchableOpacity
              key={c.label}
              style={[styles.checkboxRow, selected.includes(c.label) && styles.selectedRow]}
              onPress={() => toggleCuisine(c.label)}
              disabled={isLoading}
            >
              <View style={[styles.checkbox, selected.includes(c.label) && styles.checkedBox]} />
              <Text style={styles.optionText}>{c.label} {c.emoji}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.submitButton, isLoading && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Text style={styles.submitText}>Submit</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.skipButton, isLoading && styles.buttonDisabled]} 
            onPress={handleSkip}
            disabled={isLoading}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CuisinesScreen; 