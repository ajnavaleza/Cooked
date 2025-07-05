import React from 'react';
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
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../styles/main/HomeScreen.styles';

interface RecipeCardProps {
  title: string;
  image: ImageSourcePropType;
  servingSize: string;
  minutes: string;
  difficulty?: string;
  onPress: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ title, image, servingSize, minutes, difficulty = '', onPress }) => (
  <TouchableOpacity style={styles.recipeCard} onPress={onPress}>
    <Image source={image} style={styles.recipeImage} />
    <View style={styles.recipeInfo}>
      <Text style={styles.recipeTitle}>{title}</Text>
      <View style={styles.recipeMetrics}>
        <View style={styles.metricItem}>
          <MaterialIcons name="people" size={16} color="#666" />
          <Text style={styles.metricText}>{servingSize}</Text>
        </View>
        <View style={styles.metricItem}>
          <MaterialIcons name="schedule" size={16} color="#666" />
          <Text style={styles.metricText}>{minutes}</Text>
        </View>
        {difficulty && (
          <View style={[styles.difficultyBadge, { backgroundColor: difficulty === 'Easy' ? '#4CAF50' : '#FF9800' }]}>
            <Text style={styles.difficultyText}>{difficulty}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality to filter recipes based on searchQuery
    
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
                placeholder="Explore recipes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <Ionicons name="search" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.scrollIndicator}>
              <MaterialIcons name="keyboard-arrow-down" size={32} color="#fff" />
            </View>
          </View>
        </ImageBackground>

        {/* Recipe of the Day */}
        <View style={styles.section}>
          <View style={styles.recipeOfTheDay}>
            <Image
              source={{ uri: 'https://placehold.co/400x300/orange/white.png' }}
              style={styles.recipeOfTheDayImage}
            />
            <View style={styles.recipeOfTheDayContent}>
              <Text style={styles.recipeOfTheDayLabel}>RECIPE OF THE DAY</Text>
              <Text style={styles.recipeOfTheDayTitle}>Hawaiian Chicken Pizza</Text>
              <View style={styles.recipeMetrics}>
                <View style={styles.metricItem}>
                  <MaterialIcons name="people" size={16} color="#666" />
                  <Text style={styles.metricText}>6</Text>
                </View>
                <View style={styles.metricItem}>
                  <MaterialIcons name="schedule" size={16} color="#666" />
                  <Text style={styles.metricText}>55</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: '#FF9800' }]}>
                  <Text style={styles.difficultyText}>Advanced</Text>
                </View>
              </View>
              <Text style={styles.recipeOfTheDayDescription}>
                A sweet and savory pizza topped with chicken, pineapple, melted mozzarella, onions, and cilantro all on a crispy golden crust!
              </Text>
              <TouchableOpacity style={styles.viewRecipeButton}>
                {/* TODO: Implement navigation to recipe details screen */}
                <Text style={styles.viewRecipeButtonText}>View recipe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Explore Recipes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore Recipes</Text>
          <Text style={styles.sectionSubtitle}>Simple Recipes for Students</Text>
          <RecipeCard
            title="Peanut Butter Banana Pancake Wrap"
            image={{ uri: 'https://placehold.co/400x300/white/gray.png' }}
            servingSize="6"
            minutes="45"
            difficulty="Easy"
            // TODO: Implement navigation to recipe details screen with recipe ID
            onPress={() => {}}
          />
          {/* TODO: Implement recipe card list with data from backend API */}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen; 