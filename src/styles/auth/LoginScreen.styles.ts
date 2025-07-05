import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';
import { sharedStyles, authColors } from './shared.styles';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  ...sharedStyles,
  overlay: {
    ...sharedStyles.overlay,
    backgroundColor: authColors.overlays.blue,
  },
  container: {
    flex: 1,
    backgroundColor: authColors.overlays.blue,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1,
  },
  backButton: {
    fontSize: 16,
    color: authColors.text.light.primary,
  },
  content: {
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.6,
  },
  title: {
    ...sharedStyles.title,
    color: authColors.text.light.primary,
    marginBottom: 60,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: authColors.text.light.secondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 40,
    gap: 5,
  },
  input: {
    ...sharedStyles.input,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: authColors.text.light.primary,
    color: authColors.text.light.primary,
    marginBottom: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
    width: '100%',
  },
  forgotPasswordText: {
    color: authColors.text.light.primary,
    fontSize: 14,
  },
  newUserText: {
    color: authColors.text.light.primary,
    fontSize: 14,
  },
  loginButton: {
    ...sharedStyles.button,
    backgroundColor: 'rgba(74, 53, 49, 0.8)',
    marginBottom: 30,
  },
  loginButtonText: {
    ...sharedStyles.buttonText,
    color: authColors.white,
  },
  dividerContainer: {
    ...sharedStyles.dividerContainer,
    maxWidth: 300,
  },
  divider: {
    ...sharedStyles.divider,
    backgroundColor: authColors.text.light.secondary,
  },
  dividerText: {
    ...sharedStyles.dividerText,
    color: authColors.text.light.secondary,
  },
  socialButtons: {
    ...sharedStyles.socialContainer,
    marginBottom: 30,
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: authColors.inputBackground.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: authColors.text.light.secondary,
    fontSize: 14,
  },
  signUpText: {
    color: authColors.text.light.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  termsText: {
    color: authColors.text.light.secondary,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 16,
  },
}); 