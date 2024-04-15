import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BrowseWorkouts from "../components/BrowseWorkouts";
import SavedWorkouts from "../components/SavedWorkouts";
import { useTheme } from "../services/ThemeContext";
import getStyles from "../styles/WorkoutStyles";

// Notice how we're not passing savedWorkouts and setSavedWorkouts as props anymore
const WorkoutScreen = ({ route }) => {
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || "BrowseWorkouts");
  const { userID } = route.params;
  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    if (route.params?.activeTab) {
      setActiveTab(route.params.activeTab);
    }
  }, [route.params]);

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
    <View style={styles.screen}>
      <View style={styles.workoutTextContainer}>
        <Text style={styles.workoutText}>Workouts</Text>
        <View style={{ width: 24 }} />
      </View>
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
    </View>
  );
};

export default WorkoutScreen;
