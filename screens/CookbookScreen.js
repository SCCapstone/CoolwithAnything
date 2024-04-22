import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BrowseMeals from "../components/BrowseMeals";
import SavedMeals from "../components/SavedMeals";
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/CookbookStyle";

// Notice how we're not passing savedWorkouts and setSavedWorkouts as props anymore
const CookbookScreen = ({ route }) => {
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || "BrowseMeals");
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
      case "BrowseMeals":
        return <BrowseMeals userID={userID} />;
      case "SavedMeals":
        return <SavedMeals userID={userID} />; // No props passed here
      default:
        return <BrowseMeals />; // Default view
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.cookbookTextContainer}>
        <Text style={styles.cookbookText}>Cookbook</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "BrowseMeals" && styles.activeTab,
            ]}
            testID='browse-cookbook-test'
            onPress={() => setActiveTab("BrowseMeals")}
          >
            <Text style={styles.tabText}>Browse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabItem,
              activeTab === "SavedMeals" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("SavedMeals")}
          >
            <Text style={styles.tabText}>Saved</Text>
          </TouchableOpacity>
        </View>
        {renderTabContent()}
      </View>
    </View>
  );
};

export default CookbookScreen;
