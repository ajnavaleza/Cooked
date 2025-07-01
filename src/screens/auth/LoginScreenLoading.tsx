import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from '../../styles/auth/LoginScreenLoading.styles';
import Screen from '../../components/Screen';
import Logo from '../../components/Logo';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginLoading'>;

const LoginScreenLoading = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Simulate loading time and then navigate to main app
    const timer = setTimeout(() => {
      // TODO: Navigate to main app screen once created
      // navigation.replace('MainApp');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  const handleBack = () => {
    navigation.navigate('Login');
  };

  return (
    <Screen style={styles.screen}>
      <ImageBackground 
        source={require('../../assets/auth/login-loading/login-loading.png')} 
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={handleBack}
      >
        <Text style={styles.backButtonText}>← Back to Login</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Logo style={styles.logo} />
        <Text style={styles.welcomeText}>We are happy to</Text>
        <Text style={styles.welcomeText}>see you again</Text>
        <Text style={styles.subtitle}>Let's cook!</Text>
        <Text style={styles.appName}>Cooked.</Text>
      </View>
    </Screen>
  );
};

export default LoginScreenLoading;
