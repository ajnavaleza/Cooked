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
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Thank you!</Text>
        <Text style={styles.description}>
          Your preferences help us personalize your Cooked experience, from recipe suggestions to meal ideas tailored just for you.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Let's get cooking!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CompletionScreen; 