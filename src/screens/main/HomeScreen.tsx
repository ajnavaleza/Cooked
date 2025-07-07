import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  ImageSourcePropType,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../styles/main/HomeScreen.styles';
import { spoonacularApi, SpoonacularRecipe } from '../../api/spoonacular';
import * as auth from '../../api/auth';

interface RecipeCardProps {
  title: string;
  image: ImageSourcePropType | string;
  servingSize: string | number;
  minutes: string | number;
  difficulty?: string;
  onPress: () => void;
  isRecipeOfDay?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ 
  title, 
  image, 
  servingSize, 
  minutes, 
  difficulty = '', 
  onPress,
  isRecipeOfDay = false 
}) => {
  const containerStyle = isRecipeOfDay ? styles.recipeOfTheDay : styles.recipeCard;
  const titleStyle = isRecipeOfDay ? styles.recipeOfTheDayTitle : styles.recipeTitle;
  const textColor = isRecipeOfDay ? '#FFF' : '#666';

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image 
        source={typeof image === 'string' ? { uri: image } : image} 
        style={styles.recipeImage}
        resizeMode="cover"
      />
      <View style={isRecipeOfDay ? styles.recipeOfTheDayContent : styles.recipeInfo}>
        {isRecipeOfDay && (
          <Text style={styles.recipeOfTheDayLabel}>RECIPE OF THE DAY</Text>
        )}
        <Text style={titleStyle} numberOfLines={2}>{title}</Text>
        <View style={styles.recipeMetrics}>
          <View style={styles.metricItem}>
            <MaterialCommunityIcons 
              name="silverware-fork-knife" 
              size={20} 
              color={textColor} 
            />
            <Text style={[styles.metricText, { color: textColor }]}>{servingSize}</Text>
          </View>
          <View style={styles.metricItem}>
            <MaterialIcons 
              name="schedule" 
              size={20} 
              color={textColor} 
            />
            <Text style={[styles.metricText, { color: textColor }]}>{minutes}</Text>
          </View>
          <View style={styles.metricItem}>
            <MaterialIcons 
              name="star" 
              size={20} 
              color={textColor} 
            />
            <Text style={[styles.metricText, { color: textColor }]}>
              {difficulty}
            </Text>
          </View>
        </View>
        {isRecipeOfDay && (
          <Text style={styles.recipeOfTheDayDescription} numberOfLines={3}>
            A sweet and savory pizza topped with chicken, pineapple, melted mozzarella, onions, and cilantro all on a crispy golden crust!
          </Text>
        )}
        {isRecipeOfDay ? (
          <TouchableOpacity style={styles.viewRecipeButton} onPress={onPress}>
            <Text style={styles.viewRecipeButtonText}>View recipe</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.difficultyBadge, { 
            backgroundColor: difficulty === 'Easy' ? '#4CAF50' : '#FF9800' 
          }]}>
            <Text style={styles.difficultyText}>{difficulty}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const RECIPE_OF_DAY_KEY = '@recipe_of_day';
const RECIPE_OF_DAY_TIMESTAMP_KEY = '@recipe_of_day_timestamp';

interface HomeScreenProps {
  navigation: any;
}

interface UserPreferences {
  cuisines?: string[];
  diets?: string[];
  allergies?: string[];
  recipeTypes?: string[];
  allergyOther?: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [recipes, setRecipes] = useState<SpoonacularRecipe[]>([]);
  const [recipeOfTheDay, setRecipeOfTheDay] = useState<SpoonacularRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  useEffect(() => {
    loadUserPreferences();
  }, []);

  useEffect(() => {
    if (userPreferences) {
      fetchRecipeOfTheDay();
      fetchInitialRecipes();
    }
  }, [userPreferences]);

  const loadUserPreferences = async () => {
    try {
      const userData = await auth.getUser();
      if (userData.preferences) {
        setUserPreferences(userData.preferences);
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
      // Continue without preferences if they can't be loaded
      setUserPreferences({});
    }
  };

  const getSearchParams = (randomize: boolean = false) => {
    if (!userPreferences) return {};

    const params: any = {
      addRecipeInformation: true,
      fillIngredients: true,
    };

    // Add cuisine preferences if any are selected
    if (userPreferences.cuisines?.length && !userPreferences.cuisines.includes('Any')) {
      params.cuisine = userPreferences.cuisines.join(',');
    }

    // Add diet preferences if any are selected
    if (userPreferences.diets?.length && !userPreferences.diets.includes('No specific diet')) {
      // Map our diet names to Spoonacular's diet parameters
      const dietMapping: { [key: string]: string } = {
        'Vegetarian': 'vegetarian',
        'Vegan': 'vegan',
        'Gluten-Free': 'gluten free',
        'Dairy-Free': 'dairy free',
        'Low-Carb / Keto': 'ketogenic',
        'High-Protein': 'high protein',
      };
      const mappedDiets = userPreferences.diets
        .map(diet => dietMapping[diet])
        .filter(diet => diet); // Remove undefined mappings
      if (mappedDiets.length) {
        params.diet = mappedDiets.join(',');
      }
    }

    // Add allergy preferences if any are selected
    if (userPreferences.allergies?.length) {
      const allergyMapping: { [key: string]: string } = {
        'Nut-Free': 'tree nut',
        'Gluten-Free': 'gluten',
        'Dairy-Free': 'dairy',
        'Egg-Free': 'egg',
        'Shellfish-Free': 'shellfish',
        'Soy-Free': 'soy'
      };
      const mappedAllergies = userPreferences.allergies
        .map(allergy => allergyMapping[allergy])
        .filter(allergy => allergy); // Remove undefined mappings
      if (mappedAllergies.length) {
        params.intolerances = mappedAllergies.join(',');
      }
    }

    // Add meal type preferences if any are selected
    if (userPreferences.recipeTypes?.length) {
      const typeMapping: { [key: string]: string } = {
        'Breakfast': 'breakfast',
        'Lunch': 'lunch',
        'Dinner': 'main course',
        'Snacks': 'snack',
        'Desserts': 'dessert',
        'Appetizers': 'appetizer',
        'Soups & Salads': 'soup,salad',
        'Side Dishes': 'side dish'
      };
      const mappedTypes = userPreferences.recipeTypes
        .map(type => typeMapping[type])
        .filter(type => type); // Remove undefined mappings
      if (mappedTypes.length) {
        params.type = mappedTypes[randomize ? Math.floor(Math.random() * mappedTypes.length) : 0];
      }
    }

    return params;
  };

  const shouldUpdateRecipeOfDay = async (): Promise<boolean> => {
    try {
      const timestampStr = await AsyncStorage.getItem(RECIPE_OF_DAY_TIMESTAMP_KEY);
      if (!timestampStr) return true;

      const timestamp = new Date(timestampStr);
      const now = new Date();

      // Check if the stored timestamp is from a different day
      return (
        timestamp.getDate() !== now.getDate() ||
        timestamp.getMonth() !== now.getMonth() ||
        timestamp.getFullYear() !== now.getFullYear()
      );
    } catch (error) {
      console.error('Error checking recipe timestamp:', error);
      return true;
    }
  };

  const fetchRecipeOfTheDay = async () => {
    try {
      setIsLoading(true);

      // Try to get cached recipe first
      const cachedRecipe = await AsyncStorage.getItem(RECIPE_OF_DAY_KEY);
      const needsUpdate = await shouldUpdateRecipeOfDay();

      if (cachedRecipe && !needsUpdate) {
        setRecipeOfTheDay(JSON.parse(cachedRecipe));
        setIsLoading(false);
        return;
      }

      // Fetch new recipe if needed
      const params = getSearchParams(true); // Randomize the meal type
      const response = await spoonacularApi.getRandomRecipes({
        ...params,
        number: 1,
        include_nutrition: true
      });
      
      if (response.recipes.length > 0) {
        const newRecipe = response.recipes[0];
        setRecipeOfTheDay(newRecipe);

        // Cache the new recipe and timestamp
        await AsyncStorage.setItem(RECIPE_OF_DAY_KEY, JSON.stringify(newRecipe));
        await AsyncStorage.setItem(RECIPE_OF_DAY_TIMESTAMP_KEY, new Date().toISOString());
      }
    } catch (error) {
      console.error('Error fetching recipe of the day:', error);
      // Try to use cached recipe even if it's old in case of error
      try {
        const cachedRecipe = await AsyncStorage.getItem(RECIPE_OF_DAY_KEY);
        if (cachedRecipe) {
          setRecipeOfTheDay(JSON.parse(cachedRecipe));
        } else {
          Alert.alert('Error', 'Failed to fetch recipe of the day. Please try again later.');
        }
      } catch (storageError) {
        Alert.alert('Error', 'Failed to fetch recipe of the day. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInitialRecipes = async () => {
    try {
      setIsLoadingInitial(true);
      const params = getSearchParams();
      const response = await spoonacularApi.searchRecipes({
        ...params,
        number: 10,
        sort: 'popularity',
        addRecipeInformation: true
      });
      setRecipes(response.results);
    } catch (error) {
      console.error('Error fetching initial recipes:', error);
      Alert.alert('Error', 'Failed to fetch recipes. Please try again later.');
    } finally {
      setIsLoadingInitial(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    try {
      setIsSearching(true);
      const params = getSearchParams();
      const response = await spoonacularApi.searchRecipes({
        ...params,
        query: searchQuery,
        number: 10,
        addRecipeInformation: true
      });
      setRecipes(response.results);
    } catch (error) {
      console.error('Error searching recipes:', error);
      Alert.alert('Error', 'Failed to search recipes. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleRecipePress = (recipe: SpoonacularRecipe) => {
    navigation.navigate('RecipeDetails', { recipeId: recipe.id });
  };

  return (
    <View style={styles.container}>
      <StatusBar 
        translucent 
        backgroundColor="transparent" 
        barStyle="light-content"
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section with Background */}
        <ImageBackground
          source={require('../../assets/main-page/main-page-bg.jpg')}
          style={styles.hero}
          resizeMode="cover"
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Simple recipes{'\n'}for students</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search recipes or ingredients..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                placeholderTextColor="#999"
                editable={!error}
              />
              <TouchableOpacity 
                onPress={handleSearch} 
                style={[styles.searchButton, error && styles.searchButtonDisabled]}
                disabled={!!error}
              >
                {isSearching ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Ionicons name="search" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {error ? (
          <View style={styles.section}>
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={48} color="#FF6B6B" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </View>
        ) : (
          <>
            {/* Recipe of the Day */}
            <View style={styles.section}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
              ) : recipeOfTheDay && (
                <RecipeCard
                  title={recipeOfTheDay.title}
                  image={recipeOfTheDay.image}
                  servingSize={recipeOfTheDay.servings}
                  minutes={recipeOfTheDay.readyInMinutes}
                  difficulty={recipeOfTheDay.healthScore >= 80 ? 'Easy' : 'Advanced'}
                  onPress={() => handleRecipePress(recipeOfTheDay)}
                  isRecipeOfDay
                />
              )}
            </View>

            {/* Search Results or Explore Recipes */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {searchQuery ? 'Search Results' : 'Simple Recipes for Students'}
              </Text>
              {searchQuery && (
                <Text style={styles.sectionSubtitle}>
                  {recipes.length} results for "{searchQuery}"
                </Text>
              )}
              
              {isLoadingInitial ? (
                <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
              ) : (
                <>
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      title={recipe.title}
                      image={recipe.image}
                      servingSize={recipe.servings}
                      minutes={recipe.readyInMinutes}
                      difficulty={recipe.healthScore >= 80 ? 'Easy' : 'Medium'}
                      onPress={() => handleRecipePress(recipe)}
                    />
                  ))}
                  {!searchQuery && (
                    <TouchableOpacity style={styles.seeAllButton} onPress={() => {}}>
                      <Text style={styles.seeAllButtonText}>See all recipes</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen; 