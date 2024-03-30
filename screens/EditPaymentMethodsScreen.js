import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core'; // useRoute to receive parameters
import { deletePaymentMethodForUser, updatePaymentMethodForUser, fetchAllPaymentMethodsForUser } from "../services/AuthAPI"; 
import { getAuth } from 'firebase/auth';
import { useTheme } from '../services/ThemeContext';
import getStyles from "../styles/AddPaymentMethodsStyle"; 

const EditPaymentMethodsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const auth = getAuth();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const userId = auth.currentUser ? auth.currentUser.uid : null;

  const [nickname, setNickname] = useState(params?.nickname || '');
  const [creditCard, setCreditCard] = useState(params?.creditCard || '');
  const [CVC, setCVC] = useState(params?.CVC || '');
  const [expDate, setExpDate] = useState(params?.expDate || '');
  const [name, setName] = useState(params?.name || '');
  const [ZIP, setZIP] = useState(params?.ZIP || '');

  const handleUpdatePaymentMethod = async () => {
    try {
      // Ensure params?.id is correctly passed when navigating to this screen
      await updatePaymentMethodForUser(userId, params?.id, {
        nickname, creditCard, CVC, expDate, name, ZIP
      });
      console.log("Payment method updated successfully");
      Alert.alert(
        "Success", // Alert Title
        "Your payment method was updated successfully!", // Alert Message
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('PaymentMethods'),
          },
        ]
      );
      //Fetch existing payment methods and go back to payments list
      const updatedPaymentMethods = await fetchAllPaymentMethodsForUser(userId);
      navigation.navigate('PaymentMethods', { paymentMethods: updatedPaymentMethods });
    } catch (error) {
      console.error("Failed to update payment method", error);
    }
  };

  const handleDeletePaymentMethod = () => {
    // Use Alert to confirm deletion
    Alert.alert(
      "Confirm Deletion", // Alert Title
      "Are you sure you want to delete this payment method?", // Alert Message
      [
        // Button: No, do not delete
        {
          text: "Cancel",
          onPress: () => console.log("Deletion cancelled"),
          style: "cancel"
        },
        // Button: Yes, proceed with deletion
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deletePaymentMethodForUser(userId, params?.id);
              console.log("Payment method deleted successfully");
              
              // Notify the user of success
              Alert.alert(
                "Success",
                "Your payment method was deleted successfully!",
                [{ text: "OK", onPress: () => navigation.navigate('PaymentMethods') }]
              );
              
              // Optionally, fetch the updated list of payment methods
              const updatedPaymentMethods = await fetchAllPaymentMethodsForUser(userId);
              navigation.navigate('PaymentMethods', { paymentMethods: updatedPaymentMethods });
              
            } catch (error) {
              console.error("Failed to delete payment method", error);
              // Optionally, inform the user of the error
              Alert.alert("Error", "Failed to delete the payment method.");
            }
          }
        }
      ],
      { cancelable: true } // This allows the alert to be dismissed by tapping outside of it
    );
  };
  

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.title}>Edit Payment Method</Text>
        <View style={{width: 24}}/>
      </View>

      <ScrollView style={styles.screen}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.label}>Nickname:</Text>
              <TextInput style={styles.input} 
              onChangeText={setNickname} 
              value={nickname}
              placeholder={nickname ? nickname : 'My Card'}
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 
            
            <View>
              <Text style={styles.label}>Credit Card:</Text>
              <TextInput style={[styles.input, {width: '43%'}]}
              onChangeText={setCreditCard} 
              value={creditCard}
              placeholder={creditCard ? creditCard : "1234 5678 9012 3456"}
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

            <View>
              <Text style={styles.label}>CVC:</Text>
              <TextInput style={[styles.input, {width: '13%'}]} 
              onChangeText={setCVC} 
              value={CVC} 
              placeholder="123"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

            <View>
              <Text style={styles.label}>EXP Date:</Text>
              <TextInput style={[styles.input, {width: '16%'}]}
              onChangeText={setExpDate} 
              value={expDate} 
              placeholder="01/23"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View>

            <View>
              <Text style={styles.label}>Name on card:</Text>
              <TextInput style={styles.input} 
              onChangeText={setName} 
              value={name} 
              placeholder="John Appleseed"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View>

            <View>
              <Text style={styles.label}>ZIP:</Text>
              <TextInput style={[styles.input, {width: '17%'}]} 
              onChangeText={setZIP} 
              value={ZIP} 
              placeholder="12345"
              placeholderTextColor={'grey'}
              keyboardType="default"
              secureTextEntry={false}/>
            </View> 

          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
            <View style={styles.saveButtonContainer}>
              <Pressable 
                onPress={handleUpdatePaymentMethod} // Update this to handleUpdatePaymentMethod
                style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Update Payment Method</Text>
              </Pressable>
            </View>

            <View style={styles.deleteButtonContainer}>
              <Pressable 
                onPress={handleDeletePaymentMethod}
                style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete Payment Method</Text>
              </Pressable>
            </View>
          </View>
    </View>
  );
};

export default EditPaymentMethodsScreen;