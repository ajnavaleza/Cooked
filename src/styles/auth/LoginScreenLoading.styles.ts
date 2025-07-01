import { StyleSheet, Dimensions } from 'react-native';
import { typography } from '../typography';

const { width, height } = Dimensions.get('window');

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
    backgroundColor: 'rgba(243, 215, 125, 0.6)', // Yellow overlay with 70% opacity
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
    color: '#4A3531',
    fontFamily: typography.fonts.semiBold,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    color: '#4A3531', // Brown color
    fontFamily: typography.fonts.bold,
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 24,
    color: '#4A3531',
    fontFamily: typography.fonts.regular,
    marginTop: 16,
    marginBottom: 40,
  },
  appName: {
    fontSize: 28,
    color: '#4A3531',
    fontFamily: typography.fonts.bold,
    position: 'absolute',
    bottom: 40,
  },
}); 