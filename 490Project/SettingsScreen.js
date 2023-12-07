import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './settingsStyles';

function SelectProfile() {
  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <Text style={styles.title}>Profile</Text>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: 100, alignItems: 'flex-start' }}>
          <Text style={styles.label}>Address:</Text>
        </View>
        <Text style={styles.text}>
          123 Main Street
          {'\n'}
          Columbia, South Carolina
          {'\n'}
          29201
        </Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ width: 100, alignItems: 'flex-start' }}>
          <Text style={styles.label}>Mobile:</Text>
        </View>
        <Text style={styles.text}>(123) 456-7890</Text>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ width: 100, alignItems: 'flex-start' }}>
          <Text style={styles.label}>Email:</Text>
        </View>
        <Text style={styles.text}>nolammoore@email.com</Text>
      </View>
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