import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, Alert, Pressable} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/core';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import styles from '../styles/settingsStyles';

function SelectProfile() {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

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
        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 700 }}>Back</Text>
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
        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 700 }}>Back</Text>
      </Pressable>

      <Text style={styles.title}>Account</Text>
      <Text style={styles.profileID}>User ID: U124350622456</Text>
      <View style={styles.rowContainer}>
        <Pressable style={styles.pageButton} onPress={() => navigation.navigate('TransactionHistory')} >
          <Text style={styles.accountText}>Transaction History</Text>
        </Pressable>
        <Pressable style={styles.pageButton} onPress={() => navigation.navigate('PaymentMethods')}>
          <Text style={styles.accountText}>Payment Methods</Text>
        </Pressable>
      </View>
      <View style={styles.rowContainer}>
        <Pressable style={styles.pageButton} onPress={() => navigation.navigate('ToS')}>
          <Text style={styles.accountText}>Terms of Service</Text>
        </Pressable>
        <Pressable style={styles.pageButton} onPress={() => navigation.navigate('QR')}>
          <Text style={styles.accountText}>QR Code</Text>
        </Pressable>
      </View>
      <Pressable style={styles.editButton} onPress={() => navigation.navigate('Login')}>
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
        <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 700 }}>Back</Text>
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
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('For support, contact us at schedulerx@schedx.com')}>
          <Text style={styles.accountText}>Support</Text>
        </Pressable>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('App Version: v0.5')}>
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
    <Tab.Navigator style= {{marginTop: 45}}>
      <Tab.Screen name="Profile">
        {() => (
          <SelectProfile
            section={route.params?.section}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Account">
        {() => (
            <SelectAccount
            section={route.params?.section}
           />
        )}
      </Tab.Screen>
      <Tab.Screen name="Other">
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