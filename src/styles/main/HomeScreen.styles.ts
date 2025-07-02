import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#C84B31',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  recipeOfDay: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  recipeCard: {
    backgroundColor: '#C84B31',
    borderRadius: 12,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  recipeInfo: {
    padding: 15,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  recipeMetrics: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metricText: {
    color: '#FFF',
    marginLeft: 5,
  },
  recipeDescription: {
    color: '#FFF',
    marginBottom: 15,
    lineHeight: 20,
  },
  viewButton: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#C84B31',
    fontWeight: 'bold',
  },
  exploreSection: {
    padding: 20,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  exploreCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exploreImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    margin: 10,
  },
  exploreInfo: {
    flex: 1,
    padding: 10,
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exploreMetrics: {
    marginBottom: 5,
  },
  exploreMetric: {
    color: '#666',
    fontSize: 12,
  },
  difficultyTag: {
    backgroundColor: '#E8F3E9',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: '#4CAF50',
    fontSize: 12,
  },
  seeAllButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#C84B31',
    alignItems: 'center',
    marginTop: 10,
  },
  seeAllText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  newsletterSection: {
    backgroundColor: '#C84B31',
    padding: 20,
  },
  newsletterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  newsletterSubtitle: {
    color: '#FFF',
    marginBottom: 20,
  },
  newsletterInput: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  emailInput: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  joinButton: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  joinButtonText: {
    color: '#C84B31',
    fontWeight: 'bold',
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#C84B31',
  },
  contactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  footerLink: {
    color: '#FFF',
    marginHorizontal: 5,
  },
  footerDivider: {
    color: '#FFF',
    marginHorizontal: 5,
  },
}); 