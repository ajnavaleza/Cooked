import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useOnboarding } from './OnboardingContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { OnboardingStackParamList } from './OnboardingNavigator';
import styles from '../../styles/onboarding/AllergiesScreen.styles';

const ALLERGIES = [
  'Nut-Free',
  'Gluten-Free',
  'Dairy-Free',
  'Egg-Free',
  'Shellfish-Free',
  'Soy-Free',
  'Other',
];

type NavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Allergies'>;

const AllergiesScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { answers, setAnswers, submitOnboardingProfile } = useOnboarding();
  const [selected, setSelected] = useState<string[]>(answers.allergies);
  const [other, setOther] = useState(answers.allergyOther || '');
  const [isLoading, setIsLoading] = useState(false);

  const toggleAllergy = (allergy: string) => {
    setSelected(prev => prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setAnswers(prev => {
        const updated = { ...prev, allergies: selected, allergyOther: other };
        return updated;
      });
      
      await submitOnboardingProfile({ ...answers, allergies: selected, allergyOther: other });
      navigation.navigate('Completion');
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Failed to save your preferences. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      setIsLoading(true);
      await submitOnboardingProfile({ ...answers, allergies: ['None'], allergyOther: '' });
      navigation.navigate('Completion');
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Failed to save your preferences. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A9BEE8" />
      </View>
    );
  }

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
        <Text style={styles.quizTitle}>Do you have any allergies?</Text>
        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {ALLERGIES.map((a, i) => (
            <View key={a} style={{ width: '100%' }}>
              <TouchableOpacity
                style={[styles.checkboxRow, selected.includes(a) && styles.selectedRow]}
                onPress={() => toggleAllergy(a)}
              >
                <View style={[styles.checkbox, selected.includes(a) && styles.checkedBox]} />
                <Text style={styles.optionText}>{a}</Text>
              </TouchableOpacity>
              {a === 'Other' && selected.includes('Other') && (
                <TextInput
                  style={styles.otherInput}
                  placeholder="(Please specify)"
                  value={other}
                  onChangeText={setOther}
                />
              )}
            </View>
          ))}
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.skipButton} 
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

export default AllergiesScreen; 