import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';

const { width, height } = Dimensions.get('window');

export const authColors = {
  primary: '#4A3531', // Brown color
  white: '#FFFFFF',
  overlays: {
    yellow: 'rgba(243, 215, 125, 0.9)', // Landing and Loading screens
    blue: 'rgba(131, 156, 206, 0.85)', // Login screen
    gold: 'rgba(233, 224, 99, 0.9)', // Create account screen
  },
  text: {
    primary: '#000000',
    secondary: 'rgba(0, 0, 0, 0.7)',
    light: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
    }
  },
  inputBackground: {
    dark: 'rgba(0, 0, 0, 0.1)',
    light: 'rgba(255, 255, 255, 0.2)',
  }
};

export const sharedStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
    left: 0,
    top: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 40,
    fontFamily: typography.fonts.bold,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: typography.fonts.regular,
  },
  input: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
    width: '100%',
  },
  button: {
    borderRadius: 8,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    width: '100%',
  },
  socialButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: typography.fonts.semiBold,
  },
}); 