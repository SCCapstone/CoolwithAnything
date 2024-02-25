import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BrowseWorkouts from '../components/BrowseWorkouts';
import SavedWorkouts from '../components/SavedWorkouts';

const WorkoutScreen = ({ savedWorkouts, setSavedWorkouts }) => {
  const [activeTab, setActiveTab] = useState('BrowseWorkouts');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'BrowseWorkouts':
        return <BrowseWorkouts />;
      case 'SavedWorkouts':
        return <SavedWorkouts workouts={savedWorkouts} setSavedWorkouts={setSavedWorkouts} />;
      default:
        return <BrowseWorkouts />; // Default view
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'BrowseWorkouts' && styles.activeTab]}
          onPress={() => setActiveTab('BrowseWorkouts')}
        >
          <Text style={styles.tabText}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'SavedWorkouts' && styles.activeTab]}
          onPress={() => setActiveTab('SavedWorkouts')}
        >
          <Text style={styles.tabText}>Saved</Text>
        </TouchableOpacity>
      </View>
      {renderTabContent()}
    </View>
  );
};

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

export default WorkoutScreen;
