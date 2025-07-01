import { StyleSheet, Dimensions } from 'react-native';
import { typography } from './typography';

const { width, height } = Dimensions.get('window');

const colors = {
  primary: '#4A3531',
  white: '#FFFFFF',
  overlay: 'rgba(103, 125, 183, 0.7)', // Blue overlay
  inputBackground: 'rgba(255, 255, 255, 0.2)',
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
  }
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
    paddingHorizontal: 24,
    paddingTop: '20%',
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    color: colors.text.primary,
    fontFamily: typography.fonts.semiBold,
    marginBottom: 40,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.inputBackground,
    color: colors.text.primary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
  },
  loginButton: {
    backgroundColor: colors.white,
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
  },
  footerContainer: {
    marginTop: 'auto',
    paddingBottom: 40,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  footerText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
  },
  linkText: {
    color: colors.text.primary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.semiBold,
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.text.secondary,
  },
  dividerText: {
    color: colors.text.secondary,
    marginHorizontal: 16,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
  },
  socialButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  termsText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    textAlign: 'center',
  },
}); 