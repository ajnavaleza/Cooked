import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { recipeService } from '../../api/recipes';
import { spoonacularApi } from '../../api/spoonacular';
import { typography } from '../../styles/typography';

interface SavedRecipe {
  id: string;
  recipeId: string;
  title: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  savedAt: Date;
}

const SavedRecipesScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('My Recipes');
  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSavedRecipes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const savedRecipes = await recipeService.getSavedRecipes();
      const detailedRecipes = await Promise.all(
        savedRecipes.map(async (recipe) => {
          try {
            const recipeDetails = await spoonacularApi.getRecipeInformation(
              parseInt(recipe.recipeId),
              { includeNutrition: true }
            );
            let difficulty = 'Easy';
            if (recipeDetails.extendedIngredients.length > 10 || recipeDetails.readyInMinutes > 45) {
              difficulty = 'Intermediate';
            }
            if (recipeDetails.extendedIngredients.length > 15 || recipeDetails.readyInMinutes > 90) {
              difficulty = 'Advanced';
            }
            return {
              id: recipe.recipeId,
              recipeId: recipe.recipeId,
              title: recipeDetails.title,
              difficulty,
              savedAt: new Date(),
            };
          } catch (error) {
            return null;
          }
        })
      );
      const validRecipes = detailedRecipes
        .filter((recipe): recipe is SavedRecipe => recipe !== null)
        .sort((a, b) => b.savedAt.getTime() - a.savedAt.getTime());
      setRecipes(validRecipes);
    } catch (error) {
      setError('Failed to load saved recipes');
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh recipes when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchSavedRecipes();
    }, [])
  );

  const renderRecipeItem = ({ item }: { item: SavedRecipe }) => {
    const getDateString = (date: Date) => {
      const now = new Date();
      if (date.toDateString() === now.toDateString()) {
        return 'Today';
      }
      return date.toLocaleDateString('default', { month: 'short', year: 'numeric' });
    };

    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'Easy':
          return '#4CAF50';
        case 'Intermediate':
          return '#FF9800';
        case 'Advanced':
          return '#F44336';
        default:
          return '#4CAF50';
      }
    };

    return (
      <TouchableOpacity
        style={styles.recipeItem}
        onPress={() => navigation.navigate('RecipeDetails', { recipeId: parseInt(item.recipeId) })}
      >
        <View style={styles.recipeContent}>
          <View>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>
          <Text style={styles.dateText}>{getDateString(item.savedAt)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>My Recipes</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Explore')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'All Recipes' && styles.activeTab]}
        onPress={() => setActiveTab('All Recipes')}
      >
        <Text style={[styles.tabText, activeTab === 'All Recipes' && styles.activeTabText]}>
          All Recipes
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'My Recipes' && styles.activeTab]}
        onPress={() => setActiveTab('My Recipes')}
      >
        <Text style={[styles.tabText, activeTab === 'My Recipes' && styles.activeTabText]}>
          My Recipes
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchSavedRecipes}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      <FlatList
        data={recipes}
        renderItem={renderRecipeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No saved recipes yet</Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Explore')}
            >
              <Text style={styles.exploreButtonText}>Explore Recipes</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: typography.fonts.semiBold,
    color: '#2C1810',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
  },
  activeTab: {
    backgroundColor: '#FF6B6B',
  },
  tabText: {
    fontSize: 14,
    fontFamily: typography.fonts.medium,
    color: '#666',
  },
  activeTabText: {
    color: '#FFF',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recipeItem: {
    backgroundColor: '#FFF5F1',
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipeContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  recipeTitle: {
    fontSize: 18,
    fontFamily: typography.fonts.semiBold,
    color: '#2C1810',
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: typography.fonts.medium,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    fontFamily: typography.fonts.medium,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: typography.fonts.medium,
  },
  retryButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.medium,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    fontFamily: typography.fonts.medium,
  },
  exploreButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: typography.fonts.medium,
  },
});

export default SavedRecipesScreen; 