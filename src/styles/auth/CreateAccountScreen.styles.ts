import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';

const { width, height } = Dimensions.get('window');

const colors = {
  primary: '#4A3531',
  white: '#FFFFFF',
  overlay: 'rgba(233, 224, 99, 0.9)', // #B1AA45 with 90% opacity
  inputBackground: 'rgba(0, 0, 0, 0.1)',
  text: {
    primary: '#000000',
    secondary: 'rgba(0, 0, 0, 0.7)',
  }
};

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  actionContainer: {
    width: '100%',
    marginTop: 20,
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
    paddingTop: '15%',
    zIndex: 1,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: 40,
    color: colors.text.primary,
    fontFamily: typography.fonts.bold,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: typography.fonts.regular,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
    width: '100%',
  },
  input: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.text.primary,
    paddingHorizontal: 16,
    backgroundColor: colors.inputBackground,
    color: colors.text.primary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
    width: '100%',
  },
  inputText: {
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
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
  },
  buttonsContainerShifted: {
    marginTop: 240,
  },
  signUpButton: {
    borderRadius: 8,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    width: '100%',
  },
  signUpButtonEnabled: {
    backgroundColor: colors.text.primary,
    opacity: 1,
  },
  signUpButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.7,
  },
  signUpButtonText: {
    color: colors.white,
    fontSize: typography.sizes.lg,
    fontFamily: typography.fonts.semiBold,
  },
  backButton: {
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  backButtonText: {
    color: colors.text.primary,
    fontSize: typography.sizes.md,
    fontFamily: typography.fonts.regular,
  },
  footerContainer: {
    marginTop: 'auto',
    paddingBottom: 40,
    width: '100%',
  },
  termsText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.sm,
    fontFamily: typography.fonts.regular,
    textAlign: 'center',
    marginBottom: 24,
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
    backgroundColor: '#FFFFFF',
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
    color: '#4CAF50', // Green color for met requirements
  },
  requirementNotMet: {
    color: '#FF5252', // Red color for unmet requirements
  },
}); 