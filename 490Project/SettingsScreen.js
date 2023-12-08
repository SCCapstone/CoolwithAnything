import React from 'react';
import { View, Text, Button, Alert, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import styles from './settingsStyles';

function SelectProfile() {
  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.profileID}>User ID: U124350622456</Text>
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
      <Pressable style={styles.editButton} onPress={() => Alert.alert('Edit Button')}>
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>
    </View>
  );
}

function SelectAccount() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <Text style={styles.profileID}>User ID: U124350622456</Text>
      <View style={styles.rowContainer}>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('Transaction History Button')} >
          <Text style={styles.accountText}>Transaction History</Text>
        </Pressable>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('Payment Methods Button')}>
          <Text style={styles.accountText}>Payment Methods</Text>
        </Pressable>
      </View>
      <View style={styles.rowContainer}>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('Policy & ToS Button')}>
          <Text style={styles.accountText}>Privacy Policy & Terms of Service</Text>
        </Pressable>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('QR Code Button')}>
          <Text style={styles.accountText}>QR Code</Text>
        </Pressable>
      </View>
      <Pressable style={styles.editButton} onPress={() => Alert.alert('Sign Out Button')}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

function SelectOthers() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Settings</Text>
      <Text style={styles.profileID}>User ID: U124350622456</Text>
      <View style={styles.rowContainer}>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('Color Scheme Button')} >
          <Text style={styles.accountText}>Color Scheme</Text>
        </Pressable>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('Languages Button')}>
          <Text style={styles.accountText}>Languages</Text>
        </Pressable>
      </View>
      <View style={styles.rowContainer}>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('Support Button')}>
          <Text style={styles.accountText}>Support</Text>
        </Pressable>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('Version Button')}>
          <Text style={styles.accountText}>Version</Text>
        </Pressable>
      </View>
      <Pressable style={styles.editButton} onPress={() => Alert.alert('Dark Mode Button')}>
        <Text style={styles.buttonText}>Dark Mode</Text>
      </Pressable>
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