import { StyleSheet } from 'react-native';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: typography.fonts.bold,
  },
  saveText: {
    fontSize: 16,
    color: '#C84B31',
    fontWeight: 'bold',
    fontFamily: typography.fonts.bold,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#C84B31',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontFamily: typography.fonts.regular,
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily: typography.fonts.bold,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    fontFamily: typography.fonts.bold,
  },
  optionsContainer: {
    paddingBottom: 20,
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
  selectedRow: {
    backgroundColor: '#E8F3E9',
    borderWidth: 2,
    borderColor: '#C84B31',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCC',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#C84B31',
    borderColor: '#C84B31',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: typography.fonts.regular,
  },
}); 