import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  ImageBackground,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from '../../styles/auth/CreateAccountScreen.styles';
import Screen from '../../components/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useOnboarding } from '../onboarding/OnboardingContext';
import * as auth from '../../api/auth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateAccount'>;

const CreateAccountScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { setAnswers } = useOnboarding();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      handleInputChange('birthday', formattedDate);
    }
  };

  const validateForm = () => {
    if (!formData.name) return 'Please enter your name';
    if (!formData.email) return 'Please enter your email';
    if (!formData.password) return 'Please enter a password';
    
    // Password validation
    const hasMinLength = formData.password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(formData.password);
    const hasLowerCase = /[a-z]/.test(formData.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);
    const hasNumber = /\d/.test(formData.password);

    if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasSpecialChar || !hasNumber) {
      return 'Password must contain:\n- At least 8 characters\n- One uppercase letter\n- One lowercase letter\n- One special character\n- One number';
    }

    if (!formData.birthday) return 'Please enter your birthday';
    return null;
  };

  const handleSignUp = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert('Error', error);
      return;
    }

    try {
      setIsLoading(true);
      // Register the user and get token and user data
      const response = await auth.register(formData.email, formData.password, formData.name, formData.birthday);
      
      // Reset onboarding context with only the new user's basic info
      setAnswers({ 
        name: formData.name,
        email: formData.email,
        birthday: formData.birthday,
        cuisines: [],
        diets: [],
        allergies: [],
        allergyOther: '',
      });

      // Navigate to onboarding
      navigation.navigate('Onboarding', { screen: 'Cuisines' });
    } catch (error: any) {
      console.error('Registration error:', error);
      Alert.alert(
        'Registration Failed',
        error.response?.data?.error || 'Something went wrong. Please try again.'
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
    <Screen style={styles.screen}>
      <ImageBackground 
        source={require('../../assets/auth/create-acc-page/create-acc.jpg')} 
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Welcome!</Text>
          <Text style={styles.subtitle}>Let's create your account</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
              autoComplete="password"
            />
            {formData.password && (
              <View style={styles.passwordRequirements}>
                {formData.password.length < 8 && (
                  <Text style={[styles.requirementText, styles.requirementNotMet]}>
                    • Minimum 8 characters
                  </Text>
                )}
                {!/[A-Z]/.test(formData.password) && (
                  <Text style={[styles.requirementText, styles.requirementNotMet]}>
                    • One uppercase letter
                  </Text>
                )}
                {!/[a-z]/.test(formData.password) && (
                  <Text style={[styles.requirementText, styles.requirementNotMet]}>
                    • One lowercase letter
                  </Text>
                )}
                {!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) && (
                  <Text style={[styles.requirementText, styles.requirementNotMet]}>
                    • One special character
                  </Text>
                )}
                {!/\d/.test(formData.password) && (
                  <Text style={[styles.requirementText, styles.requirementNotMet]}>
                    • One number
                  </Text>
                )}
              </View>
            )}
            <View>
              <TouchableOpacity
                style={[styles.input, { justifyContent: 'center' }]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={[
                  styles.inputText,
                  { color: formData.birthday ? '#000000' : 'rgba(0, 0, 0, 0.5)' }
                ]}>
                  {formData.birthday || 'Birthday'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onDateChange}
                    maximumDate={new Date()}
                    textColor="#000000"
                    style={styles.datePicker}
                    themeVariant="light"
                  />
                </View>
              )}
            </View>
          </View>

          <View style={[styles.actionContainer, showDatePicker && { marginTop: 220 }]}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={[styles.signUpButton, validateForm() ? styles.signUpButtonDisabled : styles.signUpButtonEnabled]} 
                onPress={handleSignUp}
                disabled={!!validateForm()}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                <Text style={styles.backButtonText}>Go back</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
              <Text style={styles.termsText}>
                By creating or logging into an account you are agreeing{' '}
                <Text style={{ fontWeight: 'bold' }}>to the Terms and Conditions</Text> and{' '}
                <Text style={{ fontWeight: 'bold' }}>Privacy Statement</Text>
              </Text>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="facebook" size={24} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="google" size={24} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="apple" size={24} color="#000000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default CreateAccountScreen;
