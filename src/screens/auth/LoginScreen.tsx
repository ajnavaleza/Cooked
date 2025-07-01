import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ImageBackground,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../../styles/auth/LoginScreen.styles';
import Screen from '../../components/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    // For testing: Navigate to loading screen if there's any input
    if (formData.username.length > 0 || formData.password.length > 0) {
      navigation.navigate('LoginLoading');
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  return (
    <Screen style={styles.screen}>
      <ImageBackground 
        source={require('../../assets/auth/login-page/login-page.jpg')} 
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Back!</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={formData.username}
            onChangeText={(value) => handleInputChange('username', value)}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <View style={styles.signUpContainer}>
            <Text style={styles.footerText}>
              New User?{' '}
              <Text 
                style={styles.linkText}
                onPress={handleCreateAccount}
              >
                Sign Up!
              </Text>
            </Text>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="apple" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating or logging into an account you are agreeing{'\n'}to the Terms and Conditions and Privacy Statement
            </Text>
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default LoginScreen;
