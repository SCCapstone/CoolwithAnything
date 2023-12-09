import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import styles from './style.js'
import { SIZES } from './theme.js';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useRouter } from "expo-router";

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const mealTypes = ["Meat", "Seafood", "Sides", "Vegitarian"];

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

const CookbookScreen = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [currentMealType, setCurrentMealType] = useState('Meal')

  return (
    <View>

    <View style={styles.tabsContainer}>
          <Tab.Navigator>
            <Tab.Screen name="Browse Meals" component={BrowseMeals} options={{ tabBarLabel: 'Browse' }}/>
            <Tab.Screen name="Saved Meals" component={SavedMeals} options={{ tabBarLabel: 'Saved' }}/>
          </Tab.Navigator>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <MaterialCommunityIcons name="magnify" />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <FlatList
          data={mealTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(currentMealType, item)}
              onPress={() => {
                setCurrentMealType(item);
                router.push('/search/${item}')
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item}        
          contentContainerStyle={{ rowGap: SIZES.small}}
        />
      </View>

      
    </View>
  );
};

export default CookbookScreen;