import { StyleSheet } from 'react-native';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    ...typography.h1,
    marginBottom: 16,
    color: '#2D2D2D',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#F8F3EE',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabText: {
    ...typography.body2,
    color: '#666666',
  },
  activeTabText: {
    color: '#C84B31',
    fontFamily: typography.fonts.semibold,
  },
  listContainer: {
    paddingBottom: 16,
  },
  recipeItem: {
    backgroundColor: '#F8F3EE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recipeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recipeTitle: {
    ...typography.h3,
    flex: 1,
    marginRight: 12,
    color: '#2D2D2D',
  },
  difficultyContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  difficultyText: {
    ...typography.caption,
    fontFamily: typography.fonts.medium,
  },
  easyText: {
    color: '#4CAF50',
  },
  intermediateText: {
    color: '#FF9800',
  },
  advancedText: {
    color: '#F44336',
  },
  dateText: {
    ...typography.caption,
    color: '#666666',
  },
}); 