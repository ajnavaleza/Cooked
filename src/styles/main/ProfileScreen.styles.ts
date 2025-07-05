import { StyleSheet } from 'react-native';
import { sharedStyles } from './shared.styles';
import { typography } from '../../styles/typography';

export const styles = StyleSheet.create({
  ...sharedStyles,
  
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
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
    fontFamily: typography.fonts.semiBold,
    color: '#8B4513',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#A0522D',
    marginBottom: 20,
    fontFamily: typography.fontFamily,
  },
  editButton: {
    backgroundColor: 'rgba(200, 75, 49, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C84B31',
  },
  editButtonText: {
    color: '#C84B31',
    fontSize: 14,
    fontFamily: typography.fontFamily,
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
    fontFamily: typography.fontFamily,
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
  },
  
  // Tab Content
  tabContent: {
    paddingHorizontal: 20,
  },
  
  // Preferences Section
  preferencesContainer: {
    ...sharedStyles.card,
    marginBottom: 20,
  },
  preferenceSection: {
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 16,
    fontFamily: typography.fonts.semiBold,
    color: '#555',
    marginBottom: 10,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  otherAllergyText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    backgroundColor: '#F9F9F9',
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#C84B31',
    fontFamily: typography.fontFamily,
  },
  
  // Error Container
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: typography.fonts.semiBold,
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: typography.fontFamily,
  },
  
  // Logout Button
  logoutButton: {
    ...sharedStyles.secondaryButton,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  logoutText: {
    ...sharedStyles.secondaryButtonText,
    marginLeft: 8,
  },
}); 