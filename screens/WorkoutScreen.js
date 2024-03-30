import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import BrowseWorkouts from "../components/BrowseWorkouts";
import SavedWorkouts from "../components/SavedWorkouts";
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/WorkoutStyles";

// Notice how we're not passing savedWorkouts and setSavedWorkouts as props anymore
const WorkoutScreen = ({ route }) => {
  const [activeTab, setActiveTab] = useState("BrowseWorkouts");
  const { userID } = route.params;
  const { theme } = useTheme();
  const styles = getStyles(theme);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "BrowseWorkouts":
        return <BrowseWorkouts userID={userID} />;
      case "SavedWorkouts":
        return <SavedWorkouts userID={userID} />; // No props passed here
      default:
        return <BrowseWorkouts />; // Default view
    }
  };

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "BrowseWorkouts" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("BrowseWorkouts")}
        >
          <Text style={styles.tabText}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "SavedWorkouts" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("SavedWorkouts")}
        >
          <Text style={styles.tabText}>Saved</Text>
        </TouchableOpacity>
      </View>
      {renderTabContent()}
    </View>
  );
};

export default WorkoutScreen;