import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform, StatusBar } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/types';
import { recipeApi, Recipe } from '../../api/recipes';
import { typography } from '../../styles/typography';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

type Props = NativeStackScreenProps<MainStackParamList, 'RecipeDetails'>;

const RecipeDetailsScreen = ({ route, navigation }: Props) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [recipeId]);

  const loadRecipe = async () => {
    try {
      const recipeData = await recipeApi.getRecipeById(recipeId);
      setRecipe(recipeData);
    } catch (error) {
      console.error('Error loading recipe:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecipe = async () => {
    if (!recipe) return;
    
    try {
      if (!isSaved) {
        await recipeApi.saveRecipe({
          title: recipe.title,
          difficulty: recipe.difficulty === 'Medium' ? 'Intermediate' : recipe.difficulty,
          recipeId: recipe.id,
          sourceType: 'spoonacular'
        });
        setIsSaved(true);
      } else {
        await recipeApi.deleteSavedRecipe(recipe.id);
        setIsSaved(false);
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  if (isLoading || !recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSaveRecipe}>
            <MaterialCommunityIcons 
              name={isSaved ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color="#FFF" 
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{recipe.title}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialIcons name="people" size={20} color="#666" />
            <Text style={styles.infoText}>{recipe.servings} servings</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="timer" size={20} color="#666" />
            <Text style={styles.infoText}>{recipe.readyInMinutes} mins</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="restaurant" size={20} color="#666" />
            <Text style={styles.infoText}>{recipe.difficulty}</Text>
          </View>
        </View>
      </View>
    </View>
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
  },
  imageContainer: {
    height: width * 0.8,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontFamily: typography.fonts.semiBold,
    fontSize: typography.sizes.xl,
    color: '#2D2D2D',
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 8,
    fontFamily: typography.fonts.regular,
    fontSize: typography.sizes.md,
    color: '#666',
  },
});

export default RecipeDetailsScreen; 