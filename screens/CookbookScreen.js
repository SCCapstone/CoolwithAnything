import React, { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseMeals from "../components/BrowseMeals";
import SavedMeals from "../components/SavedMeals";

const Tab = createMaterialTopTabNavigator();

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