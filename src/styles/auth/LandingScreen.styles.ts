import { StyleSheet } from 'react-native';
import { typography } from '../typography';
import { sharedStyles, authColors } from './shared.styles';

export const styles = StyleSheet.create({
  ...sharedStyles,
  overlay: {
    ...sharedStyles.overlay,
    backgroundColor: authColors.overlays.yellow,
  },
  container: {
    ...sharedStyles.container,
    justifyContent: 'space-between',
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
    color: authColors.primary,
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
    ...sharedStyles.button,
    backgroundColor: authColors.primary,
  },
  loginButtonText: {
    ...sharedStyles.buttonText,
    color: authColors.white,
  },
  signUpButton: {
    ...sharedStyles.button,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: authColors.primary,
  },
  signUpButtonText: {
    ...sharedStyles.buttonText,
    color: authColors.primary,
  },
});