import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/main/HomeScreen.styles';

const PLACEHOLDER_RECIPES = [
  {
    id: '1',
    title: 'Hawaiian Chicken Pizza',
    servingSize: 6,
    minutes: 55,
    difficulty: 'Advanced',
    description: 'A sweet and savory pizza topped with chicken, pineapple, melted mozzarella, onions, and cilantro all on a crispy golden crust!',
    image: require('../../assets/auth/create-acc-page/create-acc.jpg'),
  },
  {
    id: '2',
    title: 'Peanut Butter Banana Pancake Wrap',
    servingSize: 6,
    minutes: 45,
    difficulty: 'Easy',
    image: require('../../assets/auth/create-acc-page/create-acc.jpg'),
  },
  // Add more placeholder recipes as needed
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Simple recipes{'\n'}for students</Text>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Explore recipes..."
            placeholderTextColor="#666"
          />
        </View>
      </View>

      {/* Recipe of the Day */}
      <View style={styles.recipeOfDay}>
        <Text style={styles.sectionTitle}>RECIPE OF THE DAY</Text>
        <TouchableOpacity style={styles.recipeCard}>
          <Image
            source={PLACEHOLDER_RECIPES[0].image}
            style={styles.recipeImage}
          />
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle}>{PLACEHOLDER_RECIPES[0].title}</Text>
            <View style={styles.recipeMetrics}>
              <View style={styles.metric}>
                <Ionicons name="people-outline" size={18} color="#666" />
                <Text style={styles.metricText}>{PLACEHOLDER_RECIPES[0].servingSize}</Text>
              </View>
              <View style={styles.metric}>
                <Ionicons name="time-outline" size={18} color="#666" />
                <Text style={styles.metricText}>{PLACEHOLDER_RECIPES[0].minutes} min</Text>
              </View>
              <View style={styles.metric}>
                <Ionicons name="star-outline" size={18} color="#666" />
                <Text style={styles.metricText}>{PLACEHOLDER_RECIPES[0].difficulty}</Text>
              </View>
            </View>
            <Text style={styles.recipeDescription}>{PLACEHOLDER_RECIPES[0].description}</Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View recipe</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>

      {/* Explore Recipes Section */}
      <View style={styles.exploreSection}>
        <Text style={styles.sectionTitle}>Explore Recipes</Text>
        <Text style={styles.sectionSubtitle}>Simple Recipes for Students</Text>
        {PLACEHOLDER_RECIPES.slice(1).map(recipe => (
          <TouchableOpacity key={recipe.id} style={styles.exploreCard}>
            <Image source={recipe.image} style={styles.exploreImage} />
            <View style={styles.exploreInfo}>
              <Text style={styles.exploreTitle}>{recipe.title}</Text>
              <View style={styles.exploreMetrics}>
                <Text style={styles.exploreMetric}>Serving size: {recipe.servingSize}</Text>
                <Text style={styles.exploreMetric}>Minutes: {recipe.minutes}</Text>
              </View>
              <View style={styles.difficultyTag}>
                <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.seeAllButton}>
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
        <Text style={styles.contactTitle}>Contact Us</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-facebook" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-twitter" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Ionicons name="logo-instagram" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.footerLinks}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Help Center</Text>
          </TouchableOpacity>
          <Text style={styles.footerDivider}>|</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
          <Text style={styles.footerDivider}>|</Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen; 