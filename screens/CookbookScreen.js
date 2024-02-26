import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseMeals from "../components/BrowseMeals";
import SavedMeals from "../components/SavedMeals";

const Tab = createMaterialTopTabNavigator();

const CookbookScreen = () => {
  const { savedMeals, setSavedMeals } = useMeals();
  const [activeTab, setActiveTab] = useState('BrowseMeals');

  useEffect(() => {
    // TODO: Save meals
    // Code to run when savedMeals change, if necessary
  }, [savedMeals]);

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
    <Tab.Navigator>
      {/* Tab Screen for browsing meals */}
      <Tab.Screen
        name="Browse Meals"
        component={BrowseMeals}
        options={{ tabBarLabel: "Browse" }}
      />
      {/* Tab Screen for displaying saved meals */}
      <Tab.Screen
        name="Saved Meals"
        children={() => (
          <SavedMeals meals={savedMeals} setSavedMeals={setSavedMeals} />
        )}
        options={{ tabBarLabel: "Saved" }}
      />
    </Tab.Navigator>
  );
};

export default CookbookScreen;
