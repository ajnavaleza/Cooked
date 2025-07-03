import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/main/HomeScreen.styles';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search:', searchQuery);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Good day!</Text>
        <Text style={styles.headerSubtitle}>What would you like to cook today?</Text>
      </View>

      {/* Search Bar */}
        <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
          placeholder="Search recipes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
      </View>

      {/* Recipe of the Day Placeholder */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recipe of the Day</Text>
        <View style={styles.placeholder}>
          <Ionicons name="restaurant-outline" size={40} color="#ccc" />
          <Text style={styles.placeholderText}>Coming soon...</Text>
        </View>
      </View>

      {/* Explore Recipes Placeholder */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Recipes</Text>
        <View style={styles.placeholder}>
          <Ionicons name="grid-outline" size={40} color="#ccc" />
          <Text style={styles.placeholderText}>Loading recipes...</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen; 