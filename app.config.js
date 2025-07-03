import 'dotenv/config';

export default {
  expo: {
    name: "Cooked",
    slug: "Cooked",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      SPOONACULAR_API_KEY: process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY,
      LOCAL_API_URL: process.env.EXPO_PUBLIC_LOCAL_API_URL,
    }
  }
}; 