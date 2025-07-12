import { StyleSheet, Dimensions, StatusBar, Platform } from 'react-native';
import { sharedStyles } from './shared.styles';
import { typography } from '../typography';

const { width, height } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

export const styles = StyleSheet.create({
  ...sharedStyles,
  container: {
    ...sharedStyles.container,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    height: height, // Full screen height
    width: '100%',
    marginTop: -STATUS_BAR_HEIGHT,
  },
  heroOrangeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 124, 76, 0.6)', // #C3552C with 40% opacity
    zIndex: 1,
  },
  heroContent: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darker overlay for better text visibility
    padding: 20,
    paddingTop: STATUS_BAR_HEIGHT + 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  heroTitle: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: typography.fonts.bold,
    width: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '90%',
    maxWidth: 400,
    overflow: 'hidden',
    marginTop: 20,
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
    padding: 12,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#333',
    marginBottom: 5,
    fontFamily: typography.fonts.bold,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    fontStyle: 'italic',
    fontFamily: typography.fonts.regular,
  },
  recipeOfTheDay: {
    backgroundColor: '#C84B31',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  recipeOfTheDayImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recipeOfTheDayContent: {
    padding: 20,
  },
  recipeOfTheDayLabel: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 8,
    fontFamily: typography.fonts.semiBold,
    textTransform: 'uppercase',
  },
  recipeOfTheDayTitle: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 15,
    fontFamily: typography.fonts.bold,
  },
  recipeMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metricIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: '#FFF',
  },
  metricText: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: typography.fonts.medium,
  },
  recipeOfTheDayDescription: {
    fontSize: 14,
    color: '#FFF',
    marginVertical: 12,
    lineHeight: 20,
    fontFamily: typography.fonts.regular,
  },
  viewRecipeButton: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  viewRecipeButtonText: {
    color: '#C84B31',
    fontSize: 16,
    fontFamily: typography.fonts.semiBold,
  },
  recipeCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recipeInfo: {
    padding: 16,
    backgroundColor: '#FFF8F3',
  },
  recipeTitle: {
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
    fontFamily: typography.fonts.semiBold,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: typography.fonts.medium,
    textTransform: 'uppercase',
  },
  seeAllButton: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C84B31',
    marginTop: 10,
  },
  seeAllButtonText: {
    color: '#C84B31',
    fontSize: 16,
    fontFamily: typography.fonts.semiBold,
  },
  loader: {
    marginVertical: 20,
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF8F8',
    borderRadius: 16,
    marginVertical: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginTop: 12,
    fontFamily: typography.fonts.medium,
  },
  searchButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
}); 