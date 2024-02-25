import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BrowseMeals from '../components/BrowseMeals';
import SavedMeals from '../components/SavedMeals';
import { useMeals } from '../services/MealsContext'; // Make sure to import useMeals from MealsContext

const CookbookScreen = () => {
  const [activeTab, setActiveTab] = useState('BrowseMeals');

  // You no longer need to extract savedMeals and setSavedMeals from useWorkouts
  // as we're now assuming you'll be using useMeals if you're managing meal data

  const renderTabContent = () => {
    switch (activeTab) {
      case 'BrowseMeals':
        return <BrowseMeals />;
      case 'SavedMeals':
        return <SavedMeals />; // No need to pass meals and setSavedMeals as props
      default:
        return <BrowseMeals />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
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

const styles = StyleSheet.create({
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
