import { StyleSheet } from 'react-native';
import { typography } from '../typography';
import { sharedStyles, authColors } from './shared.styles';

export const styles = StyleSheet.create({
  ...sharedStyles,
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputText: {
    color: authColors.text.primary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
  },
  overlay: {
    ...sharedStyles.overlay,
    backgroundColor: authColors.overlays.gold,
  },
  container: {
    ...sharedStyles.container,
    paddingTop: '15%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    ...sharedStyles.title,
    color: authColors.text.primary,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  subtitle: {
    ...sharedStyles.subtitle,
    color: authColors.text.primary,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  input: {
    ...sharedStyles.input,
    borderColor: authColors.text.primary,
    backgroundColor: authColors.inputBackground.dark,
    color: authColors.text.primary,
  },
  datePickerContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(177, 170, 69, 0.95)',
    paddingVertical: 20,
    zIndex: 1000,
    width: '100%',
  },
  datePicker: {
    height: 200,
  },
  buttonsContainer: {
    marginTop: 24,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
    alignItems: 'stretch',
  },
  buttonsContainerShifted: {
    marginTop: 240,
  },
  signUpButton: {
    ...sharedStyles.button,
    marginBottom: 10,
    marginTop: -10,
    height: 60,
  },
  signUpButtonEnabled: {
    backgroundColor: authColors.text.primary,
    opacity: 1,
  },
  signUpButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.7,
  },
  signUpButtonText: {
    ...sharedStyles.buttonText,
    color: authColors.white,
    fontSize: typography.sizes.lg + 2,
    textAlign: 'center',
  },
  backButton: {
    ...sharedStyles.backButton,
    marginTop: 8,
  },
  backButtonText: {
    ...sharedStyles.backButtonText,
    color: authColors.text.primary,
  },
  footerContainer: {
    marginTop: 'auto',
    paddingBottom: 40,
    width: '100%',
    maxWidth: 300,
    alignSelf: 'center',
  },
  termsText: {
    color: authColors.text.secondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    textAlign: 'center',
    marginBottom: 24,
  },
  passwordRequirements: {
    marginTop: 4,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  requirementText: {
    fontSize: 12,
    fontFamily: typography.fonts.regular,
    marginVertical: 2,
  },
  requirementMet: {
    color: '#4CAF50',
  },
  requirementNotMet: {
    color: '#FF5252',
  },
}); 