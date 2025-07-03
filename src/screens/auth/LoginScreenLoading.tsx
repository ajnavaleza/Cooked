import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { styles } from '../../styles/auth/LoginScreenLoading.styles';
import Screen from '../../components/Screen';
import Logo from '../../components/Logo';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginLoading'>;

const LoginScreenLoading = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);


  return (
    <Screen style={styles.screen}>
      <ImageBackground 
        source={require('../../assets/auth/login-loading/login-loading.png')} 
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

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
