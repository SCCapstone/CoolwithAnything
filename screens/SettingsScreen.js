import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, Alert, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { updateUserProfile } from '../services/AuthAPI';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { useTheme } from '../services/ThemeContext';
import getStyles from '../styles/settingsStyles';

function SelectProfile() {
  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();
  const userId = auth.currentUser ? auth.currentUser.uid : null;
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [isModalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [editedFirstName, setEditedFirstName] = useState(''); 
  const [editedLastName, setEditedLastName] = useState('');
  const [editedMobile, setEditedMobile] = useState('');
  const [editedFitnessGoal, setEditedFitnessGoal] = useState(''); 
  const [editedFitnessLevel, setEditedFitnessLevel] = useState('');
  const [editedHeight, setEditedHeight] = useState('');
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
    <View style={styles.screen}>
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
          <Text style={styles.labelText}>{mobile}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Fitness Goal:</Text>
          </View>
          <Text style={styles.labelText}>{fitnessGoal}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Fitness Level:</Text>
          </View>
          <Text style={styles.labelText}>{fitnessLevel}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Height (in):</Text>
          </View>
          <Text style={styles.labelText}>{height}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Weight (lbs):</Text>
          </View>
          <Text style={styles.labelText}>{weight}</Text>
        </View>

        <Pressable style={styles.editButton} onPress={openModal}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile Information</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
              <TextInput
                style={{ ...styles.modalInput, flex: 1, marginRight: 10 }}
                placeholder={firstName ? firstName : 'John'}
                placeholderTextColor={'#cdcbca'}
                onChangeText={(text) => setEditedFirstName(text)}
              />
              <TextInput
                style={{ ...styles.modalInput, flex: 1 }}
                placeholder={lastName ? lastName : 'Doe'}
                placeholderTextColor={'#cdcbca'}
                onChangeText={(text) => setEditedLastName(text)}
              />
            </View>
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
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [firstName, setFirstName] = useState('');
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

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User signed out!');
      navigation.replace('Login');
    }).catch((error) => {
      // An error happened.
      console.error("Logout Error", error);
    });
  };

  return (
    <View style={styles.screen}>
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
                { text: "Yes", onPress: () => handleLogout() }
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
  const { theme, toggleTheme } = useTheme();
  const styles = getStyles(theme);

  const [firstName, setFirstName] = useState('');
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
    <View style={styles.screen}>
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
          <Pressable style={styles.pageButton} onPress={toggleTheme}>
            <Text style={styles.accountText}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Text>
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
      </ScrollView>
    </View>
  );
}

const TabBar = ({ activeTab, setActiveTab, styles }) => (
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
  const { theme, toggleTheme, loading } = useTheme();
  const styles = getStyles(theme);

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'Profile':
        return <SelectProfile theme={theme}/>;
      case 'Account':
        return <SelectAccount theme={theme}/>;
      case 'Others':
        return <SelectOthers theme={theme} toggleTheme={toggleTheme}/>;
      default:
        return <SelectProfile theme={theme}/>;
    }
  };

  return (
    <View style={{ flex: 1 }}> 
      <View style={{ flex: 1 }}> 
        {renderTab(activeTab)}
      </View>
      <View style={styles.tabBarContainer}>
        <TabBar activeTab={activeTab} setActiveTab={setActiveTab} styles={styles}/>
      </View>
    </View>
  );
};


export default SettingsScreen;