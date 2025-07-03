import 'dotenv/config';

export default {
  expo: {
    name: "Cooked",
    slug: "Cooked",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: false,
    platforms: ["ios", "android"], // Remove web support
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
    fonts: [
      "./src/assets/Obviously Narrow Medium.ttf",
      "./src/assets/Obviously Narrow Semibold.ttf"
    ],
    extra: {
      SPOONACULAR_API_KEY: process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY,
      LOCAL_API_URL: process.env.EXPO_PUBLIC_LOCAL_API_URL,
      API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
    }
  }
}; 