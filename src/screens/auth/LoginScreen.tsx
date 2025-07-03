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
      console.log('[LoginScreen] Attempting login for:', email);
      const response = await auth.login(email, password);
      console.log('[LoginScreen] Login successful:', !!response.token);
      
      // Navigate to loading screen on successful login
      navigation.navigate('LoginLoading');
    } catch (error: any) {
      console.error('[LoginScreen] Login failed:', error);
      
      // Check if it's a network error vs authentication error
      if (error.code === 'NETWORK_ERROR' || error.message?.includes('Network Error')) {
        Alert.alert(
          'Connection Error',
          'Unable to connect to the server. Please check your internet connection and try again.'
        );
      } else if (error.response?.status === 400) {
        Alert.alert(
          'Login Failed',
          'Invalid email or password. Please check your credentials and try again.'
        );
      } else if (error.response?.status === 500) {
        Alert.alert(
          'Server Error',
          'Server is currently unavailable. Please try again later.'
        );
      } else {
        Alert.alert(
          'Login Failed',
          error.response?.data?.error || 'Something went wrong. Please try again.'
        );
      }
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
    <ImageBackground
      source={require('../../assets/auth/login-page/login-page.jpg')}
      style={styles.backgroundImage}
    >
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
            <Text style={styles.title}>Welcome Back!</Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Username"
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

              <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity onPress={handleCreateAccount} disabled={isLoading}>
                  <Text style={styles.newUserText}>New User? Sign Up!</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.forgotPassword}
                  onPress={() => {/* Handle forgot password */}}
                  disabled={isLoading}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[styles.loginButton, isLoading && { opacity: 0.7 }]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.loginButtonText}>
                  {isLoading ? 'Logging in...' : 'Log In'}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
              By creating or logging into an account you are agreeing{'\n'}
              to the Terms and Conditions and Privacy Statement
            </Text>

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
                <Ionicons name="logo-facebook" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton}
                disabled={isLoading}
              >
                <Ionicons name="logo-google" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialButton}
                disabled={isLoading}
              >
                <Ionicons name="logo-apple" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
