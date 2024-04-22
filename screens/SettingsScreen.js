import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, Alert, Pressable, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
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
        setHeight(userData.height.toString() || '');
        setWeight(userData.weight.toString() || '');
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
        height: editedHeight ? parseInt(editedHeight, 10) : height,
        weight: editedWeight ? parseInt(editedWeight, 10) : weight,
      };

      await updateUserProfile(userId, updatedData);
      console.log("Profile updated successfully");

      setFirstName(updatedData.firstName);
      setLastName(updatedData.lastName);
      setMobile(updatedData.phone_number);
      setFitnessGoal(updatedData.fitnessGoal);
      setFitnessLevel(updatedData.fitnessLevel);
      setHeight(updatedData.height.toString());
      setWeight(updatedData.weight.toString());

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
            <Text style={styles.label}>Height (ft):</Text>
          </View>
          <Text style={styles.labelText}>{height}</Text>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: 125, alignItems: 'flex-start' }}>
            <Text style={styles.label}>Weight (lbs):</Text>
          </View>
          <Text style={styles.labelText}>{weight}</Text>
        </View>

        <TouchableOpacity style={styles.editButton} onPress={openModal} testID="edit-button">
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile Information</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
              <TextInput
                style={{ ...styles.modalInput, flex: 1, marginRight: 10 }}
                placeholder={firstName ? firstName : 'John'}
                placeholderTextColor={'#999897'}
                onChangeText={(text) => setEditedFirstName(text)}
                testID='first-name-input'
              />
              <TextInput
                style={{ ...styles.modalInput, flex: 1 }}
                placeholder={lastName ? lastName : 'Doe'}
                placeholderTextColor={'#999897'}
                onChangeText={(text) => setEditedLastName(text)}
                testID='last-name-input'
              />
            </View>
            <TextInput
              style={styles.modalInput}
              placeholder={mobile ? String(mobile) : '(123) 456-7890'}
              placeholderTextColor={'#999897'}
              onChangeText={(text) => setEditedMobile(text)}
              keyboardType={"number-pad"}
            />
            <Picker
              selectedValue={editedFitnessGoal}
              style={styles.modalInput}
              onValueChange={(itemValue, itemIndex) => setEditedFitnessGoal(itemValue)}
            >
              <Picker.Item label="Lose Weight" value="Lose Weight" />
              <Picker.Item label="Build Muscle" value="Build Muscle" />
            </Picker>
            <Picker
              selectedValue={editedFitnessLevel}
              style={styles.modalInput}
              onValueChange={(itemValue, itemIndex) => setEditedFitnessLevel(itemValue)}
            >
              <Picker.Item label="Beginner" value="Beginner" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Advanced" value="Advanced" />
            </Picker>
            <TextInput
              style={styles.modalInput}
              placeholder={height ? `${height}` : 'Height (ft)'}
              placeholderTextColor={'#999897'}
              onChangeText={(text) => setEditedHeight(text)}
              keyboardType={"number-pad"}
            />
            <TextInput
              style={styles.modalInput}
              placeholder={weight ? `${weight}` : 'Weight (lbs)'}
              placeholderTextColor={'#999897'}
              onChangeText={(text) => setEditedWeight(text)}
              keyboardType={"number-pad"}
            />
            <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalSaveButton} onPress={handleSaveChanges} testID='save-button'>
              <Text style={styles.modalText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancelButton} onPress={closeModal} testID='cancel-button' >
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
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
          <TouchableOpacity style={styles.pageButton} onPress={() => navigation.navigate('TransactionHistory')} >
            <Text style={styles.accountText}>Transaction History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageButton} onPress={() => navigation.navigate('PaymentMethods')} testID="to-payment-methods">
            <Text style={styles.accountText}>Payment Methods</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.pageButton} onPress={() => navigation.navigate('ToS')}>
            <Text style={styles.accountText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageButton} onPress={() => navigation.navigate('QR')}>
            <Text style={styles.accountText}>QR Code</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          testID='sign-out-button'
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
        </TouchableOpacity>

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
          <TouchableOpacity style={styles.pageButton} onPress={toggleTheme}>
            <Text style={styles.accountText}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageButton} onPress={() => Alert.alert('This app is only available in English right now.')}>
            <Text style={styles.accountText}>Languages</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.pageButton} onPress={() => Alert.alert('For support, contact us at schedulerx@schedx.com')}>
            <Text style={styles.accountText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pageButton} onPress={() => Alert.alert('App Version: v0.9')}>
            <Text style={styles.accountText}>Version</Text>
          </TouchableOpacity>
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
        testID={`tab-${tab.toLowerCase()}`}
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