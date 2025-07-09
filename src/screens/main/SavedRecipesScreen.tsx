import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { recipeApi } from '../../api/recipes';
import Screen from '../../components/Screen';
import { styles } from '../../styles/main/SavedRecipesScreen.styles';
import { MainStackParamList } from '../../navigation/types';

interface Recipe {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  savedDate: string;
  recipeId: string;
}

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const SavedRecipesScreen = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const loadSavedRecipes = async () => {
    try {
      const savedRecipes = await recipeApi.getSavedRecipes();
      setRecipes(savedRecipes);
    } catch (error) {
      console.error('Error loading saved recipes:', error);
    }
  };

  const handleRecipePress = (recipe: Recipe) => {
    navigation.navigate('RecipeDetails', { recipeId: recipe.recipeId });
  };

  const renderRecipeItem = ({ item }: { item: Recipe }) => {
    const date = new Date(item.savedDate);
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short',
      year: 'numeric'
    });

    return (
      <TouchableOpacity
        style={styles.recipeItem}
        onPress={() => handleRecipePress(item)}
      >
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <View style={styles.difficultyContainer}>
            <Text style={[
              styles.difficultyText,
              item.difficulty === 'Easy' && styles.easyText,
              item.difficulty === 'Intermediate' && styles.intermediateText,
              item.difficulty === 'Advanced' && styles.advancedText,
            ]}>
              {item.difficulty}
            </Text>
          </View>
        </View>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>My Recipes</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All Recipes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'my' && styles.activeTab]}
            onPress={() => setActiveTab('my')}
          >
            <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
              My Recipes
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recipes}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </Screen>
  );
};

export default SavedRecipesScreen; 