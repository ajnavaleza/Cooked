import { StyleSheet } from 'react-native';
import { typography } from '../typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: typography.fonts.semiBold,
    fontSize: typography.sizes.xl,
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
    fontFamily: typography.fonts.regular,
    fontSize: typography.sizes.md,
    color: '#666666',
  },
  activeTabText: {
    color: '#C84B31',
    fontFamily: typography.fonts.semiBold,
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
    fontFamily: typography.fonts.semiBold,
    fontSize: typography.sizes.lg,
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
    fontFamily: typography.fonts.medium,
    fontSize: typography.sizes.sm,
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
    fontFamily: typography.fonts.regular,
    fontSize: typography.sizes.sm,
    color: '#666666',
  },
}); 