import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/main/HomeScreen.styles';
import { recipeService, Recipe } from '../../api/recipes';
import { debugApiKey } from '../../config/api';
import * as auth from '../../api/auth';

const HomeScreen = () => {
  const [recipeOfDay, setRecipeOfDay] = useState<Recipe | null>(null);
  const [exploreRecipes, setExploreRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userPreferences, setUserPreferences] = useState<any>(null);

  useEffect(() => {
    const initializeScreen = async () => {
      try {
        console.log('[HomeScreen] Initializing screen...');
        debugApiKey(); // Show detailed API key info
        
        // Fetch user preferences first
        try {
          console.log('[HomeScreen] Fetching user preferences...');
          
          // Check if user is logged in first
          const token = await import('@react-native-async-storage/async-storage').then(module => 
            module.default.getItem('token')
          );
          console.log('[HomeScreen] User token available:', !!token);
          
          if (!token) {
            console.log('[HomeScreen] No auth token found, user needs to log in');
            setUserPreferences(undefined);
            return;
          }
          
          const user = await auth.getUser();
          console.log('[HomeScreen] Raw user response:', user);
          console.log('[HomeScreen] User preferences object:', user.preferences);
          console.log('[HomeScreen] User preferences loaded:', {
            hasPreferences: !!user.preferences,
            cuisines: user.preferences?.cuisines || [],
            diets: user.preferences?.diets || [],
            allergies: user.preferences?.allergies || []
          });
          setUserPreferences(user.preferences || {});
        } catch (prefError: any) {
          console.log('[HomeScreen] Could not load user preferences:', prefError.message);
          console.log('[HomeScreen] Error status:', prefError.response?.status);
          console.log('[HomeScreen] Error details:', prefError.response?.data);
          setUserPreferences(undefined); // Set to undefined so recipes can load without preferences
        }
        
        // Test API connectivity
        const testRecipes = await recipeService.getRandomRecipes(undefined, 1);
        console.log('[HomeScreen] API test result:', testRecipes.length > 0 ? 'SUCCESS' : 'FAILED');
        
                 // Load recipes will be called separately after preferences are set
       } catch (error) {
         console.error('[HomeScreen] Initialization failed:', error);
         setLoading(false);
       }
     };
     
     initializeScreen();
   }, []);

   // Load recipes when userPreferences change (including null to undefined)
   useEffect(() => {
     if (userPreferences !== null) {
       loadRecipes();
     }
   }, [userPreferences]);

  const loadRecipes = async () => {
    setLoading(true);
    try {
      console.log('Starting to load recipes from API...');
      console.log('User preferences available:', !!userPreferences);
      
      // Get recipe of the day - single random recipe
      const recipeOfDayPromise = recipeService.getRandomRecipes('main course,easy', 1);
      
      // Get explore recipes based on user preferences
      let exploreRecipesPromise;
      if (userPreferences && (
        userPreferences.cuisines?.length > 0 || 
        userPreferences.diets?.length > 0 || 
        userPreferences.allergies?.length > 0
      )) {
        console.log('[HomeScreen] Loading personalized recipes based on preferences:', {
          cuisines: userPreferences.cuisines || [],
          diets: userPreferences.diets || [],
          allergies: userPreferences.allergies || []
        });
        exploreRecipesPromise = recipeService.getPersonalizedRecipes(userPreferences, 5);
      } else {
        console.log('[HomeScreen] No user preferences found, using default random recipes');
        exploreRecipesPromise = recipeService.getRandomRecipes('quick,healthy,student-friendly', 5);
      }
      
      // Wait for both API calls
      const [dayRecipes, exploreRecipesData] = await Promise.all([
        recipeOfDayPromise,
        exploreRecipesPromise
      ]);
      
      console.log('Recipe of day loaded:', dayRecipes.length > 0);
      console.log('Explore recipes loaded:', exploreRecipesData.length);
      
      if (dayRecipes.length > 0) {
        console.log('Setting recipe of day:', dayRecipes[0].title);
        setRecipeOfDay(dayRecipes[0]);
      } else {
        console.warn('No recipe of day loaded from API');
      }
      
      if (exploreRecipesData.length > 0) {
        console.log('Setting explore recipes:', exploreRecipesData.map(r => r.title));
        setExploreRecipes(exploreRecipesData);
      } else {
        console.warn('No explore recipes loaded from API');
        // If no explore recipes, try to get some random ones
        const fallbackRecipes = await recipeService.getRandomRecipes(undefined, 5);
        console.log('Fallback recipes loaded:', fallbackRecipes.length);
        setExploreRecipes(fallbackRecipes);
      }
      
    } catch (error) {
      console.error('Error loading recipes:', error);
      
      // Try one more time with simpler parameters
      try {
        console.log('Retrying with simpler API call...');
        const fallbackRecipes = await recipeService.getRandomRecipes(undefined, 6);
        
        if (fallbackRecipes.length > 0) {
          console.log('Fallback successful, loaded:', fallbackRecipes.length, 'recipes');
          setRecipeOfDay(fallbackRecipes[0]);
          setExploreRecipes(fallbackRecipes.slice(1));
        } else {
          console.error('Even fallback failed to load recipes');
          Alert.alert('Error', 'Failed to load recipes. Please check your internet connection and try again.');
        }
      } catch (retryError) {
        console.error('Retry also failed:', retryError);
        Alert.alert('Error', 'Failed to load recipes. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      const searchResults = await recipeService.searchRecipes({
        query: searchQuery,
        sort: 'popularity'
      });
      
      if (searchResults.recipes.length > 0) {
        setExploreRecipes(searchResults.recipes.slice(0, 5));
      }
    } catch (error) {
      console.error('Error searching recipes:', error);
      Alert.alert('Error', 'Failed to search recipes. Please try again.');
    }
  };

  const handleRecipePress = (recipe: Recipe) => {
    // TODO: Navigate to recipe detail screen
    console.log('Recipe pressed:', recipe.title);
  };

  const refreshRecipes = async () => {
    try {
      console.log('Refreshing recipes from API...');
      console.log('User preferences for refresh:', !!userPreferences);
      
      // Get recipe of the day - single random recipe
      const recipeOfDayPromise = recipeService.getRandomRecipes('main course,easy', 1);
      
      // Get explore recipes based on user preferences
      let exploreRecipesPromise;
      if (userPreferences && (
        userPreferences.cuisines?.length > 0 || 
        userPreferences.diets?.length > 0 || 
        userPreferences.allergies?.length > 0
      )) {
        console.log('[Refresh] Loading personalized recipes based on preferences');
        exploreRecipesPromise = recipeService.getPersonalizedRecipes(userPreferences, 5);
      } else {
        console.log('[Refresh] No user preferences found, using default random recipes');
        exploreRecipesPromise = recipeService.getRandomRecipes('quick,healthy,student-friendly', 5);
      }
      
      // Wait for both API calls
      const [dayRecipes, exploreRecipesData] = await Promise.all([
        recipeOfDayPromise,
        exploreRecipesPromise
      ]);
      
      console.log('Refresh - Recipe of day loaded:', dayRecipes.length > 0);
      console.log('Refresh - Explore recipes loaded:', exploreRecipesData.length);
      
      if (dayRecipes.length > 0) {
        setRecipeOfDay(dayRecipes[0]);
      }
      
      if (exploreRecipesData.length > 0) {
        setExploreRecipes(exploreRecipesData);
      } else {
        // If no explore recipes, try to get some random ones
        const fallbackRecipes = await recipeService.getRandomRecipes(undefined, 5);
        setExploreRecipes(fallbackRecipes);
      }
      
    } catch (error) {
      console.error('Error refreshing recipes:', error);
      Alert.alert('Error', 'Failed to refresh recipes. Please try again.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      console.log('[HomeScreen] Pull-to-refresh triggered');
      await refreshRecipes();
      console.log('[HomeScreen] Refresh completed');
    } catch (error) {
      console.error('[HomeScreen] Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#C84B31" />
        <Text style={{ marginTop: 10, color: '#666' }}>Loading delicious recipes...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#C84B31']} // Android
          tintColor="#C84B31" // iOS
        />
      }
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Simple recipes{'\n'}for students</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Explore recipes..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Recipe of the Day */}
      {recipeOfDay ? (
        <View style={styles.recipeOfDay}>
          <Text style={styles.sectionTitle}>RECIPE OF THE DAY</Text>
          <TouchableOpacity 
            style={styles.recipeCard}
            onPress={() => handleRecipePress(recipeOfDay)}
          >
            <Image
              source={{ uri: recipeOfDay.image }}
              style={styles.recipeImage}
              onError={() => console.log('Failed to load recipe image:', recipeOfDay.image)}
            />
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>{recipeOfDay.title}</Text>
              <View style={styles.recipeMetrics}>
                <View style={styles.metric}>
                  <Ionicons name="people-outline" size={18} color="#FFF" />
                  <Text style={styles.metricText}>{recipeOfDay.servingSize}</Text>
                </View>
                <View style={styles.metric}>
                  <Ionicons name="time-outline" size={18} color="#FFF" />
                  <Text style={styles.metricText}>{recipeOfDay.minutes} min</Text>
                </View>
                <View style={styles.metric}>
                  <Ionicons name="star-outline" size={18} color="#FFF" />
                  <Text style={styles.metricText}>{recipeOfDay.difficulty}</Text>
                </View>
                {recipeOfDay.likes && (
                  <View style={styles.metric}>
                    <Ionicons name="heart-outline" size={18} color="#FFF" />
                    <Text style={styles.metricText}>{recipeOfDay.likes}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.recipeDescription}>{recipeOfDay.description}</Text>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View recipe</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.recipeOfDay}>
          <Text style={styles.sectionTitle}>RECIPE OF THE DAY</Text>
          <View style={styles.recipeCard}>
            <View style={[styles.recipeImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
              <Ionicons name="restaurant-outline" size={50} color="#ccc" />
            </View>
            <View style={styles.recipeInfo}>
              <Text style={styles.recipeTitle}>Loading Recipe...</Text>
              <TouchableOpacity style={styles.viewButton} onPress={loadRecipes}>
                <Text style={styles.viewButtonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Explore Recipes Section */}
      <View style={styles.exploreSection}>
        <Text style={styles.sectionTitle}>
          {(() => {
            const hasPrefs = userPreferences && (
              userPreferences.cuisines?.length > 0 || 
              userPreferences.diets?.length > 0 || 
              userPreferences.allergies?.length > 0
            );
            console.log('[UI] Section title check:', {
              userPreferences: !!userPreferences,
              hasPrefs,
              cuisines: userPreferences?.cuisines?.length || 0,
              diets: userPreferences?.diets?.length || 0,
              allergies: userPreferences?.allergies?.length || 0
            });
            return hasPrefs ? 'Personalized for You' : 'Explore Recipes';
          })()}
        </Text>
        <Text style={styles.sectionSubtitle}>
          {userPreferences && (
            userPreferences.cuisines?.length > 0 || 
            userPreferences.diets?.length > 0 || 
            userPreferences.allergies?.length > 0
          ) ? 'Based on your preferences' : userPreferences === undefined ? 'Simple Recipes for Students' : 'Complete your profile for personalized recipes'}
        </Text>
        
        {exploreRecipes.length > 0 ? (
          exploreRecipes.map(recipe => (
            <TouchableOpacity 
              key={recipe.id} 
              style={styles.exploreCard}
              onPress={() => handleRecipePress(recipe)}
            >
              <Image 
                source={{ uri: recipe.image }} 
                style={styles.exploreImage}
                onError={() => console.log('Failed to load explore recipe image:', recipe.image)}
              />
              <View style={styles.exploreInfo}>
                <Text style={styles.exploreTitle}>{recipe.title}</Text>
                <View style={styles.exploreMetrics}>
                  <Text style={styles.exploreMetric}>Serving size: {recipe.servingSize}</Text>
                  <Text style={styles.exploreMetric}>Minutes: {recipe.minutes}</Text>
                  {recipe.healthScore && (
                    <Text style={styles.exploreMetric}>Health Score: {recipe.healthScore}/100</Text>
                  )}
                </View>
                <View style={styles.difficultyTag}>
                  <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
                </View>
                {recipe.cuisines && recipe.cuisines.length > 0 && (
                  <View style={styles.cuisineTag}>
                    <Text style={styles.cuisineText}>{recipe.cuisines[0]}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.exploreCard}>
            <View style={[styles.exploreImage, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
              <Ionicons name="search-outline" size={30} color="#ccc" />
            </View>
            <View style={styles.exploreInfo}>
              <Text style={styles.exploreTitle}>No recipes loaded</Text>
              <TouchableOpacity style={styles.seeAllButton} onPress={loadRecipes}>
                <Text style={styles.seeAllText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.seeAllButton}
          onPress={() => {
            // TODO: Navigate to recipes screen with search results
            console.log('See all recipes pressed');
          }}
        >
          <Text style={styles.seeAllText}>See all recipes</Text>
        </TouchableOpacity>
      </View>

      {/* Newsletter Section */}
      <View style={styles.newsletterSection}>
        <Text style={styles.newsletterTitle}>Discover new{'\n'}recipes weekly!</Text>
        <Text style={styles.newsletterSubtitle}>
          Subscribe to our newsletter to receive weekly recipes and recommendations
        </Text>
        <View style={styles.newsletterInput}>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#666"
            style={styles.emailInput}
          />
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>JOIN</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Questions or suggestions?</Text>
        <Text style={styles.contactSubtitle}>
          We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.
        </Text>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen; 