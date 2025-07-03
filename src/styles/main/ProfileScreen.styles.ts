import { StyleSheet } from 'react-native';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
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
    marginTop: 20,
    marginBottom: 10,
    fontFamily: typography.fonts.bold,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: typography.fonts.regular,
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
    fontWeight: 'bold',
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
    fontWeight: '500',
    fontFamily: typography.fonts.medium,
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
    fontWeight: '500',
    color: '#666',
    fontFamily: typography.fonts.medium,
  },
  activeTabText: {
    color: '#FFF',
    fontFamily: typography.fonts.medium,
  },
  
  // Tab Content
  tabContent: {
    paddingHorizontal: 20,
  },
  
  // Preferences Section
  preferencesContainer: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: typography.fonts.bold,
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
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: typography.fonts.medium,
  },
  preferenceSection: {
    marginBottom: 20,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 10,
    fontFamily: typography.fonts.semiBold,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
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
    fontWeight: '500',
    fontFamily: typography.fonts.medium,
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
    fontFamily: typography.fonts.regular,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
    fontFamily: typography.fonts.semiBold,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: typography.fonts.regular,
  },
  
  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C84B31',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoutText: {
    color: '#C84B31',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: typography.fonts.semiBold,
  },
}); 