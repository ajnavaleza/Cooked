import { StyleSheet } from 'react-native';
import { sharedStyles } from './shared.styles';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  text: {
    fontSize: 20,
    color: '#333',
    fontFamily: typography.fonts.regular,
  },
}); 