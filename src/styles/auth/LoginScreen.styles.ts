import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';

const { width, height } = Dimensions.get('window');

const colors = {
  primary: '#4A3531',
  white: '#FFFFFF',
  overlay: 'rgba(103, 125, 183, 0.9)', // Blue overlay
  inputBackground: 'rgba(255, 255, 255, 0.2)',
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
  }
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  form: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#C84B31',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#C84B31',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    color: '#666',
    paddingHorizontal: 10,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  signUpText: {
    color: '#C84B31',
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
}); 