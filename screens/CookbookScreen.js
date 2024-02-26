import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BrowseMeals from '../components/BrowseMeals';
import SavedMeals from '../components/SavedMeals';

// Notice how we're not passing savedWorkouts and setSavedWorkouts as props anymore
const CookbookScreen = () => {
  const [activeTab, setActiveTab] = useState('BrowseMeals');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'BrowseWorkouts':
        return <BrowseMeals />;
      case 'SavedMeals':
        return <SavedMeals />; // No props passed here
      default:
        return <BrowseMeals />; // Default view
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'BrowseMeals' && styles.activeTab]}
          onPress={() => setActiveTab('BrowseMeals')}
        >
          <Text style={styles.tabText}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'SavedMeals' && styles.activeTab]}
          onPress={() => setActiveTab('SavedMeals')}
        >
          <Text style={styles.tabText}>Saved</Text>
        </TouchableOpacity>
      </View>
      {renderTabContent()}
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'navy',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
});

export default CookbookScreen;