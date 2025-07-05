import { StyleSheet } from 'react-native';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#C84B31',
    fontFamily: typography.fonts.regular,
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontFamily: typography.fonts.bold,
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#C84B31',
    fontFamily: typography.fonts.bold,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    padding: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTabButton: {
    backgroundColor: '#C84B31',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: typography.fonts.medium,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: '#E8F3E9',
    borderWidth: 2,
    borderColor: '#C84B31',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: typography.fonts.regular,
  },
  otherInput: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    fontSize: 16,
    color: '#333',
    fontFamily: typography.fonts.regular,
  },
}); 