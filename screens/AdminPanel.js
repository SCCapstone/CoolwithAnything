import React from 'react';
import { Button, View, Text, Alert } from 'react-native';
import { cleanUserData } from '../services/AuthAPI'; // Assuming this is where the function is located

const AdminPanel = () => {
  const handleCleanData = async () => {
    try {
      await cleanUserData();
      Alert.alert("Data Cleaned", "All user data has been successfully cleaned.");
    } catch (error) {
      console.error("Failed to clean data:", error);
      Alert.alert("Error", "Failed to clean user data.");
    }
  };

  return (
    <View style={{flex:1, padding:50}}>
      <Text>Admin Panel</Text>
      <Button title="Clean User Data" onPress={handleCleanData} />
    </View>
  );
};

export default AdminPanel;
