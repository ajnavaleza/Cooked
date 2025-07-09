import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styles } from '../../styles/onboarding/CompletionScreen.styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOnboarding } from './OnboardingContext';
import * as auth from '../../api/auth';

const CompletionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { answers } = useOnboarding();
  const [isSaving, setIsSaving] = useState(false);

  const handleContinue = async () => {
    try {
      setIsSaving(true);
      
      // Transform answers into preferences format
      const preferences = {
        cuisines: answers.cuisines || [],
        diets: answers.diets || [],
        allergies: answers.allergies || [],
        allergyOther: answers.allergyOther || '',
      };

      // Save preferences to backend
      await auth.updatePreferences(preferences);

      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } catch (error: any) {
      console.error('Error saving preferences:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Failed to save preferences. Please try again.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Thank you!</Text>
        <Text style={styles.description}>
          Your preferences help us personalize your Cooked experience, from recipe suggestions to meal ideas tailored just for you.
        </Text>
        <TouchableOpacity 
          style={[styles.button, isSaving && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Let's get cooking!</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompletionScreen; 