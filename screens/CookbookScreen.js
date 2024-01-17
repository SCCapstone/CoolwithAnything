import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BrowseMeals from '../components/BrowseMeals';
import SavedMeals from '../components/SavedMeals';

const Tab = createMaterialTopTabNavigator();

const CookbookScreen = ({ savedMeals, setSavedMeals }) => {
  useEffect(() => {
    // Code to run when savedMeals change, if necessary
  }, [savedMeals]);

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
        options={{ tabBarLabel: "Saved" }}
      >
        {() => <SavedMeals meals={savedMeals} setSavedMeals={setSavedMeals} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default CookbookScreen;
