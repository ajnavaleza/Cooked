import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/onboarding/CompletionScreen.styles';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useOnboarding } from './OnboardingContext';

const CompletionScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { answers } = useOnboarding();

  const handleContinue = () => {
    // Here you would typically save the preferences to your backend
    // For now, we'll just navigate to the main app
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainApp' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Set!</Text>
      <Text style={styles.subtitle}>
        Your preferences have been saved. We'll use these to personalize your experience.
      </Text>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue to App</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompletionScreen; 