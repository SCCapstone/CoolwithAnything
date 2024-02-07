import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Alert, Pressable, Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/core';
import styles from '../styles/settingsStyles';

function SelectProfile() {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [address, setAddress] = useState('123 Main Street\nColumbia, South Carolina\n29201');
  const [mobile, setMobile] = useState('(123) 456-7890');
  const [email, setEmail] = useState('nolammoore@email.com');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedMobile, setEditedMobile] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSaveChanges = () => {
    setAddress(editedAddress || address);
    setMobile(editedMobile || mobile);
    setEmail(editedEmail || email);
    closeModal();
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Back</Text>
      </Pressable>
      
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.profileID}>User ID: U124350622456</Text>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ width: 100, alignItems: 'flex-start' }}>
          <Text style={styles.label}>Address:</Text>
        </View>
        <Text style={styles.text}>{address}</Text>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ width: 100, alignItems: 'flex-start' }}>
          <Text style={styles.label}>Mobile:</Text>
        </View>
        <Text style={styles.text}>{mobile}</Text>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <View style={{ width: 100, alignItems: 'flex-start' }}>
          <Text style={styles.label}>Email:</Text>
        </View>
        <Text style={styles.text}>{email}</Text>
      </View>

      <Pressable style={styles.editButton} onPress={openModal}>
        <Text style={styles.buttonText}>Edit</Text>
      </Pressable>

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Profile Information</Text>
          <TextInput
            style={styles.modalInput}
            placeholder={address}
            placeholderTextColor={'black'}
            onChangeText={(text) => setEditedAddress(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder={mobile}
            placeholderTextColor={'black'}
            onChangeText={(text) => setEditedMobile(text)}
          />
          <TextInput
            style={styles.modalInput}
            placeholder={email}
            placeholderTextColor={'black'}
            onChangeText={(text) => setEditedEmail(text)}
          />
          <View style={styles.modalButtonContainer}>
          <Pressable style={styles.modalSaveButton} onPress={handleSaveChanges} >
            <Text style={styles.modalText}>Save</Text>
          </Pressable>
          <Pressable style={styles.modalCancelButton} onPress={handleSaveChanges} >
            <Text style={styles.modalText}>Cancel</Text>
          </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function SelectAccount() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Back</Text>
      </Pressable>

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
  const navigation = useNavigation();
  return (
    <View style={styles.container}>

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Back</Text>
      </Pressable>
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
      <Tab.Screen name="Select Profile">
        {() => (
          <SelectProfile
            section={route.params?.section}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Select Account">
        {() => (
            <SelectAccount
            section={route.params?.section}
           />
        )}
      </Tab.Screen>
      <Tab.Screen name="Select Others">
      {() => (
            <SelectOthers
            section={route.params?.section}
           />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
  }


export default SettingsScreen;