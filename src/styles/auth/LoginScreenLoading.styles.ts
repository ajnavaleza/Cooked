import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';
import { sharedStyles, authColors } from './shared.styles';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  ...sharedStyles,
  overlay: {
    ...sharedStyles.overlay,
    backgroundColor: 'rgba(243, 215, 125, 0.6)', // Yellow overlay with 60% opacity
  },
  backButton: {
    ...sharedStyles.backButton,
  },
  backButtonText: {
    ...sharedStyles.backButtonText,
    color: authColors.primary,
  },
  container: {
    ...sharedStyles.container,
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    color: authColors.primary,
    fontFamily: typography.fonts.bold,
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    ...sharedStyles.subtitle,
    color: authColors.primary,
    marginTop: 16,
    marginBottom: 40,
  },
  appName: {
    fontSize: 28,
    color: authColors.primary,
    fontFamily: typography.fonts.bold,
    position: 'absolute',
    bottom: 40,
  },
}); 