import { StyleSheet } from 'react-native';
import { typography } from '../../styles/typography';

export const sharedStyles = StyleSheet.create({
  // Base container styles
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerDark: {
    flex: 1,
    backgroundColor: '#000',
  },
  
  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainerLight: {
    backgroundColor: '#F5F5F5',
  },
  loadingContainerDark: {
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: typography.fontFamily,
  },
  loadingTextLight: {
    color: '#666',
  },
  loadingTextDark: {
    color: '#FFF',
  },

  // Error states
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainerLight: {
    backgroundColor: '#F5F5F5',
  },
  errorContainerDark: {
    backgroundColor: '#000',
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: typography.fonts.semiBold,
    marginTop: 20,
    marginBottom: 10,
  },
  errorTitleLight: {
    color: '#333',
  },
  errorTitleDark: {
    color: '#FFF',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: typography.fontFamily,
  },
  errorTextLight: {
    color: '#666',
  },
  errorTextDark: {
    color: '#FFF',
    opacity: 0.8,
  },

  // Common text styles
  sectionTitle: {
    fontSize: 20,
    fontFamily: typography.fonts.semiBold,
    marginBottom: 20,
  },
  sectionTitleLight: {
    color: '#333',
  },
  sectionTitleDark: {
    color: '#FFF',
  },
  
  // Common button styles
  primaryButton: {
    backgroundColor: '#C84B31',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontFamily: typography.fonts.semiBold,
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C84B31',
  },
  secondaryButtonText: {
    color: '#C84B31',
    fontFamily: typography.fonts.semiBold,
    fontSize: 16,
  },

  // Common card styles
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Common chip styles
  chip: {
    backgroundColor: '#F0E6D2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C84B31',
  },
  chipText: {
    color: '#8B4513',
    fontSize: 14,
    fontFamily: typography.fontFamily,
  },

  // Empty state styles
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: typography.fonts.semiBold,
    marginTop: 15,
    marginBottom: 8,
  },
  emptyStateTitleLight: {
    color: '#333',
  },
  emptyStateTitleDark: {
    color: '#FFF',
  },
  emptyStateText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: typography.fontFamily,
  },
  emptyStateTextLight: {
    color: '#666',
  },
  emptyStateTextDark: {
    color: '#FFF',
    opacity: 0.8,
  },

  // Common metrics styles
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metricText: {
    marginLeft: 4,
    fontSize: 14,
    fontFamily: typography.fontFamily,
    color: '#666',
  },
}); 