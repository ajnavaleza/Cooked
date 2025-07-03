import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';

const { width, height } = Dimensions.get('window');

const colors = {
  primary: '#4A3531',
  white: '#FFFFFF',
  overlay: 'rgba(131, 156, 206, 0.85)', // #839CCE with transparency
  inputBackground: 'rgba(255, 255, 255, 0.2)',
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.overlay,
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
    color: colors.text.primary,
    fontFamily: typography.fonts.regular,
  },
  content: {
    width: '100%',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: height * 0.6,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 60,
    textAlign: 'center',
    fontFamily: typography.fonts.bold,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 300,
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.text.primary,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: colors.text.primary,
    width: '100%',
    fontFamily: typography.fonts.regular,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  forgotPasswordText: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: typography.fonts.regular,
  },
  newUserText: {
    color: colors.text.primary,
    fontSize: 14,
    fontFamily: typography.fonts.regular,
  },
  loginButton: {
    backgroundColor: 'rgba(74, 53, 49, 0.8)',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: typography.fonts.bold,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    maxWidth: 300,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.text.secondary,
  },
  dividerText: {
    color: colors.text.secondary,
    paddingHorizontal: 10,
    fontFamily: typography.fonts.regular,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.inputBackground,
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
    color: colors.text.secondary,
    fontSize: 14,
  },
  signUpText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
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
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  termsText: {
    color: colors.text.secondary,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 16,
    fontFamily: typography.fonts.regular,
  },
}); 