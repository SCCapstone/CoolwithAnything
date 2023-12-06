import React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function SelectProfile() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile</Text>
    </View>
  );
}

function SelectAccount() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Account</Text>
    </View>
  );
}

function SelectOthers() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Others</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const SettingsScreen = ({ route }) => {
  return (
        <Tab.Navigator>
        <Tab.Screen name="Select Profile" component={SelectProfile} options={{ tabBarLabel: 'Profile' }}/>
        <Tab.Screen name="Select Account" component={SelectAccount} options={{ tabBarLabel: 'Account' }}/>
        <Tab.Screen name="Select Others" component={SelectOthers} options={{ tabBarLabel: 'Others'}}/>
      </Tab.Navigator>
  );
  }


export default SettingsScreen;