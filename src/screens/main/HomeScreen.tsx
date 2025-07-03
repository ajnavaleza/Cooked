import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#C84B31',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  section: {
    margin: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  placeholder: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen; 