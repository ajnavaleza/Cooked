import React from 'react';
import { View, Image, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { styles } from '../../styles/LandingScreen.styles';
import Screen from '../../components/Screen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

const LandingScreen = () => {
  const navigation = useNavigation<NavigationProp>();


  return (
    <Screen style={styles.screen}>
      <ImageBackground 
        source={require('../../assets/auth/landing-page/different-types-of-bread-macro-background-2024-09-12-23-42-17-utc 1.png')} 
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../assets/auth/landing-page/CookedLogo.png')}
            style={styles.logo}
          />
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