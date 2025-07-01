import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';

const { width, height } = Dimensions.get('window');

// Colors specific to landing screen
const colors = {
  primary: '#4A3531', // Brown color
  white: '#FFFFFF',
  overlay: 'rgba(243, 215, 125, 0.9)', // Yellow overlay
};

export const styles = StyleSheet.create({
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
    backgroundColor: colors.overlay,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: '40%',
    paddingBottom: '10%',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  title: {
    marginTop: -25,
    fontSize: 90,
    fontFamily: 'Obviously Narrow Semibold',
    color: colors.primary,
  },
  logo: {
    width: 105,
    height: 92,
    resizeMode: 'contain',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
  },
  signUpButton: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  signUpButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
  },
});