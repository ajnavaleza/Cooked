import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { sharedStyles } from './shared.styles';
import { typography } from '../typography';

const { width, height } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

export const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    height: height,
    width: '100%',
    marginTop: -STATUS_BAR_HEIGHT,
  },
  heroContent: {
    flex: 1,
    backgroundColor: 'rgba(200, 75, 49, 0.4)',
    padding: 20,
    paddingTop: STATUS_BAR_HEIGHT + 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 32,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: typography.fonts.bold,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFF',
    opacity: 0.9,
    fontFamily: typography.fonts.regular,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    fontFamily: typography.fonts.regular,
  },
  searchButton: {
    backgroundColor: '#C84B31',
    padding: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    ...sharedStyles.sectionTitle,
    ...sharedStyles.sectionTitleLight,
    fontSize: 24,
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    fontFamily: typography.fonts.regular,
  },
  recipeOfTheDay: {
    ...sharedStyles.card,
  },
  recipeOfTheDayImage: {
    width: '100%',
    height: 200,
  },
  recipeOfTheDayContent: {
    padding: 20,
  },
  recipeOfTheDayLabel: {
    fontSize: 14,
    color: '#C84B31',
    marginBottom: 8,
    fontFamily: typography.fonts.semiBold,
  },
  recipeOfTheDayTitle: {
    fontSize: 24,
    color: '#333',
    marginBottom: 15,
    fontFamily: typography.fonts.bold,
  },
  recipeOfTheDayDescription: {
    fontSize: 16,
    color: '#666',
    marginVertical: 12,
    lineHeight: 24,
    fontFamily: typography.fonts.regular,
  },
  viewRecipeButton: {
    ...sharedStyles.primaryButton,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  viewRecipeButtonText: {
    ...sharedStyles.primaryButtonText,
  },
  recipeCard: {
    ...sharedStyles.card,
    marginBottom: 20,
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  recipeInfo: {
    padding: 15,
  },
  recipeTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    fontFamily: typography.fonts.semiBold,
  },
  recipeMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  metricItem: {
    ...sharedStyles.metricItem,
  },
  metricText: {
    ...sharedStyles.metricText,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: typography.fonts.medium,
  },
}); 