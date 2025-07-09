import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { spoonacularApi, SpoonacularRecipe } from '../../api/spoonacular';
import { typography } from '../../styles/typography';
import API from '../../api';

const { width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

interface RecipeDetailsScreenProps {
  route: {
    params: {
      recipeId: number;
    };
  };
  navigation: any;
}

const RecipeDetailsScreen: React.FC<RecipeDetailsScreenProps> = ({ route, navigation }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<SpoonacularRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchRecipeDetails();
    checkIfRecipeIsSaved();
  }, [recipeId]);

  const fetchRecipeDetails = async () => {
    try {
      setIsLoading(true);
      const recipeData = await spoonacularApi.getRecipeInformation(recipeId, {
        includeNutrition: true,
      });
      setRecipe(recipeData);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfRecipeIsSaved = async () => {
    try {
      const response = await API.get('/user/recipes/saved');
      const savedRecipes = response.data;
      setIsSaved(savedRecipes.some((recipe: any) => recipe.recipeId === recipeId.toString()));
    } catch (error) {
      console.error('Error checking saved recipe status:', error);
    }
  };

  const handleSaveRecipe = async () => {
    try {
      setIsSaving(true);
      if (isSaved) {
        await API.delete(`/user/recipes/save/${recipeId}`);
        setIsSaved(false);
        Alert.alert('Success', 'Recipe removed from saved recipes');
      } else {
        await API.post('/recipes/save', { recipeId: recipeId.toString() });
        setIsSaved(true);
        Alert.alert('Success', 'Recipe saved successfully');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      Alert.alert('Error', 'Failed to save recipe. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load recipe details</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.saveButton, isSaved && styles.savedButton]}
          onPress={handleSaveRecipe}
          disabled={isSaving}
        >
          <MaterialIcons 
            name={isSaved ? "bookmark" : "bookmark-border"} 
            size={24} 
            color="#FFF" 
          />
        </TouchableOpacity>
      </View>

      {/* Recipe Info */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{recipe.title}</Text>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          <View style={styles.metricItem}>
            <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#666" />
            <Text style={styles.metricValue}>{recipe.servings}</Text>
            <Text style={styles.metricLabel}>Servings</Text>
          </View>
          <View style={styles.metricItem}>
            <MaterialIcons name="schedule" size={24} color="#666" />
            <Text style={styles.metricValue}>{recipe.readyInMinutes}</Text>
            <Text style={styles.metricLabel}>Minutes</Text>
          </View>
          <View style={styles.metricItem}>
            <MaterialIcons name="local-fire-department" size={24} color="#666" />
            <Text style={styles.metricValue}>
              {recipe.nutrition?.nutrients.find(n => n.name === 'Calories')?.amount.toFixed(0) || '---'}
            </Text>
            <Text style={styles.metricLabel}>Calories</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.summary}>
            {recipe.summary.replace(/<[^>]*>/g, '')}
          </Text>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
              <Text style={styles.ingredientText}>
                {ingredient.amount} {ingredient.unit} {ingredient.name}
              </Text>
            </View>
          ))}
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.number}</Text>
              </View>
              <Text style={styles.instructionText}>{step.step}</Text>
            </View>
          ))}
        </View>

        {/* Additional Info */}
        {recipe.diets.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dietary Info</Text>
            <View style={styles.tagsContainer}>
              {recipe.diets.map((diet, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{diet}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    fontFamily: typography.fonts.medium,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + 10,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + 10,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.8)',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontFamily: typography.fonts.bold,
    marginBottom: 16,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#FFF8F3',
    borderRadius: 12,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 18,
    color: '#333',
    fontFamily: typography.fonts.semiBold,
    marginTop: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: typography.fonts.regular,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
    fontFamily: typography.fonts.semiBold,
    marginBottom: 12,
  },
  summary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    fontFamily: typography.fonts.regular,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  ingredientText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    fontFamily: typography.fonts.regular,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: typography.fonts.semiBold,
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    fontFamily: typography.fonts.regular,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#FFF8F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#FF6B6B',
    fontFamily: typography.fonts.medium,
  },
});

export default RecipeDetailsScreen; 