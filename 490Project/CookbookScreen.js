import React from 'react';
import { View, Text } from 'react-native';
import styles from './browseStyle.js';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function BrowseMeals() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Meal 1</Text>
    </View>
  );
}

function SavedMeals() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Meal aksldjf!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const CookbookScreen = ({ route }) => {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Browse Meals" component={BrowseMeals} options={{ tabBarLabel: 'Browse' }}/>
        <Tab.Screen name="Saved Meals" component={SavedMeals} options={{ tabBarLabel: 'Saved' }}/>
      </Tab.Navigator>
  );
  }

export default CookbookScreen;
