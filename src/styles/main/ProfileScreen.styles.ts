import { StyleSheet } from 'react-native';
import { sharedStyles } from './shared.styles';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  ...sharedStyles,
  
  scrollContainer: {
    flex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  
  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: typography.fonts.regular,
  },
  
  // Error states
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: typography.fonts.bold,
  },
  errorMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: typography.fonts.regular,
  },
  retryButton: {
    backgroundColor: '#C84B31',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: typography.fonts.bold,
  },
  
  // Profile Header
  profileHeader: {
    backgroundColor: '#F0E6D2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    color: '#8B4513',
    marginBottom: 5,
    fontFamily: typography.fonts.bold,
  },
  userEmail: {
    fontSize: 16,
    color: '#A0522D',
    marginBottom: 10,
    fontFamily: typography.fonts.regular,
  },
  userBirthday: {
    fontSize: 14,
    color: '#A0522D',
    marginBottom: 20,
    fontFamily: typography.fonts.regular,
  },
  
  // Tabs
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#C84B31',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontFamily: typography.fonts.medium,
  },
  activeTabText: {
    color: '#FFF',
    fontFamily: typography.fonts.medium,
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  
  // Profile content
  profileSection: {
    padding: 20,
    backgroundColor: '#FFF',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
    fontFamily: typography.fonts.semiBold,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontFamily: typography.fonts.regular,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontFamily: typography.fonts.medium,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    color: '#C84B31',
    marginLeft: 5,
    fontFamily: typography.fonts.medium,
  },
  
  // Preferences section
  preferencesSection: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 10,
  },
  preferencesContainer: {
    ...sharedStyles.card,
    marginBottom: 20,
  },
  preferencesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  editPreferencesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(200, 75, 49, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C84B31',
  },
  editPreferencesText: {
    color: '#C84B31',
    fontSize: 14,
    marginLeft: 4,
    fontFamily: typography.fonts.medium,
  },
  preferenceSection: {
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    fontFamily: typography.fonts.semiBold,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  preferencesList: {
    marginTop: 10,
  },
  preferenceItem: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  preferenceText: {
    fontSize: 14,
    color: '#333',
    fontFamily: typography.fonts.regular,
  },
  otherAllergyText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
    fontFamily: typography.fonts.regular,
  },
  
  // Logout button
  logoutButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 20,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: typography.fonts.bold,
  },
}); 