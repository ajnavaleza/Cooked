import { StyleSheet } from 'react-native';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
    fontWeight: '600',
    color: '#2B2B2B',
    fontFamily: typography.fonts.semiBold,
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#C84B31',
    fontWeight: '600',
    fontFamily: typography.fonts.semiBold,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#C84B31',
  },
  tabText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
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
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F5F5F5',
  },
  selectedOption: {
    backgroundColor: '#F8E2DD',
  },
  optionText: {
    fontSize: 16,
    color: '#2B2B2B',
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
    color: '#2B2B2B',
    fontFamily: typography.fonts.regular,
  },
}); 