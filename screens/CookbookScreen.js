import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import BrowseMeals from "../components/BrowseMeals";
import SavedMeals from "../components/SavedMeals";

const CookbookScreen = ({ savedMeals, setSavedMeals }) => {
  const [activeTab, setActiveTab] = useState("BrowseMeals");

  useEffect(() => {
    // TODO: Save meals
    // Code to run when savedMeals change, if necessary
  }, [savedMeals]);

  const renderTabContent = () => {
    if (activeTab === "BrowseMeals") {
      return <BrowseMeals />;
    } else if (activeTab === "SavedMeals") {
      return <SavedMeals meals={savedMeals} setSavedMeals={setSavedMeals} />;
    }
    // Add more conditions for additional tabs if needed
  };

  return (
    <View>
      {/* Tab Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 10,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity onPress={() => setActiveTab("BrowseMeals")}>
          <Text
            style={{
              color: activeTab === "BrowseMeals" ? "#FF7754" : "black",
              fontSize: 16,
            }}
          >
            Browse Meals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("SavedMeals")}>
          <Text
            style={{
              color: activeTab === "SavedMeals" ? "#FF7754" : "black",
              fontSize: 16,
            }}
          >
            Saved Meals
          </Text>
        </TouchableOpacity>
        {/* Add more TouchableOpacity elements for additional tabs if needed */}
      </View>

      {/* Render the content based on the active tab */}
      {renderTabContent()}
    </View>
  );
};

export default CookbookScreen;
