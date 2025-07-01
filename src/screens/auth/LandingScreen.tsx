import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { styles } from '../../styles/auth/LandingScreen.styles';
import Screen from '../../components/Screen';
import Logo from '../../components/Logo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

const LandingScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Screen style={styles.screen}>
      <ImageBackground 
        source={require('../../assets/auth/landing-page/landing-page.jpg')} 
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
          <Text style={styles.title}>Cooked.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.signUpButton}
            onPress={() => navigation.navigate('CreateAccount')}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default LandingScreen; 