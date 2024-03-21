import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, Alert, Pressable, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { updateUserProfile } from '../services/AuthAPI';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import styles from '../styles/settingsStyles';
import ThemeToggle from '../components/ThemeToggle';

function SelectProfile() {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const [isModalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState(''); // Changed from address
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState(''); // Changed from address
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [height, setHeight] = useState(''); // Changed from address
  const [weight, setWeight] = useState('');
  const [editedFirstName, setEditedFirstName] = useState(''); // Changed from editedAddress
  const [editedLastName, setEditedLastName] = useState('');
  const [editedMobile, setEditedMobile] = useState('');
  const [editedFitnessGoal, setEditedFitnessGoal] = useState(''); // Changed from editedAddress
  const [editedFitnessLevel, setEditedFitnessLevel] = useState('');
  const [editedHeight, setEditedHeight] = useState(''); // Changed from editedAddress
  const [editedWeight, setEditedWeight] = useState('');

  useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    getDoc(userRef).then(docSnap => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setMobile(userData.phone_number || '');
        setFitnessGoal(userData.fitnessGoal || '');
        setFitnessLevel(userData.fitnessLevel || '');
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setHeight(userData.height || '');
        setWeight(userData.weight || '');
      } else {
        console.log("No user data found in Firestore");
      }
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  }, [userId]);

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        firstName: editedFirstName || firstName,
        lastName: editedLastName || lastName,
        phone_number: editedMobile || mobile,
        fitnessGoal: editedFitnessGoal || fitnessGoal,
        fitnessLevel: editedFitnessLevel || fitnessLevel,
        height: editedHeight || height,
        weight: editedWeight || weight,
      };

      await updateUserProfile(userId, updatedData);
      console.log("Profile updated successfully");

      setFirstName(updatedData.firstName);
      setLastName(updatedData.lastName);
      setMobile(updatedData.phone_number);
      setFitnessGoal(updatedData.fitnessGoal);
      setFitnessLevel(updatedData.fitnessLevel);
      setHeight(updatedData.height);
      setWeight(updatedData.weight);

      closeModal();
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={{flex: 1}}>
      <View style={styles.settingsTextContainer}>
      <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.settingsText}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.container}>              
        <Text style={styles.title}>{firstName ? firstName : ""} {lastName ? lastName : ""}</Text>
        <Text style={styles.profileID}>User ID: {userId}</Text>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Phone:</Text>
          </View>
          <Text style={styles.text}>{mobile}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Fitness Goal:</Text>
          </View>
          <Text style={styles.text}>{fitnessGoal}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Fitness Level:</Text>
          </View>
          <Text style={styles.text}>{fitnessLevel}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Height (in):</Text>
          </View>
          <Text style={styles.text}>{height}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Weight (lbs):</Text>
          </View>
          <Text style={styles.text}>{weight}</Text>
        </View>

        <Pressable style={styles.editButton} onPress={openModal}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile Information</Text>
            <TextInput
              style={styles.modalInput}
              placeholder={firstName ? firstName : 'John'}
              placeholderTextColor={'#cdcbca'}
              onChangeText={(text) => setEditedFirstName(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder={lastName ? lastName : 'Doe'}
              placeholderTextColor={'#cdcbca'}
              onChangeText={(text) => setEditedLastName(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder={mobile ? mobile : '(123) 456-7890'}
              placeholderTextColor={'#cdcbca'}
              onChangeText={(text) => setEditedMobile(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder={fitnessGoal ? fitnessGoal : 'Fitness Goal'}
              placeholderTextColor={'#cdcbca'}
              onChangeText={(text) => setEditedFitnessGoal(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder={fitnessLevel ? fitnessLevel : 'Fitness Level'}
              placeholderTextColor={'#cdcbca'}
              onChangeText={(text) => setEditedFitnessLevel(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder={height ? height : 'Height (in)'}
              placeholderTextColor={'#cdcbca'}
              onChangeText={(text) => setEditedHeight(text)}
            />
            <TextInput
              style={styles.modalInput}
              placeholder={weight ? weight : 'Weight (lbs)'}
              placeholderTextColor={'#cdcbca'}
              onChangeText={(text) => setEditedWeight(text)}
            />
            <View style={styles.modalButtonContainer}>
            <Pressable style={styles.modalSaveButton} onPress={handleSaveChanges} >
              <Text style={styles.modalText}>Save</Text>
            </Pressable>
            <Pressable style={styles.modalCancelButton} onPress={closeModal} >
              <Text style={styles.modalText}>Cancel</Text>
            </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

function SelectAccount() {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const [firstName, setFirstName] = useState(''); // Changed from address
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    getDoc(userRef).then(docSnap => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
      } else {
        console.log("No user data found in Firestore");
      }
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  }, [userId]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.settingsTextContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.settingsText}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.title}>{firstName ? firstName : ""} {lastName ? lastName : ""}</Text>
        <Text style={styles.profileID}>User ID: {userId}</Text>
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
        <Pressable
          style={styles.editButton}
          onPress={() => {
            Alert.alert(
              "Sign Out", // Alert Title
              "Are you sure you would like to sign out?", // Alert Message
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "Yes", onPress: () => navigation.navigate('Login') }
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>

      </ScrollView>
    </View>
    );
}

function SelectOthers() {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const [firstName, setFirstName] = useState(''); // Changed from address
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (!userId) return;
    const userRef = doc(db, "users", userId);
    getDoc(userRef).then(docSnap => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
      } else {
        console.log("No user data found in Firestore");
      }
    }).catch(error => {
      console.error("Error fetching user data:", error);
    });
  }, [userId]);

  return (
    <View style={{flex: 1}}>
      <View style={styles.settingsTextContainer}>
      <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </Pressable>
        <Text style={styles.settingsText}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.title}>{firstName ? firstName : ""} {lastName ? lastName : ""}</Text>
        <Text style={styles.profileID}>User ID: {userId}</Text>
        <View style={styles.rowContainer}>
        <Pressable style={styles.pageButton} onPress={() => Alert.alert('Changing color theme is not supported right now.')}>
            <Text style={styles.accountText}>Color Theme</Text>
          </Pressable>
          <Pressable style={styles.pageButton} onPress={() => Alert.alert('This app is only available in English right now.')}>
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
      </ScrollView>
    </View>
  );
}

const TabBar = ({ activeTab, setActiveTab }) => (
  <View style={styles.tabContainer}>
    {['Profile', 'Account', 'Others'].map((tab) => (
      <Pressable
        key={tab}
        onPress={() => setActiveTab(tab)}
        style={[
          styles.tab,
          activeTab === tab && styles.activeTab,
        ]}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === tab,
          ]}
        >
          {tab}
        </Text>
      </Pressable>
    ))}
  </View>
);


const SettingsScreen = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const renderTab = () => {
    switch (activeTab) {
      case 'Profile':
        return <SelectProfile />;
      case 'Account':
        return <SelectAccount />;
      case 'Others':
        return <SelectOthers />;
      default:
        return <SelectProfile />;
    }
  };

  return (
    <View style={{ flex: 1 }}> 
      <View style={{ flex: 1 }}> 
        {renderTab(activeTab)}
      </View>
      <View style={styles.tabBarContainer}>
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </View>
  );
};


export default SettingsScreen;