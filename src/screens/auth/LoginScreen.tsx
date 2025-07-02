import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground,
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/auth/LoginScreen.styles';
import Screen from '../../components/Screen';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import * as auth from '../../api/auth';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) return;
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await auth.login(email, password);
      
      // If we have preferences, go to main app, otherwise go to onboarding
      if (response.user.preferences?.cuisines?.length > 0) {
        // TODO: Navigate to main app once implemented
        navigation.navigate('LoginLoading');
      } else {
        navigation.navigate('LoginLoading');
      }
    } catch (error: any) {
      navigation.goBack(); // Go back from loading screen
      Alert.alert(
        'Login Failed',
        error.response?.data?.error || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#A9BEE8" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome back!</Text>
          <Text style={styles.subtitle}>Please sign in to continue</Text>

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!isLoading}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              editable={!isLoading}
            />

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={() => {/* Handle forgot password */}}
              disabled={isLoading}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtons}>
            <TouchableOpacity 
              style={styles.socialButton}
              disabled={isLoading}
            >
              <Ionicons name="logo-google" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.socialButton}
              disabled={isLoading}
            >
              <Ionicons name="logo-apple" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity 
              onPress={handleCreateAccount}
              disabled={isLoading}
            >
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
